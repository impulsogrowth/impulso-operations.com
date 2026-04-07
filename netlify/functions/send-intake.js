/**
 * Impulso Intake Email — Netlify Serverless Function
 * Receives intake form data, sends a formatted email to nes@impulso-operations.com
 * via Zoho SMTP using Nodemailer.
 *
 * ENV VARS (set in Netlify):
 *   ZOHO_USER — nes@impulso-operations.com
 *   ZOHO_PASS — app password
 */

const nodemailer = require('nodemailer');

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers: CORS, body: 'Method Not Allowed' };

  try {
    const d = JSON.parse(event.body || '{}');

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.ZOHO_USER || 'nes@impulso-operations.com',
        pass: process.env.ZOHO_PASS,
      },
    });

    const html = `
<div style="font-family:Inter,sans-serif;max-width:640px;margin:0 auto;padding:32px 16px;background:#f8fafc;">
  <div style="background:#fff;border-radius:16px;padding:32px;border:1px solid #e2e8f0;">

    <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
      <div style="background:#0f172a;border-radius:8px;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:18px;">📋</div>
      <div>
        <h1 style="margin:0;font-size:20px;font-weight:900;color:#0f172a;">New Intake Form</h1>
        <p style="margin:0;font-size:13px;color:#64748b;">${d.submittedAt || new Date().toLocaleString()}</p>
      </div>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr style="background:#f8fafc;">
        <td style="padding:10px 14px;font-size:13px;font-weight:700;color:#64748b;width:140px;">👤 Client</td>
        <td style="padding:10px 14px;font-size:14px;color:#0f172a;">${d.firstName || ''} ${d.lastName || ''}</td>
      </tr>
      <tr>
        <td style="padding:10px 14px;font-size:13px;font-weight:700;color:#64748b;">🏢 Business</td>
        <td style="padding:10px 14px;font-size:14px;color:#0f172a;">${d.bizName || '—'}</td>
      </tr>
      <tr style="background:#f8fafc;">
        <td style="padding:10px 14px;font-size:13px;font-weight:700;color:#64748b;">🏭 Niche</td>
        <td style="padding:10px 14px;font-size:14px;color:#0f172a;">${d.niche || '—'}</td>
      </tr>
      <tr>
        <td style="padding:10px 14px;font-size:13px;font-weight:700;color:#64748b;">📧 Email</td>
        <td style="padding:10px 14px;font-size:14px;color:#0f172a;">${d.email || '—'}</td>
      </tr>
      <tr style="background:#f8fafc;">
        <td style="padding:10px 14px;font-size:13px;font-weight:700;color:#64748b;">📱 Phone</td>
        <td style="padding:10px 14px;font-size:14px;color:#0f172a;">${d.phone || '—'}</td>
      </tr>
      <tr>
        <td style="padding:10px 14px;font-size:13px;font-weight:700;color:#64748b;">💳 Plan</td>
        <td style="padding:10px 14px;font-size:14px;color:#0f172a;">${d.selectedPlan || '—'}</td>
      </tr>
      <tr style="background:#f8fafc;">
        <td style="padding:10px 14px;font-size:13px;font-weight:700;color:#64748b;">📍 Location</td>
        <td style="padding:10px 14px;font-size:14px;color:#0f172a;">${d.location || '—'}</td>
      </tr>
    </table>

    <div style="background:#fefce8;border:1px solid #fef08a;border-radius:10px;padding:16px;margin-bottom:16px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#854d0e;text-transform:uppercase;letter-spacing:.05em;">🎯 90-Day Goal</p>
      <p style="margin:0;font-size:14px;color:#0f172a;line-height:1.6;">${d.goal90 || '—'}</p>
    </div>

    <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:16px;margin-bottom:24px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#991b1b;text-transform:uppercase;letter-spacing:.05em;">⚠️ Biggest Challenge</p>
      <p style="margin:0;font-size:14px;color:#0f172a;line-height:1.6;">${d.challenge || '—'}</p>
    </div>

    <a href="https://impulso-operations.com/dashboard.html" style="display:inline-block;padding:12px 24px;background:linear-gradient(135deg,#0369a1,#0ea5e9);color:#fff;text-decoration:none;border-radius:10px;font-weight:700;font-size:14px;">Open Dashboard → Activate Client</a>

    <p style="margin:24px 0 0;font-size:12px;color:#94a3b8;">Impulso Operations · impulso-operations.com</p>
  </div>
</div>`;

    await transporter.sendMail({
      from:    '"Impulso Operations" <nes@impulso-operations.com>',
      to:      'nes@impulso-operations.com',
      subject: `📋 New Intake — ${d.bizName || d.firstName || 'Unknown'} (${d.selectedPlan || 'Plan TBD'})`,
      html,
    });

    return {
      statusCode: 200,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true }),
    };

  } catch (err) {
    console.error('send-intake error:', err);
    return {
      statusCode: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
