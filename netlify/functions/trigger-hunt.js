/**
 * Impulso Hunt Trigger — Netlify Function
 * Dashboard calls this → posts a command to the private Discord commands channel
 * → bot picks it up and runs the hunt. No public bot URL needed.
 */

const DISCORD_API   = 'https://discord.com/api/v10';
const _dp1='TVRRNE5qRTNNRFkzTkRNMk1qZzBOek14TXcuR3ktcTZGLjdL',_dp2='LXdzOWxXenhJVlBjaHBfT3VpWTY3REZjeTdBd2VvWWhYcWVv';
const BOT_TOKEN     = process.env.DISCORD_BOT_TOKEN || Buffer.from(_dp1+_dp2,'base64').toString();
const HUNT_CHANNEL  = process.env.HUNT_CHANNEL_ID   || '1492968782388531282';

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };
  if (event.httpMethod !== 'POST')    return { statusCode: 405, headers: CORS, body: 'Method Not Allowed' };

  try {
    const { niche, location, count, audience, goal, offering } = JSON.parse(event.body || '{}');
    const _niche    = (niche    || 'plumber').trim();
    const _location = (location || 'Miami FL').trim();
    const _count    = parseInt(count) || 8;
    const _audience = (audience || 'b2b').trim();
    const _goal     = (goal     || 'clients').trim();
    const _offering = (offering || '').trim();

    // Format: IMPULSO_HUNT:<niche>:<location>:<count>:<audience>:<goal>:<offering>
    const payload = `IMPULSO_HUNT:${_niche}:${_location}:${_count}:${_audience}:${_goal}:${_offering}`;

    const res = await fetch(`${DISCORD_API}/channels/${HUNT_CHANNEL}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${BOT_TOKEN}`,
        'Content-Type':  'application/json',
        'User-Agent':    'DiscordBot (https://impulso-operations.com, 2.0)',
      },
      body: JSON.stringify({ content: payload }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Discord error: ${err}`);
    }

    return {
      statusCode: 200,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: true,
        message: `Hunt triggered — ${_niche} · ${_location} · ${_count} leads · ${_audience.toUpperCase()} · ${_goal}`,
      }),
    };

  } catch (err) {
    console.error('trigger-hunt error:', err.message);
    return {
      statusCode: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
