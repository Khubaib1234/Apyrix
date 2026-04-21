"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import "./homepage.css";

// ── Scroll-animated card wrapper ──────────────────────────────────────────────
function AnimatedCard({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Nav page data (each gets a full-screen overlay like services) ─────────────
const navPageData = {
  Home: {
    label: "Home",
    color: "#38bdf8",
    headline: "Welcome to IT Services",
    description:
      "We are a full-service technology company dedicated to empowering businesses with modern, scalable, and secure digital solutions. From sleek web applications to enterprise hardware — we are your one-stop technology partner, delivering results that matter.",
    bullets: ["Cutting-edge Technology", "Dedicated Support Team", "Proven Track Record", "Transparent Pricing"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="service-hero-svg">
        <path d="M8 28L32 8l24 20v28H40V40H24v16H8V28z" stroke="#38bdf8" strokeWidth="2.5" fill="rgba(56,189,248,0.08)" strokeLinejoin="round" />
        <rect x="27" y="40" width="10" height="16" rx="2" fill="rgba(56,189,248,0.25)" />
        <circle cx="32" cy="22" r="4" fill="rgba(56,189,248,0.4)" stroke="#38bdf8" strokeWidth="1.5" />
      </svg>
    ),
  },
  "About Us": {
    label: "About Us",
    color: "#a78bfa",
    headline: "Who We Are",
    description:
      "We are a passionate team of engineers, designers, and strategists united by a single goal — delivering technology that transforms businesses. With years of expertise across web development, digital publishing, and IT infrastructure, we partner with companies of all sizes to bring their vision to life.",
    bullets: ["Experienced Engineering Team", "Client-first Culture", "Agile Delivery Process", "ISO-grade Quality Standards"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="service-hero-svg">
        <circle cx="22" cy="20" r="9" stroke="#a78bfa" strokeWidth="2.5" fill="rgba(167,139,250,0.08)" />
        <circle cx="42" cy="20" r="9" stroke="#a78bfa" strokeWidth="2.5" fill="rgba(167,139,250,0.08)" />
        <path d="M6 52c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M26 52c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  "Contact Us": {
    label: "Contact Us",
    color: "#34d399",
    headline: "Let's Work Together",
    description:
      "Got a project in mind? We'd love to hear about it. Fill out the form below and our team will get back to you within 24 hours with a personalised response.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="service-hero-svg">
        <rect x="6" y="14" width="52" height="36" rx="5" stroke="#34d399" strokeWidth="2.5" fill="rgba(52,211,153,0.08)" />
        <path d="M6 20l26 18L58 20" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  "Payment Gateway": {
    label: "Payment Gateway",
    color: "#fb923c",
    headline: "Secure Payment Gateway",
    description:
      "Our Payment Gateway integration is fast, secure, and supports multiple currencies and payment methods. PCI-DSS compliant infrastructure ensures every transaction is protected end-to-end.",
    bullets: ["PCI-DSS Compliant", "Multi-currency Support", "Instant Settlement", "24/7 Fraud Monitoring"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="service-hero-svg">
        <rect x="4" y="14" width="56" height="36" rx="6" stroke="#fb923c" strokeWidth="2.5" fill="rgba(251,146,60,0.08)" />
        <rect x="4" y="24" width="56" height="8" fill="rgba(251,146,60,0.2)" />
        <rect x="12" y="38" width="16" height="5" rx="2" fill="rgba(251,146,60,0.35)" />
        <rect x="34" y="38" width="8" height="5" rx="2" fill="rgba(251,146,60,0.2)" />
        <rect x="46" y="38" width="8" height="5" rx="2" fill="rgba(251,146,60,0.2)" />
      </svg>
    ),
  },
};

// ── Service details data ──────────────────────────────────────────────────────
const serviceDetails = {
  Webapp: {
    label: "Web Application",
    color: "#60a5fa",
    description:
      "We craft modern, responsive web applications built for speed, scale, and security. From landing pages to full-stack SaaS platforms, our solutions are tailored to your exact business needs — delivering seamless user experiences across every device.",
    bullets: ["Custom UI/UX Design", "API Integration", "Cross-device Responsive", "Scalable Architecture"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="service-hero-svg">
        <rect x="4" y="10" width="56" height="40" rx="6" stroke="#60a5fa" strokeWidth="3" fill="rgba(96,165,250,0.08)" />
        <rect x="4" y="10" width="56" height="12" rx="6" fill="rgba(96,165,250,0.18)" />
        <circle cx="14" cy="16" r="3" fill="#60a5fa" />
        <circle cx="24" cy="16" r="3" fill="#34d399" />
        <circle cx="34" cy="16" r="3" fill="#f87171" />
        <rect x="12" y="30" width="16" height="12" rx="3" fill="rgba(96,165,250,0.3)" />
        <rect x="34" y="30" width="20" height="5" rx="2" fill="rgba(96,165,250,0.2)" />
        <rect x="34" y="38" width="12" height="4" rx="2" fill="rgba(96,165,250,0.15)" />
      </svg>
    ),
  },
  Ebook: {
    label: "Interactive E-books",
    color: "#c084fc",
    description:
      "Visually rich, multimedia-powered e-books for education, marketing, and corporate communication. We embed interactive animations, quizzes, and multimedia elements that turn static content into engaging digital experiences — compatible with every platform.",
    bullets: ["Multimedia Elements", "Interactive Animations", "Multi-platform Support", "Custom Branding"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="service-hero-svg">
        <rect x="10" y="6" width="34" height="46" rx="4" stroke="#c084fc" strokeWidth="3" fill="rgba(192,132,252,0.08)" />
        <rect x="16" y="6" width="34" height="46" rx="4" stroke="#c084fc" strokeWidth="2" fill="rgba(192,132,252,0.05)" strokeDasharray="3 2" />
        <line x1="18" y1="18" x2="36" y2="18" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
        <line x1="18" y1="25" x2="36" y2="25" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
        <line x1="18" y1="32" x2="30" y2="32" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
        <rect x="18" y="38" width="14" height="8" rx="2" fill="rgba(192,132,252,0.3)" />
        <circle cx="46" cy="46" r="10" fill="#7c3aed" opacity="0.9" />
        <path d="M42 46 L45 49 L50 43" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  "IT Hardware": {
    label: "IT Hardware",
    color: "#22d3ee",
    description:
      "High-performance hardware solutions — enterprise servers, networking infrastructure, and customised workstations with full setup, configuration, and ongoing technical support. We source, deploy, and maintain the foundation your business runs on.",
    bullets: ["Enterprise Servers", "Network Infrastructure", "Hardware Installation", "Ongoing Support"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="service-hero-svg">
        <rect x="6" y="16" width="52" height="28" rx="4" stroke="#22d3ee" strokeWidth="3" fill="rgba(34,211,238,0.08)" />
        <rect x="12" y="22" width="8" height="16" rx="2" fill="rgba(34,211,238,0.25)" />
        <rect x="24" y="22" width="8" height="16" rx="2" fill="rgba(34,211,238,0.25)" />
        <rect x="36" y="22" width="8" height="16" rx="2" fill="rgba(34,211,238,0.25)" />
        <circle cx="13" cy="46" r="3" fill="#22d3ee" />
        <circle cx="51" cy="46" r="3" fill="#22d3ee" />
        <line x1="13" y1="46" x2="51" y2="46" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx="50" cy="26" r="4" fill="rgba(34,211,238,0.4)" stroke="#22d3ee" strokeWidth="1.5" />
      </svg>
    ),
  },
};

// ── Unified Full-Screen Overlay ───────────────────────────────────────────────
function PageOverlay({ data, onClose, onGetStarted, amount, setAmount, onCheckout, onSubmitContact }) {
  if (!data) return null;
  const isContact = data.label === "Contact Us";
  const isPayment = data.label === "Payment Gateway";

  return (
    <motion.div
      className="service-overlay"
      style={{ "--svc-color": data.color }}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Close btn */}
      <button className="service-overlay-close" onClick={onClose}>✕</button>

      {/* Hero: icon + title */}
      <motion.div
        className="service-overlay-hero"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="service-overlay-icon"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 220 }}
        >
          {data.icon}
        </motion.div>
        <motion.h1
          className="service-overlay-title"
          style={{ color: data.color }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.45 }}
        >
          {data.headline || data.label}
        </motion.h1>
      </motion.div>

      {/* Body */}
      <motion.div
        className="service-overlay-body"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="service-overlay-desc">{data.description}</p>

        {/* Bullet points for pages that have them */}
        {data.bullets && (
          <ul className="overlay-bullets">
            {data.bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.07 }}
              >
                <span className="overlay-bullet-dot" style={{ background: data.color }} />
                {b}
              </motion.li>
            ))}
          </ul>
        )}

        {/* Contact form */}
        {isContact && (
          <form className="overlay-form" onSubmit={onSubmitContact}>
            <div className="overlay-form-row">
              <input name="name" type="text" placeholder="Your Name" required />
              <input name="email" type="email" placeholder="Email Address" required />
            </div>
            <input name="phone" type="tel" placeholder="Phone Number" />
            <textarea name="project" placeholder="Tell us about your project..." rows={4} required />
            <motion.button
              type="submit"
              className="service-overlay-cta"
              style={{ "--btn-color": data.color }}
              whileHover={{ scale: 1.04, boxShadow: `0 0 28px ${data.color}55` }}
              whileTap={{ scale: 0.97 }}
            >
              Send Message →
            </motion.button>
          </form>
        )}

        {/* Payment widget */}
        {isPayment && (
          <div className="overlay-payment">
            <div className="overlay-payment-input-wrap">
              <span className="overlay-payment-currency">$</span>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                className="overlay-payment-input"
              />
            </div>
            {amount && (
              <p className="overlay-payment-note">
                Charge amount: <strong>{Number(amount) * 100} smallest units</strong>
              </p>
            )}
            <motion.button
              className="service-overlay-cta"
              style={{ "--btn-color": data.color }}
              onClick={onCheckout}
              whileHover={{ scale: 1.04, boxShadow: `0 0 28px ${data.color}55` }}
              whileTap={{ scale: 0.97 }}
            >
              Proceed to Checkout →
            </motion.button>
          </div>
        )}

        {/* Generic pages: Get Started button */}
        {!isContact && !isPayment && (
          <motion.button
            className="service-overlay-cta"
            style={{ "--btn-color": data.color }}
            onClick={onGetStarted}
            whileHover={{ scale: 1.05, boxShadow: `0 0 28px ${data.color}55` }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.4 }}
          >
            Get Started →
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── Service Showcase Card (individual entry animation) ─────────────────────────
const entryVariants = {
  left:   { hidden: { opacity: 0, x: -80, scale: 0.92 }, visible: { opacity: 1, x: 0, scale: 1 } },
  right:  { hidden: { opacity: 0, x:  80, scale: 0.92 }, visible: { opacity: 1, x: 0, scale: 1 } },
  bottom: { hidden: { opacity: 0, y:  60, scale: 0.92 }, visible: { opacity: 1, y: 0, scale: 1 } },
};

function ServiceShowcaseCard({ delay, animFrom, accentColor, glowClass, iconWrapClass, badge, title, description, features, featureDotClass, tags, featured, icon, onExplore }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const variants = entryVariants[animFrom] || entryVariants.bottom;
  return (
    <motion.div
      ref={ref}
      className={`ssc-card${featured ? " ssc-card--featured" : ""}`}
      style={{ "--accent": accentColor }}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -12, scale: 1.025, boxShadow: `0 24px 64px ${accentColor}28` }}
    >
      {/* Ambient glow blob */}
      <div className={`service-card-glow ${glowClass}`} />

      {/* Icon with floating pulse */}
      <motion.div
        className={`service-icon-wrap ${iconWrapClass} ssc-icon`}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: delay * 2 }}
      >
        {icon}
      </motion.div>

      {badge && <div className="service-card-badge">{badge}</div>}

      <div className="service-card-content">
        <h3 className="service-card-title ssc-title">{title}</h3>
        <p className="service-card-text">{description}</p>
        <ul className="service-features">
          {features.map((f, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -14 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: delay + 0.3 + i * 0.07, duration: 0.4 }}
            >
              <span className={`feature-dot ${featureDotClass}`} />{f}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="ssc-footer">
        <div className="service-card-footer" style={{ border: "none", paddingTop: 0 }}>
          {tags.map((t) => <span key={t} className="service-card-tag">{t}</span>)}
        </div>
        <motion.button
          className="ssc-explore-btn"
          style={{ "--btn-accent": accentColor }}
          onClick={onExplore}
          whileHover={{ scale: 1.07, x: 4 }}
          whileTap={{ scale: 0.96 }}
        >
          Explore →
        </motion.button>
      </div>

      {/* Bottom accent line */}
      <div className="ssc-accent-line" />
    </motion.div>
  );
}

// ── Testimonials data ─────────────────────────────────────────────────────────
const testimonials = [
  {
    quote: "They transformed our outdated system into a sleek, fast web application in record time. Communication was stellar and the results exceeded every expectation.",
    name: "Sarah Mitchell",
    role: "CEO, BrightPath Ventures",
    initials: "SM",
    color: "#38bdf8",
  },
  {
    quote: "The interactive e-book they built for our training program boosted engagement by 70%. Our learners absolutely love it. Worth every penny.",
    name: "James Okafor",
    role: "Head of L&D, TechCorp Africa",
    initials: "JO",
    color: "#c084fc",
  },
  {
    quote: "Our entire server infrastructure was set up and running within days. Zero downtime, seamless migration. The ongoing support team is always there when we need them.",
    name: "Lena Voss",
    role: "CTO, NordixSolutions GmbH",
    initials: "LV",
    color: "#34d399",
  },
];

// ── Testimonials Carousel (one card shown at a time, slide left/right) ─────────
function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward (right→left), -1 = backward
  const timerRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const goTo = useCallback((next) => {
    const dir = next > index ? 1 : -1;
    setDirection(dir);
    setIndex(next);
  }, [index]);

  const next = useCallback(() => {
    const n = (index + 1) % testimonials.length;
    setDirection(1);
    setIndex(n);
  }, [index]);

  const prev = useCallback(() => {
    const n = (index - 1 + testimonials.length) % testimonials.length;
    setDirection(-1);
    setIndex(n);
  }, [index]);

  // Auto-rotate every 4.5 s
  useEffect(() => {
    timerRef.current = setInterval(next, 4500);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? "110%" : "-110%", opacity: 0, scale: 0.92 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit:  (dir) => ({ x: dir > 0 ? "-110%" : "110%", opacity: 0, scale: 0.92 }),
  };

  const t = testimonials[index];

  return (
    <section className="testimonials-section" ref={ref}>
      <motion.div
        className="services-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="services-tag">Testimonials</span>
        <h2 className="services-title">What Our Clients Say</h2>
        <p className="services-desc">Real feedback from businesses we have helped grow and transform.</p>
      </motion.div>

      <div className="tcar-wrap">
        {/* Prev button */}
        <motion.button
          className="tcar-nav tcar-nav--prev"
          onClick={() => { clearInterval(timerRef.current); prev(); timerRef.current = setInterval(next, 4500); }}
          whileHover={{ scale: 1.12, backgroundColor: "rgba(255,255,255,0.14)" }}
          whileTap={{ scale: 0.93 }}
        >
          ‹
        </motion.button>

        {/* Slide area */}
        <div className="tcar-viewport">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              className="testimonial-card tcar-card"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Glow accent */}
              <div className="tcar-glow" style={{ background: t.color }} />

              <div className="testimonial-quote">&ldquo;</div>
              <p className="testimonial-text">{t.quote}</p>
              <div className="testimonial-author">
                <motion.div
                  className="testimonial-avatar tcar-avatar"
                  style={{ background: `linear-gradient(135deg, ${t.color}55, ${t.color}22)`, border: `2px solid ${t.color}66` }}
                  animate={{ boxShadow: [`0 0 0px ${t.color}00`, `0 0 18px ${t.color}55`, `0 0 0px ${t.color}00`] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {t.initials}
                </motion.div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
              <div className="testimonial-stars">
                {[1,2,3,4,5].map((s) => (
                  <motion.span
                    key={s}
                    className="star"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + s * 0.07, type: "spring", stiffness: 300 }}
                  >★</motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next button */}
        <motion.button
          className="tcar-nav tcar-nav--next"
          onClick={() => { clearInterval(timerRef.current); next(); timerRef.current = setInterval(next, 4500); }}
          whileHover={{ scale: 1.12, backgroundColor: "rgba(255,255,255,0.14)" }}
          whileTap={{ scale: 0.93 }}
        >
          ›
        </motion.button>
      </div>

      {/* Dot indicators */}
      <div className="tcar-dots">
        {testimonials.map((_, i) => (
          <motion.button
            key={i}
            className={`tcar-dot${i === index ? " tcar-dot--active" : ""}`}
            onClick={() => { clearInterval(timerRef.current); goTo(i); timerRef.current = setInterval(next, 4500); }}
            whileHover={{ scale: 1.4 }}
            animate={i === index ? { scale: 1.3, opacity: 1 } : { scale: 1, opacity: 0.4 }}
            transition={{ duration: 0.25 }}
          />
        ))}
      </div>
    </section>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Home() {
  const [activePage, setActivePage] = useState(null);   // key into navPageData or serviceDetails
  const [activePageType, setActivePageType] = useState(null); // "nav" | "service"
  const [amount, setAmount] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesSubOpen, setServicesSubOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const serviceKeys = ["Webapp", "Ebook", "IT Hardware"];

  // Close hamburger dropdown on outside click
  useEffect(() => {
    function handler(e) {
      if (
        menuRef.current && !menuRef.current.contains(e.target) &&
        hamburgerRef.current && !hamburgerRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
        setServicesSubOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock scroll when overlay / modal open
  useEffect(() => {
    const locked = activePage || showContactModal;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activePage, showContactModal]);

  // ── Handlers ──
  function openNavPage(key) {
    setActivePage(key);
    setActivePageType("nav");
    setMenuOpen(false);
    setServicesSubOpen(false);
  }

  function openService(key) {
    setActivePage(key);
    setActivePageType("service");
    setMenuOpen(false);
    setServicesSubOpen(false);
  }

  function closeOverlay() {
    setActivePage(null);
    setActivePageType(null);
  }

  const currentData =
    activePageType === "nav"
      ? navPageData[activePage]
      : activePageType === "service"
        ? serviceDetails[activePage]
        : null;

  // Form submit (both overlay contact & page contact section)
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      project: e.target.project.value,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      alert(data.message);
      e.target.reset();
      setShowContactModal(false);
      closeOverlay();
    } catch (err) {
      console.error(err);
      alert("Something went wrong when submitting the form!");
    }
  }

  async function handleCheckout() {
    if (!amount || amount <= 0) { alert("Please enter a valid amount"); return; }
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amount) * 100 }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Something went wrong during payment.");
    } catch (err) {
      console.error(err);
      alert("Payment initialization failed.");
    }
  }

  return (
    <>
      {/* ================== LANDING SECTION ================== */}
      <div className="landing-container">
        {/* ── NAVBAR ── */}
        <nav className="navbar">
          {/* Logo */}
          <div className="logo-container">
            <div className="logo">
              <div className="logo-title">IT</div>
              <div className="logo-subtitle">SERVICES</div>
            </div>
          </div>

          {/* ── Desktop nav links ── */}
          <div className="nav-links desktop-nav">
            {/* Home */}
            <motion.div className="nav-link" onClick={() => openNavPage("Home")} whileHover={{ scale: 1.08 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
              Home
            </motion.div>

            {/* Services dropdown */}
            <div className="nav-dropdown-wrap">
              <motion.button
                className="nav-link nav-link--btn"
                onClick={() => setServicesSubOpen((p) => !p)}
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                Services
                <motion.span className="drop-arrow" animate={{ rotate: servicesSubOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>▾</motion.span>
              </motion.button>

              <AnimatePresence>
                {servicesSubOpen && (
                  <motion.div
                    className="services-dropdown"
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {serviceKeys.map((key) => (
                      <motion.button
                        key={key}
                        className="dropdown-service-item"
                        onClick={() => openService(key)}
                        whileHover={{ x: 4, backgroundColor: "rgba(96,165,250,0.12)" }}
                        transition={{ duration: 0.15 }}
                      >
                        <span className="dropdown-dot" style={{ background: serviceDetails[key].color }} />
                        {serviceDetails[key].label}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About Us */}
            <motion.div className="nav-link" onClick={() => openNavPage("About Us")} whileHover={{ scale: 1.08 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
              About Us
            </motion.div>

            {/* Contact Us */}
            <motion.div className="nav-link" onClick={() => openNavPage("Contact Us")} whileHover={{ scale: 1.08 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
              Contact Us
            </motion.div>

            {/* Payment Gateway */}
            <motion.div className="nav-link" onClick={() => openNavPage("Payment Gateway")} whileHover={{ scale: 1.08 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
              Payment Gateway
            </motion.div>
          </div>

          {/* ── Hamburger button (mobile) ── */}
          <button
            ref={hamburgerRef}
            className={`hamburger-btn${menuOpen ? " is-open" : ""}`}
            onClick={() => { setMenuOpen((p) => !p); setServicesSubOpen(false); }}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>

          {/* ── Mobile dropdown panel ── */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                ref={menuRef}
                className="mobile-menu-panel"
                initial={{ opacity: 0, y: -12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {/* Home */}
                <motion.button className="mobile-menu-item" onClick={() => openNavPage("Home")} whileHover={{ x: 5 }}>
                  <span className="mobile-menu-dot" style={{ background: "#38bdf8" }} /> Home
                </motion.button>

                {/* Services with sub-items */}
                <div className="mobile-menu-services-group">
                  <button
                    className="mobile-menu-item mobile-menu-services-toggle"
                    onClick={() => setServicesSubOpen((p) => !p)}
                  >
                    <span className="mobile-menu-dot" style={{ background: "#60a5fa" }} />
                    Services
                    <motion.span className="drop-arrow" animate={{ rotate: servicesSubOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>▾</motion.span>
                  </button>

                  <AnimatePresence>
                    {servicesSubOpen && (
                      <motion.div
                        className="mobile-services-sub"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {serviceKeys.map((key) => (
                          <motion.button
                            key={key}
                            className="mobile-menu-item mobile-menu-sub-item"
                            onClick={() => openService(key)}
                            whileHover={{ x: 5 }}
                          >
                            <span className="dropdown-dot" style={{ background: serviceDetails[key].color }} />
                            {serviceDetails[key].label}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* About Us */}
                <motion.button className="mobile-menu-item" onClick={() => openNavPage("About Us")} whileHover={{ x: 5 }}>
                  <span className="mobile-menu-dot" style={{ background: "#a78bfa" }} /> About Us
                </motion.button>

                {/* Contact Us */}
                <motion.button className="mobile-menu-item" onClick={() => openNavPage("Contact Us")} whileHover={{ x: 5 }}>
                  <span className="mobile-menu-dot" style={{ background: "#34d399" }} /> Contact Us
                </motion.button>

                {/* Payment Gateway */}
                <motion.button className="mobile-menu-item" onClick={() => openNavPage("Payment Gateway")} whileHover={{ x: 5 }}>
                  <span className="mobile-menu-dot" style={{ background: "#fb923c" }} /> Payment Gateway
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* ── HERO ── */}
        <div className="hero-content">
          {/* Floating glow orbs for depth */}
          <div className="hero-glow hero-glow--1" />
          <div className="hero-glow hero-glow--2" />
          <div className="hero-glow hero-glow--3" />

          <motion.div
            className="hero-text-wrap"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="hero-eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              ✦ Your Technology Partner
            </motion.span>

            <motion.h1
              className="hero-headline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Powering <span className="hero-headline-accent">Digital</span>
              <br />
              Transformation
            </motion.h1>

            <motion.p
              className="hero-subtext"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              From blazing-fast web applications to enterprise hardware —
              we deliver end-to-end IT solutions that drive real business growth.
            </motion.p>

            <motion.div
              className="hero-cta-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.55 }}
            >
              <motion.button
                className="hero-cta-btn"
                onClick={() => setShowContactModal(true)}
                whileHover={{ scale: 1.06, boxShadow: "0 0 48px rgba(56,189,248,0.55)" }}
                whileTap={{ scale: 0.97 }}
              >
                Get Started →
              </motion.button>
              <motion.button
                className="hero-cta-ghost"
                onClick={() => openNavPage("About Us")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.7 }}
            >
              {[
                { value: "200+", label: "Projects Delivered" },
                { value: "50+", label: "Happy Clients" },
                { value: "99%", label: "Uptime Guarantee" },
                { value: "24/7", label: "Expert Support" },
              ].map((s) => (
                <div key={s.label} className="hero-stat">
                  <span className="hero-stat-value">{s.value}</span>
                  <span className="hero-stat-label">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ================== UNIFIED PAGE OVERLAY ================== */}
      <AnimatePresence>
        {activePage && currentData && (
          <PageOverlay
            data={currentData}
            onClose={closeOverlay}
            onGetStarted={() => { closeOverlay(); setShowContactModal(true); }}
            amount={amount}
            setAmount={setAmount}
            onCheckout={handleCheckout}
            onSubmitContact={handleSubmit}
          />
        )}
      </AnimatePresence>

      {/* ================== GET STARTED CONTACT MODAL ================== */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowContactModal(false); }}
          >
            <motion.div
              className="modal-box"
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              <div className="modal-header">
                <h2 className="modal-title">Get Started</h2>
                <button className="modal-close" onClick={() => setShowContactModal(false)}>✕</button>
              </div>
              <p className="modal-subtitle">Tell us about your project and we&apos;ll respond within 24 hours.</p>
              <form className="contact-form modal-form" onSubmit={handleSubmit}>
                <input name="name" type="text" placeholder="Your Name" required />
                <input name="email" type="email" placeholder="Email Address" required />
                <input name="phone" type="tel" placeholder="Phone Number" />
                <textarea name="project" placeholder="Describe your project..." rows={5} required />
                <button type="submit">Send Message →</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================== SERVICES SECTION ================== */}
      <section className="services-section">
        <AnimatedCard>
          <div className="services-header">
            <span className="services-tag">What We Offer</span>
            <h2 className="services-title">Tailored IT Solutions<br />for Modern Businesses</h2>
            <p className="services-desc">We combine cutting-edge technology with industry expertise to deliver solutions that drive real results.</p>
          </div>
        </AnimatedCard>

        <div className="services-showcase">
          {/* Card 1 – Webapp: slides in from left */}
          <ServiceShowcaseCard
            delay={0.05}
            animFrom="left"
            accentColor="#60a5fa"
            glowClass="service-card-glow--blue"
            iconWrapClass="service-icon-wrap--blue"
            badge={null}
            title="Web Application"
            description="Modern, responsive web apps built for speed, scale, and security — tailored to your exact business needs."
            features={["Custom UI/UX Design","API Integration","Cross-device Responsive","Scalable Architecture"]}
            featureDotClass="feature-dot--blue"
            tags={["Development","Design"]}
            featured={false}
            icon={
              <svg viewBox="0 0 64 64" fill="none" className="service-svg">
                <rect x="4" y="10" width="56" height="40" rx="6" stroke="#60a5fa" strokeWidth="3" fill="rgba(96,165,250,0.08)" />
                <rect x="4" y="10" width="56" height="12" rx="6" fill="rgba(96,165,250,0.18)" />
                <circle cx="14" cy="16" r="3" fill="#60a5fa" />
                <circle cx="24" cy="16" r="3" fill="#34d399" />
                <circle cx="34" cy="16" r="3" fill="#f87171" />
                <rect x="12" y="30" width="16" height="12" rx="3" fill="rgba(96,165,250,0.3)" />
                <rect x="34" y="30" width="20" height="5" rx="2" fill="rgba(96,165,250,0.2)" />
                <rect x="34" y="38" width="12" height="4" rx="2" fill="rgba(96,165,250,0.15)" />
              </svg>
            }
            onExplore={() => openService("Webapp")}
          />

          {/* Card 2 – E-book: slides up from bottom (featured / center) */}
          <ServiceShowcaseCard
            delay={0.18}
            animFrom="bottom"
            accentColor="#c084fc"
            glowClass="service-card-glow--purple"
            iconWrapClass="service-icon-wrap--purple"
            badge="Popular"
            title="Interactive E-books"
            description="Visually rich, multimedia-powered e-books for education, marketing, and corporate communication."
            features={["Multimedia Elements","Interactive Animations","Multi-platform Support","Custom Branding"]}
            featureDotClass="feature-dot--purple"
            tags={["Publishing","Education"]}
            featured={true}
            icon={
              <svg viewBox="0 0 64 64" fill="none" className="service-svg">
                <rect x="10" y="6" width="34" height="46" rx="4" stroke="#c084fc" strokeWidth="3" fill="rgba(192,132,252,0.08)" />
                <rect x="16" y="6" width="34" height="46" rx="4" stroke="#c084fc" strokeWidth="2" fill="rgba(192,132,252,0.05)" strokeDasharray="3 2" />
                <line x1="18" y1="18" x2="36" y2="18" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
                <line x1="18" y1="25" x2="36" y2="25" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
                <line x1="18" y1="32" x2="30" y2="32" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
                <rect x="18" y="38" width="14" height="8" rx="2" fill="rgba(192,132,252,0.3)" />
                <circle cx="46" cy="46" r="10" fill="#7c3aed" opacity="0.9" />
                <path d="M42 46 L45 49 L50 43" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            onExplore={() => openService("Ebook")}
          />

          {/* Card 3 – IT Hardware: slides in from right */}
          <ServiceShowcaseCard
            delay={0.32}
            animFrom="right"
            accentColor="#22d3ee"
            glowClass="service-card-glow--cyan"
            iconWrapClass="service-icon-wrap--cyan"
            badge={null}
            title="IT Hardware"
            description="High-performance hardware solutions — servers, networking, and workstations with full setup and ongoing support."
            features={["Enterprise Servers","Network Infrastructure","Hardware Installation","Ongoing Support"]}
            featureDotClass="feature-dot--cyan"
            tags={["Infrastructure","Support"]}
            featured={false}
            icon={
              <svg viewBox="0 0 64 64" fill="none" className="service-svg">
                <rect x="6" y="16" width="52" height="28" rx="4" stroke="#22d3ee" strokeWidth="3" fill="rgba(34,211,238,0.08)" />
                <rect x="12" y="22" width="8" height="16" rx="2" fill="rgba(34,211,238,0.25)" />
                <rect x="24" y="22" width="8" height="16" rx="2" fill="rgba(34,211,238,0.25)" />
                <rect x="36" y="22" width="8" height="16" rx="2" fill="rgba(34,211,238,0.25)" />
                <circle cx="13" cy="46" r="3" fill="#22d3ee" />
                <circle cx="51" cy="46" r="3" fill="#22d3ee" />
                <line x1="13" y1="46" x2="51" y2="46" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="4 3" />
                <circle cx="50" cy="26" r="4" fill="rgba(34,211,238,0.4)" stroke="#22d3ee" strokeWidth="1.5" />
              </svg>
            }
            onExplore={() => openService("IT Hardware")}
          />
        </div>
      </section>

      {/* ================== TESTIMONIALS SECTION ================== */}
      <TestimonialsCarousel />

      {/* ================== CONTACT SECTION ================== */}
      <section className="page-contact-section">
        <AnimatedCard>
          <div className="page-contact-inner">
            {/* Left: info */}
            <div className="page-contact-info">
              <span className="services-tag">Get In Touch</span>
              <h2 className="page-contact-title">Ready to Start<br />Your Project?</h2>
              <p className="page-contact-desc">
                Whether you need a powerful web app, an interactive e-book, or enterprise hardware — our team is ready to help. Drop us a message and we&apos;ll be in touch within 24 hours.
              </p>
              <ul className="page-contact-details">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                  <a href="mailto:info@itservices.com">info@itservices.com</a>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014 13a19.79 19.79 0 01-3.07-8.67A2 2 0 012.92 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  <span>+1 (555) 000-0000</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>123 Tech Street, City, Country</span>
                </li>
              </ul>
            </div>

            {/* Right: form */}
            <div className="page-contact-form-wrap">
              <form className="page-contact-form" onSubmit={handleSubmit}>
                <div className="page-contact-form-row">
                  <div className="page-contact-field">
                    <label>Name</label>
                    <input name="name" type="text" placeholder="John Smith" required />
                  </div>
                  <div className="page-contact-field">
                    <label>Email</label>
                    <input name="email" type="email" placeholder="john@company.com" required />
                  </div>
                </div>
                <div className="page-contact-field">
                  <label>Phone</label>
                  <input name="phone" type="tel" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="page-contact-field">
                  <label>Project Description</label>
                  <textarea name="project" placeholder="Tell us what you're looking to build..." rows={5} required />
                </div>
                <motion.button
                  type="submit"
                  className="page-contact-submit"
                  whileHover={{ scale: 1.03, boxShadow: "0 0 28px rgba(56,189,248,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message →
                </motion.button>
              </form>
            </div>
          </div>
        </AnimatedCard>
      </section>

      {/* ================== FOOTER ================== */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo-title">IT</div>
            <div className="footer-logo-sub">SERVICES</div>
            <p className="footer-brand-desc">Empowering businesses with modern technology solutions. We build, deploy, and support your digital vision.</p>
            <div className="footer-socials">
              <a href="#" className="footer-social-btn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="#" className="footer-social-btn" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="footer-social-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Team</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-links">
              <li><a href="#">Web Applications</a></li>
              <li><a href="#">Interactive E-books</a></li>
              <li><a href="#">IT Hardware</a></li>
              <li><a href="#">Cloud Solutions</a></li>
              <li><a href="#">Support &amp; Maintenance</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Contact</h4>
            <ul className="footer-contact-list">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:info@itservices.com">info@itservices.com</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014 13a19.79 19.79 0 01-3.07-8.67A2 2 0 012.92 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span>+1 (555) 000-0000</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span>123 Tech Street, City, Country</span>
              </li>
            </ul>
            <div className="footer-newsletter">
              <p className="footer-newsletter-label">Subscribe to our newsletter</p>
              <div className="footer-newsletter-row">
                <input type="email" placeholder="your@email.com" className="footer-newsletter-input" />
                <button className="footer-newsletter-btn">&#8594;</button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} IT Services. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </>
  );
}
