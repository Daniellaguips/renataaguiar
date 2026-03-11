// Simple language toggle using data-i18n-key attributes.
// Default content is in Portuguese. English copy is provided below.

const translations = {
  pt: {
    "nav-about": "Sobre",
    "nav-services": "Serviços",
    "nav-books": "Livros",
    "nav-speaking": "Palestras",
    "nav-contact": "Contato",

    "hero-kicker": "Psicologia, neurociência do bem-estar & EFT",
    "hero-title": "Cuidando da sua mente com ciência, presença e coração.",
    "hero-subtitle":
      "Psicóloga, coautora de livros e palestrante. Renata une neurociência do bem-estar, EFT/TFT e coaching emocional para ajudar você a cuidar da mente, das emoções e dos relacionamentos.",
    "hero-primary-cta": "Agendar sessão",
    "hero-secondary-cta": "Contratar palestra",
    "hero-proof":
      "Acompanhando pessoas e públicos na construção de bem-estar emocional, autoconhecimento e autoestima.",

    "about-title": "Sobre Renata Aguiar",
    "about-body-1":
      "Renata Aguiar é psicóloga com especialização em neurociência do bem-estar e atuação em coaching emocional, EFT (Emotional Freedom Techniques) e TFT (Thought Field Therapy). Ao longo da sua trajetória, tem ajudado pessoas a compreenderem suas emoções, ressignificarem crenças e construírem rotinas mais leves e saudáveis.",
    "about-body-2":
      "É coautora dos livros \"SuperAção – Onze autores compartilham as decisões que moldaram seus destinos\" e \"Mulheres Vibrantes – Relatos de quem vive com propósito e alegria\", onde compartilha histórias e reflexões sobre escolhas, coragem e autocuidado.",
    "about-body-3":
      "Como palestrante, leva para empresas, escolas, conferências e comunidades temas como bem-estar, autoconhecimento e autoestima, sempre traduzindo a linguagem da neurociência para o dia a dia.",
    "about-disclaimer":
      "Renata está registrada como psicóloga no Brasil. Para pessoas residentes nos Estados Unidos, os atendimentos são oferecidos exclusivamente como coaching e orientação em bem-estar, e não se configuram como psicoterapia ou tratamento médico.",

    "services-title": "Serviços",
    "services-intro":
      "Quatro formas de trabalhar com Renata: coaching, sessões de EFT/TFT, formação em EFT/TFT e palestras para grupos e eventos.",
    "service-coaching-title": "Coaching em bem-estar & autocuidado",
    "service-coaching-body":
      "Encontros individuais online para organizar pensamentos, entender padrões emocionais e construir uma rotina mais leve e intencional.",
    "service-coaching-item-1": "Construção de rotina emocionalmente saudável.",
    "service-coaching-item-2": "Manejo de estresse, sobrecarga e autocobrança.",
    "service-coaching-item-3": "Fortalecimento de autoestima e autocompaixão.",
    "service-coaching-note":
      "Para residentes nos EUA, as sessões são oferecidas como coaching em bem-estar, não como psicoterapia.",

    "service-eft-title": "Sessões de EFT & TFT",
    "service-eft-body":
      "Sessões com técnicas de tapping em pontos específicos do corpo para aliviar ansiedade, liberar tensões e acalmar o sistema nervoso.",
    "service-eft-item-1": "Apoio em momentos de ansiedade, medo e insegurança.",
    "service-eft-item-2":
      "Regulagem emocional para desafios específicos (apresentações, conversas difíceis, mudanças).",
    "service-eft-item-3": "Práticas simples para você aplicar no dia a dia.",

    "service-speaking-title": "Palestras & workshops",
    "service-speaking-body":
      "Conversas leves e profundas sobre bem-estar, propósito e autoestima, pensadas para empresas, escolas, igrejas e eventos.",
    "service-speaking-item-1": "Temas como bem-estar, autoconhecimento e autoestima.",
    "service-speaking-item-2": "Conteúdo baseado em neurociência e experiência clínica.",
    "service-speaking-item-3": "Formatos: palestras, rodas de conversa e workshops.",

    "service-training-title": "Formação em EFT & TFT",
    "service-training-body":
      "Treinamentos para pessoas que desejam se aprofundar e atuar com EFT/TFT, em formatos individuais ou em grupo.",
    "service-training-item-1":
      "Conteúdo teórico e prático com foco em aplicação responsável.",
    "service-training-item-2":
      "Acompanhamento próximo durante o processo de formação.",
    "service-training-item-3":
      "Opções de certificação em módulos ou programas completos.",

    "services-cta-text":
      "Não precisa ter tudo claro agora. Em poucas linhas você pode contar o que está vivendo e juntos encontraremos o formato ideal.",
    "services-cta-button": "Falar com a Renata",

    "books-title": "Livros",
    "books-intro":
      "Histórias reais, escolhas difíceis e caminhos de propósito, reunidos em obras coletivas.",
    "book-superacao-title":
      "SuperAção – Onze autores compartilham as decisões que moldaram seus destinos",
    "book-superacao-meta": "Coautoria em obra organizada por Renata Pessoa Aguiar.",
    "book-superacao-body":
      "Histórias de pessoas que, em momentos-chave, escolheram se posicionar, recomeçar e ressignificar suas trajetórias. No capítulo de Renata, ela aproxima essas decisões da neurociência do bem-estar e do autocuidado emocional.",
    "book-mulheres-title":
      "Mulheres Vibrantes – Relatos de quem vive com propósito e alegria",
    "book-mulheres-meta": "Coautoria em obra organizada por Daiane Souza Gratid.",
    "book-mulheres-body":
      "Uma coletânea de relatos de mulheres que encontraram caminhos de propósito, fé e alegria. A participação de Renata traz a perspectiva da saúde emocional e da espiritualidade integrada ao dia a dia.",

    "speaking-title": "Palestras e conferências sobre bem-estar",
    "speaking-body-1":
      "Renata leva para o palco uma conversa acolhedora e ao mesmo tempo baseada em evidências, conectando neurociência, espiritualidade e práticas simples para o dia a dia.",
    "speaking-body-2":
      "Ideal para empresas, escolas, conferências, comunidades de fé e eventos que desejam cuidar da saúde emocional de seus públicos.",
    "talk-1-title": "Neurociência do bem-estar no dia a dia",
    "talk-1-item-1": "Como o cérebro reage ao estresse crônico.",
    "talk-1-item-2": "Pequenos hábitos que protegem sua saúde emocional.",
    "talk-1-item-3": "Práticas simples para começar ainda hoje.",
    "talk-2-title": "Autoconhecimento e autoestima em tempos acelerados",
    "talk-2-item-1": "Entendendo o diálogo interno e as crenças limitantes.",
    "talk-2-item-2": "Estratégias para cultivar uma voz interna mais gentil.",
    "talk-2-item-3": "Ferramentas práticas para o trabalho e para casa.",
    "talk-3-title": "Cuidando de quem cuida",
    "talk-3-item-1": "Prevenção de esgotamento em equipes que servem.",
    "talk-3-item-2": "Limites saudáveis e autocuidado possível.",
    "talk-3-item-3": "Práticas de respiro e regulação emocional.",
    "speaking-prompt":
      "Conte sobre o seu evento em 2 minutos e Renata responde com possibilidades de tema e datas.",
    "speaking-cta": "Solicitar palestra",

    "testimonials-title": "O que dizem sobre o trabalho",
    "testimonials-intro":
      "Depoimentos preservam a confidencialidade e focam na experiência e nos resultados percebidos.",
    "testimonial-1":
      "\"As sessões com a Renata me ajudaram a enxergar meus padrões de autocobrança e a criar pequenas mudanças que fizeram muita diferença no meu dia a dia.\"",
    "testimonial-1-meta": "Cliente de coaching em bem-estar",
    "testimonial-2":
      "\"Depois da palestra, a equipe comentou por semanas sobre as reflexões e exercícios. Foi leve, profundo e muito prático.\"",
    "testimonial-2-meta": "Organizadora de evento corporativo",
    "testimonial-3":
      "\"Aprendi ferramentas simples para usar em momentos de ansiedade e hoje consigo me acolher com mais gentileza.\"",
    "testimonial-3-meta": "Participante de workshop sobre autoestima",

    "contact-title": "Contato & agendamentos",
    "contact-body-1":
      "Você não precisa ter o texto perfeito para escrever. Em poucas linhas, conte o que está vivendo ou o que deseja para o seu evento, e Renata responde com próximos passos e possibilidades de agenda.",
    "contact-email-label": "E-mail",
    "contact-email-value": "renata_aguiar1@hotmail.com",
    "contact-whatsapp-label": "WhatsApp",
    "contact-whatsapp-value": "Enviar mensagem",
    "contact-instagram-label": "Instagram",
    "contact-instagram-value": "@psi_renataaguiar",

    "offer-title": "Sessão online de bem-estar emocional",
    "offer-body":
      "Encontro individual de 60 minutos combinando neurociência do bem-estar, coaching e técnicas de EFT/TFT. 1 sessão ou pacote de 5 sessões — valores no link de pagamento.",
    "offer-cta": "Reservar sessão (pagamento online)",
    "offer-note":
      "Pagamento via Stripe (1 sessão ou pacote 5 sessões). Após confirmar, você recebe um e-mail para combinar o horário.",

    "form-title": "Envie uma mensagem rápida",
    "form-intro":
      "Preencha o formulário abaixo em 1–2 minutos. Você receberá uma resposta diretamente por e-mail.",
    "form-name-label": "Nome completo",
    "form-email-label": "E-mail",
    "form-topic-label": "O que você procura?",
    "form-message-label":
      "Conte em poucas linhas o que você está vivendo ou o que deseja para o seu evento",
    "form-preferred-times-label": "Horários preferidos (opcional)",
    "form-submit": "Enviar mensagem",
    "form-footnote":
      "Seus dados são usados apenas para retorno de contato e não são compartilhados com terceiros.",

    "footer-credits":
      "© <span id=\"current-year\"></span> Renata Aguiar. Psicóloga (Brasil), especialista em neurociência do bem-estar, EFT/TFT e palestrante.",
    "footer-disclaimer":
      "Atendimentos para residentes nos Estados Unidos são oferecidos como coaching em bem-estar e não configuram psicoterapia, diagnóstico ou tratamento médico.",
    "footer-email-link": "E-mail",
  },
  en: {
    "nav-about": "About",
    "nav-services": "Services",
    "nav-books": "Books",
    "nav-speaking": "Speaking",
    "nav-contact": "Contact",

    "hero-kicker": "Psychology, neuroscience of wellbeing & EFT",
    "hero-title": "Caring for your mind with science, presence, and heart.",
    "hero-subtitle":
      "Psychologist, co-author and speaker. Renata weaves neuroscience of wellbeing, EFT/TFT and emotional coaching to help you care for your mind, emotions and relationships.",
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
      "Four ways to work with Renata: coaching, EFT/TFT sessions, EFT/TFT professional training and talks for groups and events.",
    "service-coaching-title": "Wellness & self-care coaching",
    "service-coaching-body":
      "Online 1:1 sessions to organize your thoughts, understand emotional patterns and build a lighter, more intentional routine.",
    "service-coaching-item-1": "Building an emotionally healthy routine.",
    "service-coaching-item-2":
      "Managing stress, overload and excessive self-demand.",
    "service-coaching-item-3":
      "Strengthening self-esteem and self-compassion.",
    "service-coaching-note":
      "For residents in the United States, sessions are offered as wellbeing coaching and do not constitute psychotherapy.",

    "service-eft-title": "EFT & TFT sessions",
    "service-eft-body":
      "Sessions using gentle tapping on specific points of the body to ease anxiety, release tension and calm the nervous system.",
    "service-eft-item-1":
      "Support in moments of anxiety, fear and insecurity.",
    "service-eft-item-2":
      "Emotional regulation for specific challenges (presentations, hard conversations, transitions).",
    "service-eft-item-3":
      "Simple practices for you to use in everyday life.",

    "service-speaking-title": "Talks & workshops",
    "service-speaking-body":
      "Light, deep conversations on wellbeing, purpose and self-esteem designed for companies, schools, churches and events.",
    "service-speaking-item-1":
      "Topics such as wellbeing, self-knowledge and self-esteem.",
    "service-speaking-item-2":
      "Content grounded in neuroscience and clinical experience.",
    "service-speaking-item-3":
      "Formats: talks, conversations and workshops.",

    "service-training-title": "EFT & TFT professional training",
    "service-training-body":
      "Training for people who want to deepen and work with EFT/TFT, in individual or group formats.",
    "service-training-item-1":
      "Theory and practice with a strong focus on responsible application.",
    "service-training-item-2":
      "Close support from Renata throughout the training journey.",
    "service-training-item-3":
      "Certification options in modules or full programs.",

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
      setLanguage(chosen);
      initCurrentYear();
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

