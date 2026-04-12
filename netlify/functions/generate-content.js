/**
 * Impulso Content Generator — Netlify Function
 * Generates marketing content via Claude API based on user inputs.
 *
 * ENV VARS:
 *   ANTHROPIC_API_KEY — Claude API key
 */

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const TYPE_PROMPTS = {
  'instagram-reel':     'Write an Instagram Reel script. Format: HOOK (first 3 seconds, stops the scroll), BODY (value/story, 45 seconds), CTA (clear action). Make it conversational, spoken word.',
  'instagram-carousel': 'Write an Instagram Carousel. Format: Slide 1 (hook headline), Slides 2-5 (one point each with short body copy), Last slide (CTA). Make each slide punchy.',
  'instagram-caption':  'Write an Instagram caption. Format: Hook (first line, no emoji), 3-4 lines of value, CTA, line break, 3-5 hashtags. Under 200 words.',
  'cold-email':         'Write a cold outreach email. Format: Subject line (under 8 words, curiosity-driven), Body (under 150 words — one pain point, one proof, one CTA). No fluff.',
  'follow-up':          'Write a follow-up message for a prospect who hasn\'t responded in 3 days. Keep it under 50 words. Casual, no pressure, add value or ask a question.',
  'dm-script':          'Write a cold DM opening message. Under 50 words. Ask a question about their business — do NOT pitch. Make them want to reply.',
  'google-ad':          'Write a Google Ad. Format: Headline 1 (30 chars max), Headline 2 (30 chars max), Headline 3 (30 chars max), Description 1 (90 chars max), Description 2 (90 chars max).',
  'meta-ad':            'Write a Meta/Facebook Ad. Format: Primary Text (hook + story + proof + CTA, under 200 words), Headline (under 40 chars), Description (under 30 chars).',
  'sms':                'Write an SMS outreach message. Under 160 characters. Casual, first name personalization placeholder [Name], clear CTA.',
  'lead-recommendation':'You are an elite sales coach for a lead generation agency. Based on the lead data in Topic/Goal, write a tactical closing strategy. Format:\n\n1. LEAD ASSESSMENT\nRate this lead\'s potential and explain why in 2-3 sentences.\n\n2. CLOSING APPROACH\nWhich strategy fits: Direct Close, Consultative, Value-First, or Urgency. Explain why in 1-2 sentences.\n\n3. EXACT SCRIPT\nWord-for-word what to say in the very next touchpoint (call, DM, or email — pick the best one). Make it natural, not salesy.\n\n4. OBJECTION HANDLING\n3 likely objections for this niche + your exact response to each.\n\n5. NEXT 3 ACTIONS\nSpecific, time-bound actions to close this lead within 7 days. No vague advice.',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };
  if (event.httpMethod !== 'POST')    return { statusCode: 405, headers: CORS, body: 'Method Not Allowed' };

  try {
    const { type, tone, topic, bizName, plan } = JSON.parse(event.body || '{}');

    const typePrompt = TYPE_PROMPTS[type] || TYPE_PROMPTS['instagram-caption'];
    const toneGuide  = {
      professional:  'Professional and authoritative tone.',
      casual:        'Casual, friendly, conversational tone.',
      bold:          'Bold, direct, no-nonsense tone.',
      urgent:        'Urgent, FOMO-driven tone.',
      storytelling:  'Storytelling tone — paint a picture.',
    }[tone] || '';

    const prompt = `You are a world-class copywriter for Impulso Operations, a lead generation agency.

Business: ${bizName || 'a local business'}
Plan: ${plan || 'growth'}
Topic/Goal: ${topic || 'generate more leads and grow the business'}
Tone: ${toneGuide}

Task: ${typePrompt}

Write content specifically for ${bizName || 'this business'}. Make it niche-specific, conversion-focused, and ready to use immediately. No explanations — just the content.`;

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set in Netlify env vars');
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key':         apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type':      'application/json',
      },
      body: JSON.stringify({
        model:      'claude-haiku-4-5-20251001',
        max_tokens: 800,
        messages:   [{ role: 'user', content: prompt }],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Claude API error: ${err}`);
    }

    const data    = await res.json();
    const content = data.content?.[0]?.text || 'Could not generate content.';

    return {
      statusCode: 200,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    };

  } catch (err) {
    console.error('generate-content error:', err.message);
    return {
      statusCode: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
