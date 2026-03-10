import React, { useEffect, useState, useRef } from "react";
import {
  FiArrowRight, FiZap, FiShield, FiCheck, FiStar,
  FiPhone, FiMail, FiClock, FiChevronDown, FiChevronUp, FiPlay
} from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://hogay-ai-air7.vercel.app";
const LOGO_URL = "https://cdn-icons-png.flaticon.com/512/4712/4712109.png";

function useCountUp(end, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = ts => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? " faq-open" : ""}`} onClick={() => setOpen(o => !o)}>
      <div className="faq-question">
        <span>{q}</span>
        <span className="faq-icon">{open ? <FiChevronUp /> : <FiChevronDown />}</span>
      </div>
      {open && <div className="faq-answer">{a}</div>}
    </div>
  );
}

const SERVICES = [
  {
    icon: "fas fa-laptop-code",
    title: "AI-Powered Website Creation",
    desc: "Modern, conversion-focused websites built with AI assistance — fast, fully responsive, and optimised for leads and sales from day one.",
    features: ["AI-Assisted Design & Build", "SEO Optimisation Included", "Mobile & Core Web Vitals", "E-commerce & Booking Ready", "Easy Drag-and-Drop Editor"],
    featured: true
  },
  {
    icon: "fas fa-robot",
    title: "AI Chatbots",
    desc: "Custom-trained chatbots that answer client questions, capture contact details, and qualify leads around the clock — even at 3am.",
    features: ["24/7 Automated Support", "Lead Qualification Logic", "Multi-language Ready", "Seamless Website Embed"],
    featured: false
  },
  {
    icon: "fas fa-funnel-dollar",
    title: "Lead Capture Systems",
    desc: "Smart forms and automation pipelines that turn website visitors and ad clicks into qualified leads, automatically synced to your CRM.",
    features: ["Smart Form Builders", "Intelligent Lead Scoring", "CRM Auto-Sync", "Real-time Analytics"],
    featured: false
  },
  {
    icon: "fas fa-sync-alt",
    title: "Follow-Up Automation",
    desc: "Personalised SMS, email, and WhatsApp sequences that nurture your leads over days and weeks — with zero manual effort from you.",
    features: ["Personalised Sequences", "SMS + Email + WhatsApp", "Behaviour-Based Triggers", "Performance Tracking"],
    featured: false
  },
  {
    icon: "fas fa-network-wired",
    title: "CRM Integration",
    desc: "Connect every tool in your stack. Every client, note, and follow-up automatically organised and synced across all your platforms in real time.",
    features: ["Centralised Client Records", "Automated Data Entry", "Cross-Platform Workflow", "Real-time Sync"],
    featured: false
  },
  {
    icon: "fas fa-mobile-alt",
    title: "App Development",
    desc: "Fully branded iOS and Android apps that connect directly with your AI systems — delivering a premium client experience on every device.",
    features: ["iOS & Android Native", "AI-Powered Features", "Custom UI/UX Design", "Existing System Integration"],
    featured: false,
    badge: "Coming Soon"
  }
];

const INDUSTRIES = [
  {
    tag: "Real Estate",
    img: "https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1280",
    title: "Realtors & Property Managers",
    desc: "Turn every website enquiry into a booked viewing. Automated lead qualification, smart scheduling, and persistent follow-up so no buyer or tenant ever slips through.",
    points: ["Instant lead response at any hour", "Smart viewing calendar integration", "Automated post-viewing follow-up", "Lead scoring and priority tagging"]
  },
  {
    tag: "Fitness",
    img: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1280",
    title: "Gyms & Fitness Coaches",
    desc: "Automate trial sign-ups, class reminders, no-show re-engagement, and monthly check-ins so every member feels personally attended to — without the extra workload.",
    points: ["Trial membership funnels", "Class reminder & no-show recovery", "Progress check-in messages", "Renewal and upsell sequences"]
  },
  {
    tag: "Beauty",
    img: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1280",
    title: "Salons, Spas & Clinics",
    desc: "Fill your calendar, eliminate no-shows, and collect 5-star reviews on autopilot. Your AI books, confirms, and follows up while you focus entirely on your clients.",
    points: ["24/7 appointment booking", "Automated SMS & email reminders", "Post-visit review requests", "VIP & loyalty flows"]
  },
  {
    tag: "And More",
    img: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1280",
    title: "Agencies, Coaches & Consultants",
    desc: "If you send proposals, book discovery calls, or manage multiple clients — we design a system that handles all the admin and client communication, automatically.",
    points: ["Proposal follow-up automation", "Onboarding & intake flows", "Branded client communication portals", "Monthly reporting & optimisation"],
    highlight: true
  }
];

const HOW_IT_WORKS = [
  {
    num: "01", icon: "fas fa-search", title: "Discovery Call",
    desc: "A free 30-minute strategy session where we learn about your business, your current tools, and exactly where you're losing time or missing leads. No fluff — just clarity."
  },
  {
    num: "02", icon: "fas fa-drafting-compass", title: "Custom Blueprint",
    desc: "We design a tailored automation roadmap specific to your industry, your clients, and your goals. You approve every step before we build a single thing."
  },
  {
    num: "03", icon: "fas fa-cogs", title: "Build & Connect",
    desc: "Our team builds your automations, connects your website, CRM and calendar, trains your AI, and fully tests every flow — before anything goes live."
  },
  {
    num: "04", icon: "fas fa-rocket", title: "Launch & Grow",
    desc: "Your system goes live. We monitor performance, send monthly reports, and continuously optimise your flows so your ROI grows stronger over time."
  }
];

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    role: "Real Estate Agent · Toronto",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300",
    text: "HogayAI transformed how I handle leads. I used to lose half my enquiries because I couldn't respond fast enough. Now an AI replies instantly, qualifies them, and books viewings. I saved 15 hours a week and my closing rate doubled.",
    stars: 5
  },
  {
    name: "James Okonkwo",
    role: "Personal Fitness Coach · London",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
    text: "No-shows dropped by 60% because reminders go out automatically via WhatsApp and email. My clients feel personally attended to, and I barely lift a finger. The follow-up sequences alone were worth every penny.",
    stars: 5
  },
  {
    name: "Priya Sharma",
    role: "Salon Owner · Manchester",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300",
    text: "I was sceptical — I'm not technical at all. But the team set everything up in 5 days. Now my calendar books itself, reviews go out automatically, and I get a monthly report showing exactly how it's all performing. Brilliant service.",
    stars: 5
  }
];

const FAQS = [
  {
    q: "How long does it take to set everything up?",
    a: "Most clients are live within 3 to 7 days. More complex setups with multiple platforms typically take under 2 weeks. We handle absolutely everything — you just approve the plan and we do the rest."
  },
  {
    q: "Do I need any technical knowledge to use HogayAI?",
    a: "Absolutely not. HogayAI is a fully done-for-you service. We design, build, test, and maintain every automation. If you can use WhatsApp, you can benefit from HogayAI."
  },
  {
    q: "What tools and platforms can you integrate with?",
    a: "We work with HubSpot, GoHighLevel, ClickUp, Calendly, Zapier, Make, Google Workspace, WhatsApp Business, and hundreds more. During your discovery call, we confirm your exact stack and map every integration."
  },
  {
    q: "What happens if something breaks or needs updating?",
    a: "All plans include ongoing support. If anything ever breaks, stops working, or needs adjusting, you contact us and we fix it fast. We treat your automation system as seriously as you treat your business."
  },
  {
    q: "Is my client data safe and private?",
    a: "Yes. We follow industry-standard security practices. We only connect to the platforms you explicitly authorise, your data always remains yours, and we're happy to sign NDAs for sensitive projects."
  },
  {
    q: "Can I see a real demo before paying anything?",
    a: "100%. Every engagement begins with a free demo where we show you exactly what your system would look like for your specific business. You only pay once you've seen the solution and are fully confident it will work."
  }
];

// ── Markdown-to-JSX renderer (handles **bold**, bullet lines, newlines) ──
function ChatMessage({ content }) {
  const lines = content.split("\n");
  return (
    <span className="chat-msg-content">
      {lines.map((line, i) => {
        const isBullet = /^[•\-\*]\s/.test(line.trim());
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        const rendered = parts.map((part, j) =>
          part.startsWith("**") && part.endsWith("**")
            ? <strong key={j}>{part.slice(2, -2)}</strong>
            : part
        );
        return (
          <span key={i}>
            {isBullet ? <span className="chat-bullet">•</span> : null}
            <span className={isBullet ? "chat-bullet-text" : ""}>{rendered}</span>
            {i < lines.length - 1 && <br />}
          </span>
        );
      })}
    </span>
  );
}

const QUICK_REPLIES = [
  "What services do you offer?",
  "How much does it cost?",
  "How does the process work?",
  "Book a free demo",
];

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi there! 👋 I'm the HogayAI assistant.\n\nI help service businesses explore our **AI automation services**. To get started — what type of business do you run?",
      time: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [statsVisible, setStatsVisible] = useState(false);
  const [contactSending, setContactSending] = useState(false);
  const [contactError, setContactError] = useState("");
  const statsRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const c1 = useCountUp(500, 2000, statsVisible);
  const c2 = useCountUp(10000, 2200, statsVisible);
  const c3 = useCountUp(98, 1800, statsVisible);
  const c4 = useCountUp(7, 1400, statsVisible);

  useEffect(() => {
    const handleLoad = () => {
      const pre = document.getElementById("preloader");
      if (pre) setTimeout(() => { pre.style.opacity = "0"; pre.style.visibility = "hidden"; }, 1200);
    };
    window.addEventListener("load", handleLoad);
    setTimeout(handleLoad, 2200);

    const onScroll = () => {
      const header = document.getElementById("header");
      if (header) {
        window.scrollY > 80 ? header.classList.add("header-scrolled") : header.classList.remove("header-scrolled");
      }
      document.querySelectorAll("section, .reveal").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 80) el.classList.add("visible");
      });
    };
    window.addEventListener("scroll", onScroll);
    onScroll();

    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("scroll", onScroll);
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, []);

  const handleContactSubmit = async e => {
    e.preventDefault();
    if (contactSending) return;
    setContactSending(true);
    setContactError("");

    const form = e.target;
    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      business: form.business.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim()
    };

    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || data.status !== "success") {
        throw new Error(data?.message || `HTTP ${res.status}`);
      }
      alert(`Thank you, ${payload.name}! Your details have been sent. We'll reach out within 24 hours to schedule your free call.`);
      form.reset();
    } catch (err) {
      console.error("Contact form error:", err);
      setContactError("Unable to send right now. Please try again, or email contacthogayai@gmail.com.");
    } finally {
      setContactSending(false);
    }
  };

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending, chatOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (chatOpen) setTimeout(() => inputRef.current?.focus(), 120);
  }, [chatOpen]);

  const sendMessage = async (text) => {
    const content = text || input.trim();
    if (!content || sending) return;
    const userMsg = { role: "user", content, time: new Date() };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setShowQuickReplies(false);
    setSending(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, conversation_history: history })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMessages(p => [...p, {
        role: "assistant",
        content: data?.response || "I'm here to help! Could you rephrase that?",
        time: new Date()
      }]);
    } catch {
      setError("Having trouble connecting. Please try again in a moment.");
      setSending(false);
    } finally {
      setSending(false);
    }
  };

  const handleInputKeyDown = e => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const formatTime = d => d ? new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";

  return (
    <>
      {/* ── PRELOADER ── */}
      <div id="preloader">
        <div className="preloader-inner">
          <div className="preloader-ring" />
          <div className="preloader-logo">Hogay<span>AI</span></div>
          <p className="preloader-tag">Your work? Ho Gaya.</p>
        </div>
      </div>

      {/* ── HEADER ── */}
      <header id="header">
        <div className="container nav-container">
          <a href="#home" className="logo">
            <img src={LOGO_URL} alt="HogayAI" className="logo-mark" />
            Hogay<span>AI</span>
          </a>
          <div className="mobile-menu" onClick={() => setNavOpen(o => !o)}>
            <i className={`fas ${navOpen ? "fa-times" : "fa-bars"}`} />
          </div>
          <ul className={`nav-links${navOpen ? " active" : ""}`}>
            {["home", "about", "services", "pricing", "faq", "contact"].map(id => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setNavOpen(false)}>
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="nav-cta">Book Free Demo <FiArrowRight /></a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="container">
          <div className="hero-center">
            <div className="hero-eyebrow">
              <span className="eyebrow-dot" />
              AI Automation Studio · Toronto, Canada
            </div>
            <h1 className="hero-title">
              Your Business.<br />
              <span className="grad-text">Running Itself.</span>
            </h1>
            <p className="hero-tagline">
              Done-for-you AI systems that automate follow-ups, capture leads,
              and grow your revenue — while you sleep.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn-primary btn-hero">
                Book Free Demo <FiArrowRight />
              </a>
              <a href="#how-it-works" className="btn-ghost btn-hero">
                <span className="ghost-play"><FiPlay /></span>
                How It Works
              </a>
            </div>
            <div className="hero-trust">
              <span><strong>500+</strong> Businesses Automated</span>
              <span className="trust-sep" />
              <span><strong>7-Day</strong> Live Setup</span>
              <span className="trust-sep" />
              <span><strong>24 / 7</strong> AI Always On</span>
            </div>
          </div>
        </div>
        <div className="scroll-indicator"><FaChevronDown /></div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="marquee-strip">
        <div className="container">
          <p className="marquee-label">Trusted by service businesses across North America &amp; the UK</p>
        </div>
        <div className="marquee-track">
          {[...Array(2)].map((_, ri) =>
            ["Real Estate", "Fitness Studios", "Salons & Spas", "Law Firms", "Medical Clinics", "Business Coaches", "Marketing Agencies", "Consultants"].map(l => (
              <div className="marquee-item" key={`${l}-${ri}`}>
                <i className="fas fa-circle" /> {l}
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="stats-band" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            {[
              { val: `${c1}+`, label: "Businesses Automated" },
              { val: `${c2.toLocaleString()}+`, label: "Hours Saved Monthly" },
              { val: `${c3}%`, label: "Client Satisfaction" },
              { val: `${c4} Days`, label: "Average Go-Live Time" }
            ].map(s => (
              <div className="stat-block" key={s.label}>
                <span className="stat-num">{s.val}</span>
                <span className="stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-layout">
            <div className="about-media">
              <div className="about-img-stack">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920"
                  alt="HogayAI team collaborating"
                  className="about-img-main"
                />
                <img
                  src="https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=900"
                  alt="AI automation dashboard"
                  className="about-img-secondary"
                />
                <div className="about-float-badge">
                  <i className="fas fa-award" />
                  <div><strong>Industry-leading</strong><span>Automation partner</span></div>
                </div>
              </div>
            </div>
            <div className="about-copy">
              <div className="sec-label">About HogayAI</div>
              <h2>We Turn Repetitive Work<br /><span className="grad-text">Into Automated Systems</span></h2>
              <p className="about-lead">
                Most service businesses lose money not because they lack clients — but because
                they're too busy doing manual, repetitive work to serve them well. Responding
                to enquiries, sending reminders, updating CRMs, booking appointments. It never ends.
              </p>
              <p className="about-body">
                HogayAI was built to fix that. We're an AI automation studio that designs, builds,
                and manages intelligent systems for realtors, fitness coaches, salons, agencies,
                and service businesses of every kind. We handle all the technical heavy lifting so
                you can focus entirely on what actually grows your business — serving your clients.
              </p>
              <div className="about-checks">
                {[
                  "100% done-for-you — we build everything",
                  "Human-like AI that represents your brand",
                  "Live in 3–7 days with full ongoing support",
                  "Integrates with the tools you already use"
                ].map(item => (
                  <div className="check-row" key={item}>
                    <span className="check-icon"><FiCheck /></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <a href="#contact" className="btn-primary">Start Free Discovery Call <FiArrowRight /></a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="services" id="services">
        <div className="container">
          <div className="sec-title">
            <div className="sec-label">What We Build</div>
            <h2>Automation Services Built<br />For Your Business</h2>
            <p>Every service is designed from scratch for your industry, your clients, and your goals. No templates. No guesswork.</p>
          </div>
          <div className="services-grid">
            {SERVICES.map((svc, i) => (
              <div
                key={svc.title}
                className={`svc-card${svc.featured ? " svc-card--featured" : ""}`}
                style={{ "--d": `${i * 0.08}s` }}
              >
                {svc.badge && <span className="svc-badge">{svc.badge}</span>}
                {svc.featured && <span className="svc-badge svc-badge--star">⭐ Featured</span>}
                <div className={`svc-icon${svc.featured ? " svc-icon--featured" : ""}`}>
                  <i className={svc.icon} />
                </div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <ul className="svc-list">
                  {svc.features.map(f => <li key={f}><FiCheck />{f}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="industries" id="industries">
        <div className="container">
          <div className="sec-title sec-title--light">
            <div className="sec-label sec-label--light">Who We Help</div>
            <h2>Built for Every<br />Service Business</h2>
            <p>Whether you're a solo coach or run a team of 50, HogayAI builds a system that fits exactly how you work.</p>
          </div>
          <div className="industries-grid">
            {INDUSTRIES.map(ind => (
              <div className={`ind-card${ind.highlight ? " ind-card--glow" : ""}`} key={ind.title}>
                <div className="ind-img-wrap">
                  <img src={ind.img} alt={ind.tag} />
                  <div className="ind-overlay">{ind.tag}</div>
                </div>
                <div className="ind-body">
                  <h3>{ind.title}</h3>
                  <p>{ind.desc}</p>
                  <ul>
                    {ind.points.map(p => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="hiw" id="how-it-works">
        <div className="container">
          <div className="sec-title">
            <div className="sec-label">The Process</div>
            <h2>From Zero to Automated<br /><span className="grad-text">in Under 7 Days</span></h2>
            <p>A transparent four-step process. We do the technical heavy lifting — you get the results.</p>
          </div>
          <div className="hiw-grid">
            {HOW_IT_WORKS.map((step, i) => (
              <div className="hiw-step" key={step.num}>
                <div className="hiw-num">{step.num}</div>
                <div className="hiw-icon"><i className={step.icon} /></div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials">
        <div className="container">
          <div className="sec-title">
            <div className="sec-label">Client Stories</div>
            <h2>What Our Clients Say<br /><span className="grad-text">After Going Live</span></h2>
            <p>Real results from real service businesses. This is what happens when repetitive work gets automated.</p>
          </div>
          <div className="testi-grid">
            {TESTIMONIALS.map(t => (
              <div className="testi-card" key={t.name}>
                <div className="testi-stars">
                  {[...Array(t.stars)].map((_, i) => <FiStar key={i} />)}
                </div>
                <p className="testi-text">"{t.text}"</p>
                <div className="testi-author">
                  <img src={t.avatar} alt={t.name} />
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="pricing" id="pricing">
        <div className="container">
          <div className="sec-title">
            <div className="sec-label">Pricing</div>
            <h2>Simple, Transparent<br />Pricing</h2>
            <p>All plans include a free discovery call and live demo before you pay a single penny. No long-term contracts.</p>
          </div>
          <div className="pricing-grid">
            <div className="price-card">
              <div className="price-tier">Starter</div>
              <div className="price-amount"><sup>$</sup>99<sub>/mo</sub></div>
              <p className="price-desc">Perfect for solo operators just getting started with AI automation.</p>
              <ul className="price-features">
                <li><FiCheck />1 AI automation (chatbot or form)</li>
                <li><FiCheck />Professional setup included</li>
                <li><FiCheck />1 week of premium support</li>
                <li><FiCheck />Basic analytics dashboard</li>
                <li><FiCheck />Email support</li>
              </ul>
              <div className="price-setup"><i className="far fa-clock" /> Setup in 3 days</div>
              <a href="#contact" className="btn-outline">Get Started</a>
            </div>

            <div className="price-card price-card--feat">
              <div className="price-pop">Most Popular</div>
              <div className="price-tier">Growth</div>
              <div className="price-amount"><sup>$</sup>299<sub>/mo</sub></div>
              <p className="price-desc">For growing businesses that need multiple automations working as a system.</p>
              <ul className="price-features">
                <li><FiCheck />Up to 3 automations</li>
                <li><FiCheck />AI chatbot + CRM integration</li>
                <li><FiCheck />Follow-up automation sequences</li>
                <li><FiCheck />1 month of premium support</li>
                <li><FiCheck />Advanced analytics + monthly reports</li>
              </ul>
              <div className="price-setup"><i className="far fa-clock" /> Setup in 7 days</div>
              <a href="#contact" className="btn-primary">Get Started</a>
            </div>

            <div className="price-card">
              <div className="price-tier">Pro</div>
              <div className="price-amount"><sup>$</sup>499<sub>/mo</sub></div>
              <p className="price-desc">The full system — custom automations, deep CRM, and dedicated strategy support.</p>
              <ul className="price-features">
                <li><FiCheck />Unlimited custom automations</li>
                <li><FiCheck />Full analytics dashboard</li>
                <li><FiCheck />3 months premium support</li>
                <li><FiCheck />Full CRM integration</li>
                <li><FiCheck />Priority phone support</li>
              </ul>
              <div className="price-setup"><i className="far fa-clock" /> Setup in 10 days</div>
              <a href="#contact" className="btn-outline">Get Started</a>
            </div>
          </div>
          <p className="price-note">All plans include a free consultation before purchase. Custom enterprise solutions available — <a href="#contact">contact us</a>.</p>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="cta-band">
        <div className="container">
          <div className="cta-inner">
            <div className="cta-copy">
              <h2>See It Working on Your Business — For Free</h2>
              <p>Book a 30-minute demo and we'll show you exactly how automation would work for your specific business. No commitment, no pressure, no jargon.</p>
            </div>
            <div className="cta-actions">
              <a href="#contact" className="btn-white">Book Free Demo <FiArrowRight /></a>
              <div className="cta-micro">
                <span><FiZap /> Less than 5 minutes to apply</span>
                <span><FiShield /> No credit card required</span>
              </div>
            </div>
          </div>
          <div className="cta-gallery">
            <img src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1280" alt="Business automation dashboard" />
            <img src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1280" alt="Revenue analytics" />
            <img src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1280" alt="AI chat interface" />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq" id="faq">
        <div className="container">
          <div className="sec-title">
            <div className="sec-label">FAQ</div>
            <h2>Questions We Hear<br />All The Time</h2>
            <p>If your question isn't answered here, just send us a message — we reply within a few hours.</p>
          </div>
          <div className="faq-layout">
            <div className="faq-col">
              {FAQS.slice(0, 3).map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
            </div>
            <div className="faq-col">
              {FAQS.slice(3).map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-info">
              <div className="sec-label">Get In Touch</div>
              <h2>Let's Build Your<br /><span className="grad-text">Automation System</span></h2>
              <p>Tell us what's taking up too much of your time. We'll design a solution and walk you through it — completely free, no obligation.</p>
              <div className="contact-items">
                {[
                  { icon: <FiPhone />, label: "Phone", val: "+1 (647) 673-9123", href: "tel:+16476739123" },
                  { icon: <FiMail />, label: "Email", val: "contacthogayai@gmail.com", href: "mailto:contacthogayai@gmail.com" },
                  { icon: <FiClock />, label: "Hours", val: "Mon–Fri: 9am – 6pm EST", href: null }
                ].map(c => (
                  <div className="ci-item" key={c.label}>
                    <div className="ci-icon">{c.icon}</div>
                    <div>
                      <strong>{c.label}</strong>
                      {c.href ? <a href={c.href}>{c.val}</a> : <span>{c.val}</span>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="contact-img">
                <img src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1280" alt="HogayAI team ready to help" />
              </div>
            </div>
            <div className="contact-form-wrap">
              <div className="contact-form-card">
                <h3>Book Your Free Discovery Call</h3>
                <p>Fill in below and we'll reach out within 24 hours to schedule your free strategy session.</p>
                <form onSubmit={handleContactSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input type="text" id="name" name="name" className="form-control" placeholder="John Smith" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" name="email" className="form-control" placeholder="john@example.com" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="business">Business Type</label>
                    <input type="text" id="business" name="business" className="form-control" placeholder="e.g. Real Estate Agency, Fitness Studio, Salon..." required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" className="form-control" placeholder="+1 (000) 000-0000" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">What would you like to automate?</label>
                    <textarea id="message" name="message" className="form-control" rows="4" placeholder="Tell us what's taking up too much time — lead follow-ups, bookings, CRM updates, reminders..." required />
                  </div>
                  {contactError && (
                    <p className="form-error">{contactError}</p>
                  )}
                  <button type="submit" className="btn-primary btn-full" disabled={contactSending}>
                    {contactSending ? "Sending..." : "Send Message & Book Call"} <FiArrowRight />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#home" className="logo footer-logo">
                <img src={LOGO_URL} alt="HogayAI" className="logo-mark" />
                Hogay<span>AI</span>
              </a>
              <p>Your work? Ho Gaya. Done-for-you AI automation services that save time, capture leads, and grow your business — while you sleep.</p>
              <div className="footer-social">
                {[["fab fa-facebook-f", "Facebook"], ["fab fa-twitter", "Twitter"], ["fab fa-linkedin-in", "LinkedIn"], ["fab fa-instagram", "Instagram"]].map(([ic, lbl]) => (
                  <a href="#" key={lbl} aria-label={lbl}><i className={ic} /></a>
                ))}
              </div>
            </div>
            <div className="footer-col">
              <h4>Navigation</h4>
              <ul>
                {[["#home","Home"],["#about","About"],["#services","Services"],["#pricing","Pricing"],["#faq","FAQ"],["#contact","Contact"]].map(([href, label]) => (
                  <li key={label}><a href={href}>{label}</a></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                {["AI Website Creation","AI Chatbots","Lead Capture","Follow-Up Automation","CRM Integration","App Development"].map(s => (
                  <li key={s}><a href="#services">{s}</a></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li><a href="tel:+16476739123"><i className="fas fa-phone-alt" /> +1 (647) 673-9123</a></li>
                <li><a href="mailto:contacthogayai@gmail.com"><i className="fas fa-envelope" /> contacthogayai@gmail.com</a></li>
                <li><a href="#"><i className="fas fa-map-marker-alt" /> Toronto, Canada</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 HogayAI. All rights reserved.</p>
            <p>Designed with <i className="fas fa-heart" /> for service businesses everywhere</p>
          </div>
        </div>
      </footer>

      {/* ── CHAT WIDGET ── */}
      <div className={`chat-toggle${chatOpen ? " chat-toggle--open" : ""}`} onClick={() => setChatOpen(o => !o)} aria-label="Open chat">
        <i className={`fas ${chatOpen ? "fa-times" : "fa-comments"}`} />
        {!chatOpen && <span className="chat-notif" />}
      </div>

      {chatOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-hleft">
              <div className="chat-avatar">
                <i className="fas fa-robot" />
                <span className="chat-avatar-dot" />
              </div>
              <div>
                <div className="chat-title">HogayAI Assistant</div>
                <div className="chat-sub"><span className="chat-dot" /> Online &middot; replies instantly</div>
              </div>
            </div>
            <button className="chat-close" onClick={() => setChatOpen(false)} type="button" aria-label="Close chat">
              <i className="fas fa-times" />
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((m, i) => {
              const isUser = m.role === "user";
              return (
                <div key={i} className={`chat-row chat-row--${isUser ? "user" : "bot"}`}>
                  {!isUser && (
                    <div className="chat-bot-avatar">
                      <i className="fas fa-robot" />
                    </div>
                  )}
                  <div className="chat-bubble-wrap">
                    <div className={`chat-bubble chat-bubble--${isUser ? "user" : "bot"}`}>
                      <ChatMessage content={m.content} />
                    </div>
                    <div className={`chat-time chat-time--${isUser ? "user" : "bot"}`}>
                      {formatTime(m.time)}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {sending && (
              <div className="chat-row chat-row--bot">
                <div className="chat-bot-avatar"><i className="fas fa-robot" /></div>
                <div className="chat-bubble-wrap">
                  <div className="chat-bubble chat-bubble--bot chat-bubble--typing">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="chat-row chat-row--bot">
                <div className="chat-bot-avatar"><i className="fas fa-robot" /></div>
                <div className="chat-error-bubble">{error}</div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick reply chips */}
          {showQuickReplies && (
            <div className="chat-quick-replies">
              {QUICK_REPLIES.map(q => (
                <button key={q} className="chat-chip" onClick={() => sendMessage(q)} type="button">
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input bar */}
          <div className="chat-input-bar">
            <input
              ref={inputRef}
              className="chat-input"
              type="text"
              placeholder="Ask about our services…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              disabled={sending}
              maxLength={400}
            />
            <button
              className="chat-send"
              onClick={() => sendMessage()}
              disabled={sending || !input.trim()}
              type="button"
              aria-label="Send"
            >
              {sending
                ? <i className="fas fa-circle-notch fa-spin" />
                : <i className="fas fa-paper-plane" />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
