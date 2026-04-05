// ============================================================
// ALAN — Impulso Operations AI Assistant
// Smart rule-based chat agent with full business knowledge
// ============================================================

(function() {
  const ALAN = {
    name: 'Alan',
    title: 'Impulso AI Assistant',
    avatar: '🤖',
    color: '#7c3aed',
    colorLight: '#a855f7',
    gold: '#f59e0b',

    // ---- KNOWLEDGE BASE ----
    kb: {
      greetings: ['hi', 'hello', 'hey', 'hola', 'sup', 'what\'s up', 'good morning', 'good afternoon'],
      pricing: ['price', 'pricing', 'cost', 'how much', 'plans', 'plan', 'packages', 'package', 'fee', 'fees', 'rate', 'rates', 'monthly', 'subscription'],
      marketing: ['marketing', 'marketing only', 'leads', 'lead gen', 'outreach', 'content', 'social media', 'video', 'ads', 'email', 'sms'],
      system: ['system', 'system install', 'crm', 'automation', 'pipeline', 'follow up', 'follow-up', 'booking', 'install'],
      agent: ['agent', 'custom agent', 'ai agent', 'bot', 'chatbot', 'alan', 'build', 'niche'],
      results: ['results', 'how fast', 'when', 'timeline', 'how long', 'work', 'does it work', 'proof'],
      contract: ['contract', 'cancel', 'cancellation', 'lock in', 'locked', 'commitment', 'refund'],
      start: ['get started', 'start', 'sign up', 'signup', 'begin', 'how do i', 'onboard', 'intake'],
      contact: ['contact', 'email', 'call', 'talk', 'speak', 'human', 'person', 'team', 'reach', 'phone'],
      payment: ['pay', 'payment', 'stripe', 'square', 'checkout', 'invoice', 'billing', 'charge'],
      niches: ['niche', 'industry', 'realtor', 'real estate', 'med spa', 'gym', 'dentist', 'contractor', 'lawyer', 'restaurant', 'chiropractor', 'gym', 'fitness', 'mortgage'],
      login: ['login', 'log in', 'sign in', 'account', 'dashboard', 'portal', 'access'],
      thanks: ['thank', 'thanks', 'appreciate', 'perfect', 'great', 'awesome', 'amazing', 'good'],
      bye: ['bye', 'goodbye', 'see you', 'later', 'talk later', 'done'],
    },

    responses: {
      greeting: [
        "Hey! I'm Alan, your Impulso assistant 👋 I can help you pick the right plan, answer questions, or get you started. What's on your mind?",
        "Hi there! I'm Alan from Impulso Operations. Whether you want to learn about our plans, see how it all works, or just have questions — I'm here. What can I help with?",
        "Hello! Alan here 👋 I know everything about Impulso — pricing, what we do, how it works. Ask me anything!"
      ],
      pricing: `Here's our pricing breakdown:\n\n💜 **Marketing Only — $250/mo**\nLeads, outreach, content, video editing & ads.\n\n⭐ **System Install — $600/mo** *(Most Popular)*\nFull AI system built into your business — CRM, automation, booking, follow-up.\n\n⚡ **System + Agent — $1,200/mo**\nEverything + a custom AI agent built for your exact niche.\n\nNo contracts. Cancel anytime. Which one sounds closest to what you need?`,
      marketing: `The **Marketing Only plan ($250/mo)** covers:\n\n✓ Daily lead hunting (50–100 leads/week)\n✓ AI outreach emails + SMS\n✓ Social media content + captions\n✓ Video editing, recording & ad creation\n✓ Weekly performance reports\n✓ Direct support channel\n\nWant to get started or do you have more questions?`,
      system: `The **System Install ($600/mo)** is our most popular plan. We build and install a full AI growth system into your business:\n\n✓ Everything in Marketing Only\n✓ CRM + pipeline setup\n✓ Automated follow-up sequences\n✓ Booking & intake automation\n✓ Monthly strategy call\n✓ Priority support\n\nMost clients are fully live within 24 hours. Want to see if it's the right fit?`,
      agent: `The **System + Agent ($1,200/mo)** is our premium plan. You get everything in System Install PLUS a custom AI agent built specifically for your niche:\n\n✓ Custom agent trained on your business\n✓ Handles client intake automatically\n✓ Responds to leads 24/7\n✓ Qualifies prospects automatically\n✓ Dedicated account manager\n✓ Weekly reports + strategy calls\n\nEvery agent is 100% unique to your business. Want to learn more?`,
      results: `Most clients see results fast:\n\n🎯 **48 hours** — Leads appear in your pipeline\n📨 **Day 3–5** — Outreach campaigns running\n📅 **Week 1–2** — First booked discovery calls\n💰 **Month 1** — Revenue tracked from pipeline\n\nWe back this with our **zero-risk guarantee** — if you don't see results in 48 hours, we keep working for free until you do.`,
      contract: `Zero contracts, zero commitment. Here's our policy:\n\n✓ Month-to-month only\n✓ Cancel anytime with 30 days notice\n✓ No cancellation fees, ever\n✓ No hidden charges\n✓ Zero-risk 48-hour results guarantee\n\nWe earn your business every single month. That's how we operate.`,
      start: `Getting started is easy:\n\n1️⃣ Fill out our **intake form** (3 min) so we understand your business\n2️⃣ Choose your plan on the **checkout page**\n3️⃣ We activate your system within **24 hours**\n4️⃣ First leads hit your pipeline\n\nReady? [Fill intake form →](intake.html) or [View plans →](checkout.html)`,
      contact: `You can reach us directly:\n\n📧 **impulsoogrowth@gmail.com**\n📱 **786-567-7337**\n\nWe respond within 24 hours, Mon–Fri. Or I can help you right here — what do you need?`,
      payment: `We accept payments through **Stripe** (coming live shortly) and currently via email invoice.\n\nOnce Stripe is live, you'll be able to pay directly on the checkout page with any card. For now, just [choose your plan](checkout.html) and we'll send an invoice.\n\nAny billing questions? Email impulsoogrowth@gmail.com`,
      niches: `We work with all local service businesses:\n\n🏠 Real Estate • 💆 Med Spas • 💪 Gyms\n⚖️ Law Firms • 🏦 Mortgage • 🦷 Dental\n🔨 Contractors • 🍽️ Restaurants • 🚗 Auto\n💼 Coaches & Consultants • and more\n\nEvery system is built specifically for your niche. What industry are you in?`,
      login: `You can access your client portal here:\n\n🔐 [Log In →](login.html)\n📝 [Create Account →](signup.html)\n\nOnce logged in, you'll see your lead pipeline, reports, billing, and support — all in one place.`,
      thanks: [
        "Of course! Anything else I can help with? 😊",
        "Happy to help! Got more questions?",
        "Absolutely! Let me know if there's anything else you need."
      ],
      bye: [
        "Talk soon! Feel free to come back anytime 👋",
        "See you! Don't hesitate to reach out if you have more questions.",
        "Take care! You can always email us at impulsoogrowth@gmail.com 🚀"
      ],
      fallback: [
        "Great question! I might not have that exact answer, but I can connect you with our team. Email us at impulsoogrowth@gmail.com or call 786-567-7337.",
        "I'm not sure about that one — but our team definitely can help. Reach out at impulsoogrowth@gmail.com and we'll get back to you within 24 hours.",
        "That's a bit outside my knowledge! For anything complex, our team is the best resource. Email impulsoogrowth@gmail.com or fill out the [intake form](intake.html) and we'll take it from there."
      ]
    },

    // ---- QUICK REPLIES ----
    quickReplies: [
      { label: '💰 Pricing', msg: 'What are your prices?' },
      { label: '🚀 Get Started', msg: 'How do I get started?' },
      { label: '⏱️ Results', msg: 'How fast do I see results?' },
      { label: '📋 Plans', msg: 'Tell me about your plans' },
    ],

    history: [],
    isOpen: false,
    isTyping: false,

    // ---- INIT ----
    init() {
      this.injectStyles();
      this.buildWidget();
      this.bindEvents();
      setTimeout(() => this.showBubble(), 4000);
    },

    // ---- MATCH INTENT ----
    match(input) {
      const text = input.toLowerCase().trim();
      if (this.kb.greetings.some(w => text.includes(w))) return 'greeting';
      if (this.kb.pricing.some(w => text.includes(w))) return 'pricing';
      if (this.kb.agent.some(w => text.includes(w))) return 'agent';
      if (this.kb.system.some(w => text.includes(w))) return 'system';
      if (this.kb.marketing.some(w => text.includes(w))) return 'marketing';
      if (this.kb.results.some(w => text.includes(w))) return 'results';
      if (this.kb.contract.some(w => text.includes(w))) return 'contract';
      if (this.kb.start.some(w => text.includes(w))) return 'start';
      if (this.kb.contact.some(w => text.includes(w))) return 'contact';
      if (this.kb.payment.some(w => text.includes(w))) return 'payment';
      if (this.kb.niches.some(w => text.includes(w))) return 'niches';
      if (this.kb.login.some(w => text.includes(w))) return 'login';
      if (this.kb.thanks.some(w => text.includes(w))) return 'thanks';
      if (this.kb.bye.some(w => text.includes(w))) return 'bye';
      return 'fallback';
    },

    getResponse(intent) {
      const r = this.responses[intent];
      if (Array.isArray(r)) return r[Math.floor(Math.random() * r.length)];
      return r;
    },

    // ---- RENDER MESSAGE ----
    renderMsg(text, isUser = false, animate = true) {
      const feed = document.getElementById('alan-feed');
      const div = document.createElement('div');
      div.className = 'alan-msg ' + (isUser ? 'alan-user' : 'alan-bot');
      if (animate && !isUser) div.style.opacity = '0';

      // Parse markdown-ish links and bold
      let html = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color:#a855f7;text-decoration:underline;">$1</a>')
        .replace(/\n/g, '<br>');

      div.innerHTML = html;
      feed.appendChild(div);
      feed.scrollTop = feed.scrollHeight;

      if (animate && !isUser) {
        requestAnimationFrame(() => {
          div.style.transition = 'opacity .3s, transform .3s';
          div.style.transform = 'translateY(6px)';
          requestAnimationFrame(() => {
            div.style.opacity = '1';
            div.style.transform = 'translateY(0)';
          });
        });
      }
    },

    showTyping() {
      const feed = document.getElementById('alan-feed');
      const div = document.createElement('div');
      div.id = 'alan-typing';
      div.className = 'alan-msg alan-bot alan-typing-wrap';
      div.innerHTML = '<span class="alan-typing-dot"></span><span class="alan-typing-dot"></span><span class="alan-typing-dot"></span>';
      feed.appendChild(div);
      feed.scrollTop = feed.scrollHeight;
    },

    hideTyping() {
      const t = document.getElementById('alan-typing');
      if (t) t.remove();
    },

    reply(userMsg) {
      const intent = this.match(userMsg);
      const response = this.getResponse(intent);
      this.showTyping();
      const delay = Math.min(600 + response.length * 8, 2000);
      setTimeout(() => {
        this.hideTyping();
        this.renderMsg(response);
        // Show quick replies after greeting or fallback
        if (intent === 'greeting' || intent === 'fallback') this.showQuickReplies();
      }, delay);
    },

    showQuickReplies() {
      const feed = document.getElementById('alan-feed');
      const old = document.getElementById('alan-qr');
      if (old) old.remove();
      const wrap = document.createElement('div');
      wrap.id = 'alan-qr';
      wrap.className = 'alan-qr';
      this.quickReplies.forEach(qr => {
        const btn = document.createElement('button');
        btn.className = 'alan-qr-btn';
        btn.textContent = qr.label;
        btn.onclick = () => {
          wrap.remove();
          this.sendMsg(qr.msg);
        };
        wrap.appendChild(btn);
      });
      feed.appendChild(wrap);
      feed.scrollTop = feed.scrollHeight;
    },

    sendMsg(text) {
      if (!text.trim()) return;
      this.renderMsg(text, true);
      document.getElementById('alan-input').value = '';
      this.reply(text);
    },

    // ---- BUBBLE ----
    showBubble() {
      if (this.isOpen) return;
      const bubble = document.getElementById('alan-bubble');
      if (bubble) {
        bubble.style.opacity = '1';
        bubble.style.transform = 'translateY(0) scale(1)';
        setTimeout(() => { if (bubble) bubble.style.opacity = '0'; }, 6000);
      }
    },

    // ---- OPEN/CLOSE ----
    toggle() {
      this.isOpen ? this.close() : this.open();
    },

    open() {
      this.isOpen = true;
      document.getElementById('alan-bubble').style.opacity = '0';
      document.getElementById('alan-window').style.display = 'flex';
      requestAnimationFrame(() => {
        document.getElementById('alan-window').style.opacity = '1';
        document.getElementById('alan-window').style.transform = 'translateY(0) scale(1)';
      });
      document.getElementById('alan-fab-icon').textContent = '✕';
      if (!this.history.length) {
        setTimeout(() => {
          this.renderMsg("Hey! I'm **Alan**, your Impulso assistant 👋\n\nI can help you pick the right plan, answer questions, or get you started. What can I help with?");
          this.showQuickReplies();
          this.history.push(1);
        }, 300);
      }
      document.getElementById('alan-input').focus();
    },

    close() {
      this.isOpen = false;
      const win = document.getElementById('alan-window');
      win.style.opacity = '0';
      win.style.transform = 'translateY(16px) scale(.97)';
      setTimeout(() => { win.style.display = 'none'; }, 300);
      document.getElementById('alan-fab-icon').textContent = '💬';
    },

    // ---- EVENTS ----
    bindEvents() {
      document.getElementById('alan-input').addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          const val = document.getElementById('alan-input').value.trim();
          if (val) this.sendMsg(val);
        }
      });
    },

    // ---- STYLES ----
    injectStyles() {
      const style = document.createElement('style');
      style.textContent = `
        #alan-fab { position:fixed;bottom:1.5rem;right:1.5rem;z-index:9000;display:flex;flex-direction:column;align-items:flex-end;gap:.5rem; }
        #alan-bubble { background:var(--card,#111118);border:1px solid rgba(168,85,247,.3);border-radius:12px 12px 0 12px;padding:.65rem 1rem;font-size:.82rem;font-weight:600;color:#e5e7eb;white-space:nowrap;opacity:0;transform:translateY(8px) scale(.96);transition:all .4s cubic-bezier(.34,1.56,.64,1);pointer-events:none;box-shadow:0 4px 20px rgba(0,0,0,.3); }
        #alan-btn { width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#a855f7);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.3rem;box-shadow:0 4px 20px rgba(124,58,237,.5);transition:all .3s; }
        #alan-btn:hover { transform:scale(1.08);box-shadow:0 6px 28px rgba(124,58,237,.7); }
        #alan-window { position:fixed;bottom:5.5rem;right:1.5rem;z-index:8999;width:340px;max-width:calc(100vw - 2rem);height:480px;max-height:calc(100vh - 8rem);background:#0d0d14;border:1px solid rgba(168,85,247,.25);border-radius:16px;display:none;flex-direction:column;box-shadow:0 12px 40px rgba(0,0,0,.6);opacity:0;transform:translateY(16px) scale(.97);transition:all .3s cubic-bezier(.34,1.56,.64,1);overflow:hidden; }
        #alan-header { padding:.9rem 1rem;background:linear-gradient(135deg,rgba(124,58,237,.2),rgba(168,85,247,.1));border-bottom:1px solid rgba(168,85,247,.15);display:flex;align-items:center;gap:.7rem; }
        #alan-avatar { width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#a855f7);display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0; }
        #alan-info { flex:1; }
        #alan-info strong { font-size:.9rem;font-weight:800;color:#fff;display:block; }
        #alan-info span { font-size:.72rem;color:#10b981;font-weight:600; }
        #alan-close-btn { background:none;border:none;color:#6b7280;font-size:1.1rem;cursor:pointer;padding:.2rem; }
        #alan-feed { flex:1;overflow-y:auto;padding:.9rem;display:flex;flex-direction:column;gap:.6rem; }
        #alan-feed::-webkit-scrollbar { width:3px; }
        #alan-feed::-webkit-scrollbar-track { background:transparent; }
        #alan-feed::-webkit-scrollbar-thumb { background:rgba(168,85,247,.3);border-radius:2px; }
        .alan-msg { max-width:85%;padding:.65rem .9rem;border-radius:12px;font-size:.84rem;line-height:1.55;word-break:break-word; }
        .alan-bot { background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.06);color:#e5e7eb;align-self:flex-start;border-radius:4px 12px 12px 12px; }
        .alan-user { background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;align-self:flex-end;border-radius:12px 4px 12px 12px; }
        .alan-typing-wrap { display:flex;gap:4px;align-items:center;padding:.6rem .9rem; }
        .alan-typing-dot { width:6px;height:6px;border-radius:50%;background:#a855f7;animation:alanDot .9s ease-in-out infinite; }
        .alan-typing-dot:nth-child(2) { animation-delay:.15s; }
        .alan-typing-dot:nth-child(3) { animation-delay:.3s; }
        @keyframes alanDot { 0%,60%,100%{transform:translateY(0);opacity:.4} 30%{transform:translateY(-5px);opacity:1} }
        .alan-qr { display:flex;flex-wrap:wrap;gap:.4rem;padding:.2rem 0; }
        .alan-qr-btn { padding:.35rem .75rem;background:rgba(124,58,237,.12);border:1px solid rgba(168,85,247,.3);border-radius:20px;color:#c4b5fd;font-size:.75rem;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s; }
        .alan-qr-btn:hover { background:rgba(124,58,237,.25);border-color:rgba(168,85,247,.6); }
        #alan-footer { padding:.65rem .8rem;border-top:1px solid rgba(255,255,255,.06);display:flex;gap:.5rem;align-items:center; }
        #alan-input { flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:.6rem .85rem;color:#fff;font-size:.84rem;font-family:inherit;outline:none;transition:border .2s; }
        #alan-input::placeholder { color:#6b7280; }
        #alan-input:focus { border-color:rgba(168,85,247,.5); }
        #alan-send { width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#a855f7);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.85rem;flex-shrink:0;transition:all .2s; }
        #alan-send:hover { transform:scale(1.1); }
        @media(max-width:480px) { #alan-window { width:calc(100vw - 1rem);right:.5rem;bottom:5rem; } #alan-fab { right:.75rem;bottom:.75rem; } }
      `;
      document.head.appendChild(style);
    },

    // ---- BUILD WIDGET ----
    buildWidget() {
      const wrap = document.createElement('div');
      wrap.id = 'alan-fab';
      wrap.innerHTML = `
        <div id="alan-bubble">👋 Hi! I'm Alan — ask me anything!</div>
        <button id="alan-btn" onclick="ALAN.toggle()">
          <span id="alan-fab-icon">💬</span>
        </button>
      `;
      document.body.appendChild(wrap);

      const win = document.createElement('div');
      win.id = 'alan-window';
      win.innerHTML = `
        <div id="alan-header">
          <div id="alan-avatar">🤖</div>
          <div id="alan-info">
            <strong>Alan</strong>
            <span>● Online · Impulso Assistant</span>
          </div>
          <button id="alan-close-btn" onclick="ALAN.close()">✕</button>
        </div>
        <div id="alan-feed"></div>
        <div id="alan-footer">
          <input id="alan-input" type="text" placeholder="Ask Alan anything..." />
          <button id="alan-send" onclick="ALAN.sendMsg(document.getElementById('alan-input').value)">➤</button>
        </div>
      `;
      document.body.appendChild(win);
    }
  };

  // Expose globally and init
  window.ALAN = ALAN;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ALAN.init());
  } else {
    ALAN.init();
  }
})();
