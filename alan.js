// ============================================================
// ALAN — Impulso Operations AI Assistant
// Smart rule-based chat agent with full business knowledge
// ============================================================

(function() {
  const ALAN = {
    name: 'Alan T',
    title: 'Impulso AI Assistant',
    avatar: '🤖',
    color: '#0ea5e9',
    colorLight: '#38bdf8',
    gold: '#f59e0b',

    // ---- KNOWLEDGE BASE ----
    kb: {
      greetings:     ['hi', 'hello', 'hey', 'hola', 'sup', "what's up", 'good morning', 'good afternoon', 'good evening', 'yo', 'wassup'],
      howru:         ['how are you', 'how r u', 'how are u', "what's good", 'you good', 'hows it going', "how's it going", 'how you doing'],
      whoalan:       ['who are you', 'what are you', 'are you a bot', 'are you ai', 'are you real', 'are you human', 'what can you do', 'what do you do', 'your name', 'tell me about yourself'],
      pricing:       ['price', 'pricing', 'cost', 'how much', 'plans', 'plan', 'packages', 'package', 'fee', 'fees', 'rate', 'rates', 'monthly', 'subscription', 'charge', '500', '600', '1200'],
      marketing:     ['marketing', 'marketing only', 'lead gen', 'outreach', 'content', 'social media', 'video', 'ads', 'captions', 'tiktok', 'instagram', 'facebook', 'meta', 'google ads'],
      leads:         ['leads', 'lead', 'more leads', 'get leads', 'find leads', 'lead generation', 'prospects', 'clients', 'customers', 'more clients', 'more customers', 'appointments'],
      system:        ['system', 'system install', 'crm', 'automation', 'pipeline', 'follow up', 'follow-up', 'booking', 'install', 'automate', 'automated'],
      agent:         ['agent', 'custom agent', 'ai agent', 'bot', 'chatbot', 'build me', 'build an agent', 'niche agent', 'my own agent'],
      results:       ['results', 'how fast', 'when', 'timeline', 'how long', 'work', 'does it work', 'proof', 'show me', 'guarantee results', 'what results'],
      contract:      ['contract', 'cancel', 'cancellation', 'lock in', 'locked', 'commitment', 'refund', 'quit', 'leave', 'exit', 'month to month'],
      start:         ['get started', 'start', 'sign up', 'signup', 'begin', 'how do i start', 'onboard', 'intake', 'ready to start', 'lets go', "let's go", 'i want in', 'join'],
      contact:       ['contact', 'talk to someone', 'speak', 'human', 'person', 'team', 'reach', 'phone number', 'call you', 'speak to'],
      phone:         ['phone', 'number', 'call', 'telephone', '786'],
      email:         ['email', 'email address', 'mail', 'nes@'],
      payment:       ['pay', 'payment', 'stripe', 'checkout', 'invoice', 'billing', 'buy', 'purchase', 'credit card'],
      niches:        ['niche', 'industry', 'realtor', 'real estate', 'med spa', 'gym', 'dentist', 'contractor', 'lawyer', 'restaurant', 'chiropractor', 'fitness', 'mortgage', 'cleaning', 'auto', 'coach', 'consultant', 'law firm', 'dental'],
      login:         ['login', 'log in', 'sign in', 'dashboard', 'portal', 'access', 'my account', 'client area'],
      services:      ['services', 'what do you offer', 'what do you provide', 'what do you sell', 'offerings', 'what you do', 'tell me what', 'service'],
      difference:    ['difference', 'different', 'compare', 'vs', 'versus', 'better', 'which plan', 'which one', 'recommend', 'best plan', 'what plan', 'which should i'],
      guarantee:     ['guarantee', 'risk', 'free trial', 'refund', 'money back', 'safe', 'worth it', 'is it worth'],
      onboarding:    ['onboard', 'setup', 'how does it work', 'process', 'steps', 'what happens', 'after i sign', 'next steps', 'what do i do'],
      whatisimpulso: ['what is impulso', 'impulso', 'tell me about impulso', 'about you', 'about impulso', 'your company', 'this company'],
      thanks:        ['thank', 'thanks', 'appreciate', 'perfect', 'great', 'awesome', 'amazing', 'that helps', 'got it', 'makes sense', 'nice', 'dope', 'fire', 'cool'],
      bye:           ['bye', 'goodbye', 'see you', 'later', 'talk later', 'done', 'gotta go', 'peace', 'ttyl'],
    },

    responses: {
      greeting: [
        "Hey! I'm **Alan T**, Impulso's AI. I can break down our plans, tell you how the system works, or help you get started. What's on your mind?",
        "What's good! Alan T here — ask me anything about Impulso. Pricing, how it works, which plan fits you — I've got answers.",
        "Hey 👋 I'm Alan T. I know everything about Impulso Operations — plans, pricing, results, how to get started. Fire away."
      ],
      howru: [
        "I'm running at full capacity 😄 More importantly — how can I help *you* grow your business today?",
        "Doing great, thanks for asking! Now let's talk about getting you more clients. What do you need to know?",
        "All systems go! What can I help you with today?"
      ],
      whoalan: "I'm **Alan T** — the AI for Impulso Operations. I can answer questions about our plans, pricing, how the system works, and help you figure out the best fit for your business.\n\nI'm not human, but I know everything Impulso offers. Want me to break something down for you?",
      services: `Here's what Impulso does:\n\n🎯 **Lead Generation** — Qualified leads, consistently.\n🌐 **Website Systems** — High-converting sites that turn visitors into clients.\n✍️ **Content Strategy** — Video, social, ads, captions — all handled.\n⚙️ **Automation & CRM** — Follow-up, booking, and nurturing on autopilot.\n\nAll of this is packaged into three plans starting at **$500/mo**. Want to see the breakdown?`,
      pricing: `Here's the full pricing breakdown:\n\n**Premium Marketing — $500/mo**\nVideo production, ads, lead gen, content & outreach.\n\n**System Install — $600/mo** ⭐ Most Popular\nFull AI system — CRM, automation, follow-up, booking.\n\n**System + Agent — $1,200/mo**\nEverything above + a custom AI agent built for your niche.\n\n90-day commitment. First-class service from day one.\n\n[View all plans →](checkout.html) — Which one sounds like a fit?`,
      marketing: `**Premium Marketing — $500/mo**\n\n✓ Professional video recording & editing\n✓ Ad creation (Meta, Google, TikTok)\n✓ Daily lead hunting (50–100/week)\n✓ AI outreach emails + SMS\n✓ Social media content + captions\n✓ Weekly performance reports\n✓ Direct support channel\n\nThis is full production — not just posting. [Get started →](checkout.html)`,
      leads: `Lead generation is at the core of everything we do.\n\nHere's how it works:\n\n✓ We identify qualified prospects in your niche daily\n✓ Your pipeline fills within **48 hours** of going live\n✓ AI outreach runs automatically — emails + SMS\n✓ Leads are scored and tracked in your CRM\n\nMost clients see **300% more lead volume** within 60 days. Want to know which plan gets you there? [See plans →](checkout.html)`,
      system: `**System Install — $600/mo** (our most popular)\n\nWe build and install a full AI growth system into your business:\n\n✓ Everything in Premium Marketing\n✓ CRM + pipeline setup\n✓ Automated follow-up sequences\n✓ Booking & intake automation\n✓ Monthly strategy call\n✓ Priority support\n\nLive within **24 hours**. [Get started →](checkout.html)`,
      agent: `**System + Agent — $1,200/mo**\n\nYou get the full System Install PLUS a custom AI agent built for your exact niche:\n\n✓ Agent trained specifically on your business\n✓ Handles client intake automatically\n✓ Responds to leads 24/7\n✓ Qualifies prospects without you lifting a finger\n✓ Dedicated account manager\n✓ Weekly reports + strategy calls\n\nEvery agent is 100% unique. [Apply now →](checkout.html)`,
      results: `Results clients typically see:\n\n🎯 **48 hours** — First leads in your pipeline\n📨 **Days 3–5** — Outreach campaigns live\n📅 **Week 1–2** — First booked discovery calls\n💰 **Month 1** — Revenue tracked from pipeline\n📈 **60 days** — Average 300% increase in lead volume\n\nWe're built around measurable growth — not impressions or vanity metrics. [See our plans →](checkout.html)`,
      contract: `We run on a **90-day commitment** — here's why that's good for you:\n\n✓ Real results take real dedication — 90 days gives us time to build, optimize, and scale\n✓ First-class priority service every single day\n✓ Dedicated account manager on your business daily\n✓ Full system built and dialed in within the 90 days\n✓ No shortcuts — we go all in\n\nThis isn't a trial. It's a serious partnership. Ready to commit? [View plans →](checkout.html)`,
      start: `Getting started takes about 5 minutes:\n\n1️⃣ **[Fill intake form →](intake.html)** — 3 min, tells us about your business\n2️⃣ **[Choose your plan →](checkout.html)** — $500, $600, or $1,200/mo\n3️⃣ **We activate your system** — within 24 hours\n4️⃣ **Leads hit your pipeline** — you focus on closing\n\nWant me to help you pick the right plan first?`,
      phone: `You can reach the team at:\n\n📱 **786-228-6229**\n\nCalls and texts welcome, Mon–Fri. Or I can answer your questions right here — what do you need?`,
      email: `Reach us by email at:\n\n📧 **nes@impulso-operations.com**\n\nWe respond within 24 hours, Mon–Fri. What can I help you with right now?`,
      contact: `Here's how to reach the Impulso team directly:\n\n📧 **nes@impulso-operations.com**\n📱 **786-228-6229**\n\nWe respond within 24 hours, Mon–Fri. Or keep chatting with me — I can answer most questions right here.`,
      payment: `Payments are processed securely through **Stripe**.\n\nYou can pay directly on the [checkout page →](checkout.html) with any major card. After payment, you'll be walked through onboarding and your system goes live within 24 hours.\n\nBilling questions? Email nes@impulso-operations.com`,
      niches: `We work with any local service business. Most common:\n\n🏠 Real Estate & Mortgage · 💆 Med Spas\n💪 Gyms & Fitness · 🦷 Dental & Clinics\n🔨 Contractors & Home Services · ⚖️ Law Firms\n🍽️ Restaurants · 🚗 Auto · 💼 Coaches\n\nEvery system is built for your specific niche — not a template. What's your industry?`,
      login: `Access your client dashboard here:\n\n🔐 [Log In →](login.html)\n📝 [Create Account →](signup.html)\n\nYour dashboard has your lead pipeline, reports, billing, and direct support — all in one place.`,
      whatisimpulso: `**Impulso Operations** is an AI-powered growth agency for local service businesses.\n\nWe build automated systems that:\n✓ Generate qualified leads consistently\n✓ Send outreach automatically (email + SMS)\n✓ Follow up and book calls on your behalf\n✓ Create content and run ads\n✓ Track everything in a live CRM dashboard\n\nYou focus on closing. We handle everything else. [See our plans →](checkout.html)`,
      difference: `Here's the honest breakdown:\n\n**$500 — Premium Marketing**\nBest if you need high-quality content, video production, and lead gen — and already have your own systems.\n\n**$600 — System Install** ⭐\nBest if you want the full AI system built into your business — CRM, automation, follow-up, booking. Most popular.\n\n**$1,200 — System + Agent**\nBest if you want everything above PLUS a 24/7 AI agent that works specifically for your niche.\n\nNot sure? Fill out the [intake form →](intake.html) and we'll tell you exactly which one fits.`,
      guarantee: `We stand behind our work with a **90-day first-class commitment**:\n\n✓ High-priority access to your account manager every day\n✓ Full system built, optimized, and scaling within 90 days\n✓ Weekly reports + strategy calls included\n✓ We don't cut corners or disappear after onboarding\n✓ If you're not seeing movement, we keep working\n\nThis is a real partnership. We go all in. [Get started →](checkout.html)`,
      onboarding: `Here's exactly what happens step by step:\n\n1️⃣ **Intake form** (3 min) — tells us your business, niche, goals\n2️⃣ **Onboarding call** — we map out your custom system\n3️⃣ **We build it** — system live within 24 hours\n4️⃣ **Go live** — leads start hitting your pipeline\n5️⃣ **Weekly updates** — reports, calls, continuous optimization\n\nMost clients are fully live within **24–48 hours**. [Start here →](intake.html)`,
      thanks: [
        "Of course! What else can I help with?",
        "Happy to help. Got more questions — I've got answers.",
        "Absolutely. Anything else you want to know about Impulso?",
        "That's what I'm here for. What else?"
      ],
      bye: [
        "Talk soon! Come back anytime 👋",
        "See you! You can also reach us at nes@impulso-operations.com anytime.",
        "Take care — and when you're ready to get more clients, we're here. 🚀"
      ],
      fallback: [
        "Good question — let me point you in the right direction. For that, reach out directly: **nes@impulso-operations.com** or **786-228-6229**. The team will get back to you within 24 hours.",
        "I want to make sure you get the right answer on that — email us at **nes@impulso-operations.com** and we'll handle it personally.",
        "That's a bit specific for me, but our team has you covered. Hit us at **nes@impulso-operations.com** or call **786-228-6229** and we'll sort it out."
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
      const t = input.toLowerCase().trim();
      const has = (arr) => arr.some(w => t.includes(w));
      // Order matters — specific before generic
      if (has(this.kb.bye))           return 'bye';
      if (has(this.kb.thanks))        return 'thanks';
      if (has(this.kb.howru))         return 'howru';
      if (has(this.kb.whoalan))       return 'whoalan';
      if (has(this.kb.greetings))     return 'greeting';
      if (has(this.kb.whatisimpulso)) return 'whatisimpulso';
      if (has(this.kb.onboarding))    return 'onboarding';
      if (has(this.kb.difference))    return 'difference';
      if (has(this.kb.agent))         return 'agent';
      if (has(this.kb.system))        return 'system';
      if (has(this.kb.marketing))     return 'marketing';
      if (has(this.kb.leads))         return 'leads';
      if (has(this.kb.pricing))       return 'pricing';
      if (has(this.kb.services))      return 'services';
      if (has(this.kb.results))       return 'results';
      if (has(this.kb.contract))      return 'contract';
      if (has(this.kb.guarantee))     return 'guarantee';
      if (has(this.kb.start))         return 'start';
      if (has(this.kb.phone))         return 'phone';
      if (has(this.kb.email))         return 'email';
      if (has(this.kb.contact))       return 'contact';
      if (has(this.kb.payment))       return 'payment';
      if (has(this.kb.niches))        return 'niches';
      if (has(this.kb.login))         return 'login';
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
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color:#38bdf8;text-decoration:underline;">$1</a>')
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
          this.renderMsg("Hey! I'm **Alan T**, your Impulso assistant 👋\n\nI can help you pick the right plan, answer questions, or get you started. What can I help with?");
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
        #alan-bubble { background:var(--card,#111118);border:1px solid rgba(56,189,248,.3);border-radius:12px 12px 0 12px;padding:.65rem 1rem;font-size:.82rem;font-weight:600;color:#e5e7eb;white-space:nowrap;opacity:0;transform:translateY(8px) scale(.96);transition:all .4s cubic-bezier(.34,1.56,.64,1);pointer-events:none;box-shadow:0 4px 20px rgba(0,0,0,.3); }
        #alan-btn { width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#0369a1,#0ea5e9,#38bdf8);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.3rem;box-shadow:0 4px 20px rgba(14,165,233,.5);transition:all .3s; }
        #alan-btn:hover { transform:scale(1.08);box-shadow:0 6px 28px rgba(124,58,237,.7); }
        #alan-window { position:fixed;bottom:5.5rem;right:1.5rem;z-index:8999;width:340px;max-width:calc(100vw - 2rem);height:480px;max-height:calc(100vh - 8rem);background:#0d0d14;border:1px solid rgba(56,189,248,.25);border-radius:16px;display:none;flex-direction:column;box-shadow:0 12px 40px rgba(0,0,0,.6);opacity:0;transform:translateY(16px) scale(.97);transition:all .3s cubic-bezier(.34,1.56,.64,1);overflow:hidden; }
        #alan-header { padding:.9rem 1rem;background:linear-gradient(135deg,rgba(14,165,233,.2),rgba(56,189,248,.1));border-bottom:1px solid rgba(56,189,248,.15);display:flex;align-items:center;gap:.7rem; }
        #alan-avatar { width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#0369a1,#0ea5e9,#38bdf8);display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0; }
        #alan-info { flex:1; }
        #alan-info strong { font-size:.9rem;font-weight:800;color:#fff;display:block; }
        #alan-info span { font-size:.72rem;color:#10b981;font-weight:600; }
        #alan-close-btn { background:none;border:none;color:#6b7280;font-size:1.1rem;cursor:pointer;padding:.2rem; }
        #alan-jarvis-btn { display:flex;align-items:center;gap:.3rem;background:rgba(14,165,233,.12);border:1px solid rgba(56,189,248,.3);border-radius:6px;color:#7dd3fc;font-size:.7rem;font-weight:700;cursor:pointer;padding:.3rem .6rem;font-family:inherit;text-decoration:none;transition:all .2s;white-space:nowrap; }
        #alan-jarvis-btn:hover { background:rgba(14,165,233,.25);border-color:rgba(56,189,248,.6); }
        #alan-feed { flex:1;overflow-y:auto;padding:.9rem;display:flex;flex-direction:column;gap:.6rem; }
        #alan-feed::-webkit-scrollbar { width:3px; }
        #alan-feed::-webkit-scrollbar-track { background:transparent; }
        #alan-feed::-webkit-scrollbar-thumb { background:rgba(56,189,248,.3);border-radius:2px; }
        .alan-msg { max-width:85%;padding:.65rem .9rem;border-radius:12px;font-size:.84rem;line-height:1.55;word-break:break-word; }
        .alan-bot { background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.06);color:#e5e7eb;align-self:flex-start;border-radius:4px 12px 12px 12px; }
        .alan-user { background:linear-gradient(135deg,#0369a1,#0ea5e9,#38bdf8);color:#fff;align-self:flex-end;border-radius:12px 4px 12px 12px; }
        .alan-typing-wrap { display:flex;gap:4px;align-items:center;padding:.6rem .9rem; }
        .alan-typing-dot { width:6px;height:6px;border-radius:50%;background:#a855f7;animation:alanDot .9s ease-in-out infinite; }
        .alan-typing-dot:nth-child(2) { animation-delay:.15s; }
        .alan-typing-dot:nth-child(3) { animation-delay:.3s; }
        @keyframes alanDot { 0%,60%,100%{transform:translateY(0);opacity:.4} 30%{transform:translateY(-5px);opacity:1} }
        .alan-qr { display:flex;flex-wrap:wrap;gap:.4rem;padding:.2rem 0; }
        .alan-qr-btn { padding:.35rem .75rem;background:rgba(14,165,233,.12);border:1px solid rgba(56,189,248,.3);border-radius:20px;color:#7dd3fc;font-size:.75rem;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s; }
        .alan-qr-btn:hover { background:rgba(14,165,233,.25);border-color:rgba(56,189,248,.6); }
        #alan-footer { padding:.65rem .8rem;border-top:1px solid rgba(255,255,255,.06);display:flex;gap:.5rem;align-items:center; }
        #alan-input { flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:.6rem .85rem;color:#fff;font-size:.84rem;font-family:inherit;outline:none;transition:border .2s; }
        #alan-input::placeholder { color:#6b7280; }
        #alan-input:focus { border-color:rgba(56,189,248,.5); }
        #alan-send { width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#0369a1,#0ea5e9,#38bdf8);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.85rem;flex-shrink:0;transition:all .2s; }
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
        <div id="alan-bubble">👋 Hi! I'm Alan T — ask me anything!</div>
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
            <strong>Alan T</strong>
            <span>● Online · Impulso Assistant</span>
          </div>
          <a id="alan-jarvis-btn" href="jarvis.html" title="Switch to Voice Mode">🎙️ Voice</a>
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
