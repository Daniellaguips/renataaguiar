// Simple language toggle using data-i18n-key attributes.
// Default content is in Portuguese. English copy is provided below.

const translations = {
  en: {
    "nav-about": "About",
    "nav-services": "Services",
    "nav-books": "Books",
    "nav-speaking": "Speaking",
    "nav-contact": "Contact",

    "hero-kicker": "Psychology, neuroscience of wellbeing & EFT",
    "hero-title": "Caring for your mind with science, presence, and heart.",
    "hero-subtitle":
      "Renata Aguiar is a psychologist, co-author and speaker. She weaves neuroscience of wellbeing, EFT/TFT and emotional coaching to support you, your team or your event.",
    "hero-primary-cta": "Book a session",
    "hero-secondary-cta": "Book a talk",
    "hero-proof":
      "Supporting individuals and audiences to build emotional wellbeing, self-knowledge and self-esteem.",

    "about-title": "About Renata Aguiar",
    "about-body-1":
      "Renata Aguiar is a psychologist specialized in the neuroscience of wellbeing, working with emotional coaching, EFT (Emotional Freedom Techniques) and TFT (Thought Field Therapy). Throughout her journey she has helped people understand their emotions, reframe beliefs and build lighter, healthier routines.",
    "about-body-2":
      "She is co-author of the books “SuperAção – Onze autores compartilham as decisões que moldaram seus destinos” and “Mulheres Vibrantes – Relatos de quem vive com propósito e alegria”, where she shares stories and reflections on choices, courage and self-care.",
    "about-body-3":
      "As a speaker, she brings to companies, schools, conferences and communities themes such as wellbeing, self-knowledge and self-esteem, always translating the language of neuroscience into everyday life.",
    "about-disclaimer":
      "Renata is licensed as a psychologist in Brazil. For people living in the United States, sessions are offered exclusively as wellbeing coaching and do not constitute psychotherapy or medical treatment.",

    "services-title": "Services",
    "services-intro":
      "Choose the type of support that best fits your season of life or your team’s needs.",
    "service-coaching-title": "Wellness & self-care coaching",
    "service-coaching-body":
      "One-to-one support focused on prevention and emotional care. Online sessions that help you organize thoughts, understand patterns and create habits aligned with the neuroscience of wellbeing.",
    "service-coaching-item-1": "Building an emotionally healthy routine.",
    "service-coaching-item-2":
      "Managing stress, overload and excessive self-demand.",
    "service-coaching-item-3":
      "Strengthening self-esteem and self-compassion.",
    "service-coaching-note":
      "For residents in the United States, sessions are offered as wellbeing coaching and do not constitute psychotherapy.",

    "service-eft-title": "EFT & TFT sessions",
    "service-eft-body":
      "Mind–body techniques based on gentle tapping on acupuncture points to release stored emotions, reduce anxiety and bring more balance to the nervous system.",
    "service-eft-item-1":
      "Support in moments of anxiety, fear and insecurity.",
    "service-eft-item-2":
      "Emotional regulation for specific challenges (presentations, hard conversations, transitions).",
    "service-eft-item-3":
      "Simple practices for you to use in everyday life.",

    "service-speaking-title": "Talks & workshops",
    "service-speaking-body":
      "Sessions for companies, schools, churches and events that want to speak about emotional health, purpose and self-esteem with evidence-based, clear and sensitive language.",
    "service-speaking-item-1":
      "Topics such as wellbeing, self-knowledge and self-esteem.",
    "service-speaking-item-2":
      "Content grounded in neuroscience and clinical experience.",
    "service-speaking-item-3":
      "Formats: talks, conversations and workshops.",

    "services-cta-text":
      "You don’t have to have everything figured out. In a few lines you can share what you’re going through and together we’ll find the best format.",
    "services-cta-button": "Talk to Renata",

    "books-title": "Books",
    "books-intro":
      "Real stories, hard choices and paths of purpose gathered in collective works.",
    "book-superacao-title":
      "SuperAção – Eleven authors share the decisions that shaped their destinies",
    "book-superacao-meta":
      "Co-authorship in a work organized by Renata Pessoa Aguiar.",
    "book-superacao-body":
      "Stories of people who, at key moments, chose to take a stand, start over and reframe their journeys. In Renata’s chapter, she brings these decisions closer to the neuroscience of wellbeing and emotional self-care.",
    "book-mulheres-title":
      "Mulheres Vibrantes – Stories of those who live with purpose and joy",
    "book-mulheres-meta":
      "Co-authorship in a work organized by Daiane Souza Gratid.",
    "book-mulheres-body":
      "A collection of stories from women who found paths of purpose, faith and joy. Renata’s contribution brings the perspective of emotional health and spirituality integrated into everyday life.",

    "speaking-title": "Talks and conferences on wellbeing",
    "speaking-body-1":
      "Renata brings to the stage a warm yet evidence-based conversation, connecting neuroscience, spirituality and simple practices for daily life.",
    "speaking-body-2":
      "Ideal for companies, schools, conferences, faith communities and events that want to care for the emotional health of their audiences.",
    "talk-1-title": "Neuroscience of wellbeing in everyday life",
    "talk-1-item-1": "How the brain responds to chronic stress.",
    "talk-1-item-2":
      "Small habits that protect your emotional health.",
    "talk-1-item-3": "Simple practices you can start today.",
    "talk-2-title": "Self-knowledge and self-esteem in fast times",
    "talk-2-item-1":
      "Understanding your inner dialogue and limiting beliefs.",
    "talk-2-item-2":
      "Strategies to cultivate a kinder inner voice.",
    "talk-2-item-3":
      "Practical tools for work and home.",
    "talk-3-title": "Caring for those who care",
    "talk-3-item-1":
      "Preventing burnout in teams that serve others.",
    "talk-3-item-2": "Healthy boundaries and realistic self-care.",
    "talk-3-item-3":
      "Breathing and emotional regulation practices.",
    "speaking-prompt":
      "Share about your event in 2 minutes and Renata will reply with possible themes and dates.",
    "speaking-cta": "Request a talk",

    "testimonials-title": "What people say",
    "testimonials-intro":
      "Testimonials preserve confidentiality and focus on experience and perceived results.",
    "testimonial-1":
      "“Sessions with Renata helped me see my self-demand patterns and create small changes that made a big difference in my daily life.”",
    "testimonial-1-meta": "Wellness coaching client",
    "testimonial-2":
      "“After the talk, the team kept referring back to the reflections and exercises for weeks. It was light, deep and very practical.”",
    "testimonial-2-meta": "Corporate event organizer",
    "testimonial-3":
      "“I learned simple tools to use in moments of anxiety and today I can welcome myself with more kindness.”",
    "testimonial-3-meta": "Workshop participant",

    "contact-title": "Contact & bookings",
    "contact-body-1":
      "You don’t need the perfect words. In just a few lines, share what you’re going through or what you envision for your event, and Renata will reply with next steps and availability.",
    "contact-email-label": "Email",
    "contact-email-value": "renata_aguiar1@hotmail.com",
    "contact-whatsapp-label": "WhatsApp",
    "contact-whatsapp-value": "Send a message",
    "contact-instagram-label": "Instagram",
    "contact-instagram-value": "@psi_renataaguiar",

    "offer-title": "Online emotional wellbeing session",
    "offer-body":
      "A 60-minute one-to-one session combining neuroscience of wellbeing, coaching and EFT/TFT techniques. Single session or 5-session package — see payment link for pricing.",
    "offer-cta": "Reserve session (online payment)",
    "offer-note":
      "Payment via Stripe (single session or 5-session package). You’ll get an email to schedule your session.",

    "form-title": "Send a quick message",
    "form-intro":
      "Fill out the form below in 1–2 minutes. You’ll receive a response directly by email.",
    "form-name-label": "Full name",
    "form-email-label": "Email",
    "form-topic-label": "What are you looking for?",
    "form-message-label":
      "In a few lines, share what you are going through or what you wish for your event",
    "form-preferred-times-label": "Preferred times (optional)",
    "form-submit": "Send message",
    "form-footnote":
      "Your data is used only to reply to your message and is not shared with third parties.",

    "footer-credits":
      "© <span id=\"current-year\"></span> Renata Aguiar. Psychologist (Brazil), specialist in the neuroscience of wellbeing, EFT/TFT and speaker.",
    "footer-disclaimer":
      "Sessions for residents in the United States are offered as wellbeing coaching and do not constitute psychotherapy, diagnosis or medical treatment.",
    "footer-email-link": "Email",
  },
};

function setLanguage(lang) {
  const elements = document.querySelectorAll("[data-i18n-key]");
  const dict = translations[lang];
  const isEnglish = lang === "en";

  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n-key");
    const value = dict?.[key];
    if (!value) return;

    if (key === "footer-credits") {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });

  document.documentElement.lang = isEnglish ? "en" : "pt";

  document
    .querySelectorAll(".lang-toggle")
    .forEach((btn) =>
      btn.classList.toggle("is-active", btn.dataset.lang === lang),
    );
}

function initLanguageToggle() {
  const buttons = document.querySelectorAll(".lang-toggle");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const chosen = btn.dataset.lang;
      if (!chosen) return;
      if (chosen === "en") {
        setLanguage("en");
      } else {
        window.location.reload();
      }
    });
  });

  const prefersEnglish =
    typeof navigator !== "undefined" &&
    navigator.language &&
    navigator.language.toLowerCase().startsWith("en");
  if (prefersEnglish) {
    setLanguage("en");
  } else {
    document
      .querySelectorAll(".lang-toggle")
      .forEach((btn) =>
        btn.classList.toggle("is-active", btn.dataset.lang === "pt"),
      );
  }
}

function initCurrentYear() {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initLanguageToggle();
  initCurrentYear();
});

