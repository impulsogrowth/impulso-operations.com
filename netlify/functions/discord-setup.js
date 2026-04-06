/**
 * Impulso Discord Setup — Netlify Serverless Function
 *
 * Called when an admin activates a client in the dashboard.
 * Creates a private Discord workspace for the client inside the Impulso server:
 *   - A role named after their business
 *   - A private category visible only to them + Impulso admins
 *   - Three channels: #lead-alerts, #pipeline, #support
 *   - An invite link sent back to the dashboard
 *
 * ENV VARS required in Netlify:
 *   DISCORD_BOT_TOKEN  — bot token
 *   DISCORD_GUILD_ID   — Impulso server ID (default below)
 *   DISCORD_ADMIN_ROLE_ID — Impulso team role ID (so admins always see client channels)
 */

const DISCORD_API   = 'https://discord.com/api/v10';
const BOT_TOKEN     = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID      = process.env.DISCORD_GUILD_ID || '1486050658682408980';
const ADMIN_ROLE_ID = process.env.DISCORD_ADMIN_ROLE_ID || null; // optional but recommended

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

async function discord(method, path, body) {
  const res = await fetch(`${DISCORD_API}${path}`, {
    method,
    headers: {
      'Authorization': `Bot ${BOT_TOKEN}`,
      'Content-Type':  'application/json',
      'User-Agent':    'DiscordBot (https://impulso-operations.com, 1.0)',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Discord ${method} ${path} → ${res.status}: ${text}`);
  return text ? JSON.parse(text) : {};
}

exports.handler = async (event) => {
  // ── CORS preflight ──────────────────────────────────────────────────────
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS, body: 'Method Not Allowed' };
  }

  try {
    const { clientUID, businessName, clientEmail } = JSON.parse(event.body || '{}');
    if (!clientUID || !businessName) {
      return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'clientUID and businessName are required' }) };
    }

    // Sanitise name for Discord (no special chars, max 50 chars)
    const safe = businessName.replace(/[^\w\s\-]/g, '').trim().substring(0, 50);

    // ── 1. Create a role for this client ────────────────────────────────
    const role = await discord('POST', `/guilds/${GUILD_ID}/roles`, {
      name:        `client: ${safe}`,
      color:       0x38bdf8,   // Impulso blue
      mentionable: false,
      hoist:       false,
    });

    // ── 2. Build permission overwrites ───────────────────────────────────
    // @everyone = guild ID, deny VIEW_CHANNEL (1024)
    // client role = allow VIEW_CHANNEL + SEND_MESSAGES + READ_MESSAGE_HISTORY (3072 + 1024 = 68608 roughly)
    const VIEW = '1024';
    const VIEW_SEND_READ = String(1024 + 2048 + 65536); // view + send + read history
    const overwrites = [
      { id: GUILD_ID, type: 0, deny: VIEW, allow: '0' },       // @everyone — deny
      { id: role.id,  type: 0, allow: VIEW_SEND_READ, deny: '0' }, // client role — allow
    ];
    if (ADMIN_ROLE_ID) {
      overwrites.push({ id: ADMIN_ROLE_ID, type: 0, allow: VIEW_SEND_READ, deny: '0' });
    }

    // ── 3. Create private category ───────────────────────────────────────
    const category = await discord('POST', `/guilds/${GUILD_ID}/channels`, {
      name:                  `📁 ${safe.toUpperCase()}`,
      type:                  4,   // GUILD_CATEGORY
      permission_overwrites: overwrites,
    });

    // ── 4. Create the three client channels ─────────────────────────────
    const channelDefs = [
      { key: 'leadAlerts', name: '🎯│lead-alerts', topic: 'Live lead notifications — react to update status' },
      { key: 'pipeline',   name: '📊│pipeline',    topic: 'Pipeline reports, stats, and weekly summaries' },
      { key: 'support',    name: '💬│support',     topic: 'Direct line to your Impulso account manager' },
    ];

    const channelIds = {};
    for (const def of channelDefs) {
      const ch = await discord('POST', `/guilds/${GUILD_ID}/channels`, {
        name:                  def.name,
        type:                  0,   // GUILD_TEXT
        topic:                 def.topic,
        parent_id:             category.id,
        permission_overwrites: overwrites,
      });
      channelIds[def.key] = ch.id;
    }

    // ── 5. Post welcome embed in #lead-alerts ───────────────────────────
    await discord('POST', `/channels/${channelIds.leadAlerts}/messages`, {
      embeds: [{
        title:       `🎉 Welcome to Impulso, ${safe}!`,
        description: 'Your private workspace is ready. This is where your leads live.',
        color:       0x10b981,
        fields: [
          { name: '🎯 #lead-alerts', value: 'New leads appear here in real time. React with ✅ = contacted · 💰 = closed · ❌ = lost', inline: false },
          { name: '📊 #pipeline',    value: 'Weekly reports and pipeline stats every Monday at 9am', inline: false },
          { name: '💬 #support',     value: 'Message here to reach your Impulso account manager', inline: false },
        ],
        footer:    { text: `Impulso Operations · Account: ${clientEmail || clientUID}` },
        timestamp: new Date().toISOString(),
      }],
    });

    // ── 6. Create permanent invite from #lead-alerts ────────────────────
    const invite = await discord('POST', `/channels/${channelIds.leadAlerts}/invites`, {
      max_age:  0,     // never expires
      max_uses: 1,     // single-use for security
      unique:   true,
    });

    // ── 7. Notify Impulso admin in #new-clients ──────────────────────────
    const WH_CLIENTS = 'https://discord.com/api/webhooks/1490548344605380608/f011PE9Jct9lB6daKagvwsdl_uKEMKBq8zLsEL0IqcBKOr1StrNYSfxB7oYYsfseTvvV';
    await fetch(WH_CLIENTS, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        embeds: [{
          title:  '🏠 Client Workspace Created',
          color:  0x38bdf8,
          fields: [
            { name: '🏢 Business', value: safe,                                  inline: true },
            { name: '🔗 Invite',   value: `https://discord.gg/${invite.code}`,   inline: true },
            { name: '🆔 UID',      value: clientUID,                             inline: false },
          ],
          footer:    { text: 'Send this invite link to the client' },
          timestamp: new Date().toISOString(),
        }],
      }),
    }).catch(() => {});

    return {
      statusCode: 200,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roleId:     role.id,
        categoryId: category.id,
        channels:   channelIds,
        inviteUrl:  `https://discord.gg/${invite.code}`,
        inviteCode: invite.code,
      }),
    };

  } catch (err) {
    console.error('discord-setup error:', err);
    return {
      statusCode: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
