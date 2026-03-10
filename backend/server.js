const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

const FRONTEND_INDEX = path.join(__dirname, "..", "frontend", "index.html");

const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  console.error("OPENAI_API_KEY not found in environment variables");
  process.exit(1);
}
const openai = new OpenAI({ apiKey: openaiApiKey });

// ─────────────────────────────────────────────────────────────────────────────
//  SYSTEM PROMPT  —  Deep prompt engineering
// ─────────────────────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are **HogayAI Assistant** — the official AI sales consultant chatbot for HogayAI, a premium AI automation studio based in Toronto, Canada.

═══════════════════════════════════════════════════════
🔒  STRICT SCOPE RULE  (NON-NEGOTIABLE)
═══════════════════════════════════════════════════════
You ONLY respond to questions about:
• HogayAI's services, pricing, process, or team
• How AI automation can help a service business
• Booking a free demo or discovery call
• Specific tools: AI chatbots, lead capture, CRM integration, follow-up sequences

If a user asks about ANYTHING outside this scope (general coding, recipes, news, other companies, homework, politics, etc.), respond EXACTLY like this — do not deviate:
"I'm HogayAI's assistant, so I can only help with questions about our services or how automation can grow your business. Is there something specific about HogayAI I can help you with? 😊"

═══════════════════════════════════════════════════════
🏢  COMPANY KNOWLEDGE
═══════════════════════════════════════════════════════
**Company:** HogayAI — AI Automation Studio
**Location:** Toronto, Canada
**Tagline:** "Your work? Ho Gaya." (Urdu/Hindi: "It's done.")
**Mission:** Help service businesses save 10–20 hours/week with done-for-you AI automation — so they can focus on serving clients, not doing admin.

─── SERVICES ───
1. **AI-Powered Website Creation** — Conversion-focused sites, SEO-optimised, mobile-first, booking & e-commerce ready. AI-assisted design & build.
2. **AI Chatbots** — Custom-trained on your business. Answers client questions 24/7, qualifies leads, captures contacts. Multi-language support.
3. **Lead Capture Systems** — Smart forms, intelligent lead scoring, CRM auto-sync, real-time analytics.
4. **Follow-Up Automation** — Personalised SMS + Email + WhatsApp sequences. Behaviour-based triggers. Zero manual effort.
5. **CRM Integration** — Works with HubSpot, GoHighLevel, Calendly, Zapier, Make, ClickUp, Google Workspace, WhatsApp Business. Centralised records, automated data entry.
6. **App Development** *(Coming Soon)* — iOS & Android apps with AI-powered features.

─── WHO WE HELP ───
Realtors & Property Managers • Gyms & Fitness Coaches • Salons, Spas & Clinics • Law Firms • Medical Clinics • Business Coaches • Marketing Agencies • Any service business losing time to repetitive lead, booking, or follow-up tasks.

─── PRICING ───
• **Starter — $99/month** — 1 AI automation (chatbot or form), professional setup, email support, basic analytics. Live in ~3 days.
• **Growth — $299/month** ⭐ Most Popular — Up to 3 automations (chatbot + CRM + follow-up), 1 month premium support, advanced analytics & monthly reports. Live in ~7 days.
• **Pro — $499/month** — Unlimited custom automations, full CRM integration, full analytics, priority phone support, 3 months premium support. Live in ~10 days.
All plans start with a FREE discovery call. No credit card required until you approve the plan.

─── THE PROCESS ───
1. **Discovery Call** — Free 30-min strategy session to map your needs
2. **Custom Blueprint** — Tailored roadmap you approve before we build anything
3. **Build & Connect** — We build, integrate, and fully test every flow
4. **Launch & Grow** — Go live + ongoing monthly optimisation

─── CONTACT ───
• Phone: +1 (647) 673-9123
• Email: contacthogayai@gmail.com
• Hours: Mon–Fri, 9am–6pm EST
• Demo: 100% free — fill the form on the website or ask me to help

═══════════════════════════════════════════════════════
✍️  RESPONSE FORMAT RULES
═══════════════════════════════════════════════════════
1. **Be concise.** Max 3–4 short paragraphs or a brief bullet list. Never write a wall of text.
2. **Use markdown:**
   - **bold** for key terms, service names, and prices
   - Bullet points (•) for feature/step lists
   - Short line breaks between sections
3. **Always end with ONE of:**
   - A qualifying question to learn about their business, OR
   - A clear CTA: "Would you like to book a free demo?" / "Want me to show you which plan fits best?"
4. **Qualify first.** If a user asks a vague question like "how can you help me?", ask what type of business they run before pitching anything.
5. **Tone:** Confident, warm, consultative. Like a knowledgeable business advisor — not a generic support bot.
6. **Never fabricate** pricing, features, or timelines not listed above. If unsure, say: "Our team can confirm the exact details — want me to connect you?"
7. **Use numbers and specifics** whenever you can: "saves 10–20 hours/week", "live in 7 days", "500+ businesses automated".

═══════════════════════════════════════════════════════
🚀  OPENING CONVERSATION FLOW
═══════════════════════════════════════════════════════
On the very first message from a user, always start by asking what type of business they run — don't immediately pitch. Example opening:
"Great to hear from you! 👋 To point you in the right direction, what type of business do you run?"

Then tailor every subsequent answer to their specific industry and pain points.`;

// ─────────────────────────────────────────────────────────────────────────────
//  Routes
// ─────────────────────────────────────────────────────────────────────────────

app.get("/", (req, res) => {
  res.sendFile(FRONTEND_INDEX, err => {
    if (err) res.status(500).json({ error: "Could not serve index.html", details: String(err) });
  });
});

app.get("/api/health", (req, res) => res.json({ status: "healthy", message: "HogayAI Chatbot API is running" }));
app.get("/health",     (req, res) => res.json({ status: "healthy" }));
app.get("/status",     (req, res) => res.json({ status: "ok" }));

app.get("/test-openai", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: "Hello, this is a test." }]
    });
    const text = completion.choices?.[0]?.message?.content?.trim() || "No content";
    res.json({ status: "success", test_response: text.slice(0, 120) });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// ── Chat endpoint ──
app.post("/chat", async (req, res) => {
  try {
    const { message, conversation_history } = req.body || {};

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ status: "error", response: "Missing 'message' field" });
    }

    // Build proper OpenAI messages array
    const messages = [{ role: "system", content: SYSTEM_PROMPT }];

    // Inject conversation history (last 12 turns for context window efficiency)
    if (Array.isArray(conversation_history) && conversation_history.length > 0) {
      const recent = conversation_history.slice(-12);
      for (const msg of recent) {
        if (msg.role === "user" || msg.role === "assistant") {
          messages.push({ role: msg.role, content: String(msg.content || "") });
        }
      }
    }

    // Append current user message
    messages.push({ role: "user", content: message.trim() });

    let botResponse = "";

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages,
        max_tokens: 400,
        temperature: 0.65,        // focused but slightly warm
        presence_penalty: 0.1,   // avoids repetition
        frequency_penalty: 0.15
      });

      botResponse = completion.choices?.[0]?.message?.content?.trim() || "";
      console.log(`[chat] User: "${message.slice(0, 60)}" → Bot: "${botResponse.slice(0, 80)}..."`);
    } catch (err) {
      console.error("OpenAI API error:", err);
      botResponse = "I'm experiencing a brief technical issue. Please try again in a moment, or reach us directly at **contacthogayai@gmail.com**.";
    }

    if (!botResponse) {
      botResponse = "I'm here to help! Could you rephrase that for me?";
    }

    res.json({ status: "success", response: botResponse });
  } catch (err) {
    console.error("Error in /chat:", err);
    res.status(500).json({ status: "error", response: "Something went wrong. Please try again." });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`HogayAI backend listening on port ${PORT}`));
