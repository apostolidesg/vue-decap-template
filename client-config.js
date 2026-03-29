// ============================================
// CLIENT CONFIGURATION FILE
// This is the only file you need to edit
// when setting up a new client site.
// ============================================

export default {
  // --- Site Identity ---
  siteName: "My Client Site",
  siteDescription: "A modern website built with Vue + Decap CMS",
  logo: "/assets/images/logo.png",

  // --- Theme ---
  // theme: 'default' | 'warm' | 'bold'
  theme: "default",

  // --- Languages ---
  languages: ["en", "el"],
  defaultLocale: "en",

  // --- Navigation & Pages ---
  // Each nav entry defines a page.
  // banner: true (auto-title from label) | false (no banner) | { title: { en, el }, subtitle: { en, el } }
  // sections[].layout: 'default' | 'image-right' | 'cinematic'
  nav: [
    {
      label: { en: "Home", el: "Αρχική" },
      path: "/",
      banner: false,
      sections: [
        { id: "hero", component: "HeroSection", layout: "image-right" },
        { id: "about", component: "AboutSection", layout: "default" },
        { id: "services", component: "ServicesSection", layout: "default" },
        { id: "testimonials", component: "TestimonialsSection", layout: "default" },
        { id: "faq", component: "FAQSection", layout: "default" },
        { id: "contact", component: "ContactSection", layout: "default" },
      ],
    },
    {
      label: { en: "About", el: "Σχετικά" },
      path: "/about",
      banner: true,
      sections: [
        { id: "about", component: "AboutSection", layout: "default" },
        { id: "contact", component: "ContactSection", layout: "default" },
      ],
    },
    {
      label: { en: "Services", el: "Υπηρεσίες" },
      path: "/services",
      banner: true,
      sections: [
        { id: "services", component: "ServicesSection", layout: "default" },
        { id: "testimonials", component: "TestimonialsSection", layout: "default" },
      ],
    },
    {
      label: { en: "Contact", el: "Επικοινωνία" },
      path: "/contact",
      banner: true,
      sections: [
        { id: "contact", component: "ContactSection", layout: "default" },
      ],
    },
  ],

  // --- One-off pages (not in nav) ---
  // customRoutes: [] | [{ path: '/privacy', component: 'PrivacyPage' }]
  customRoutes: [],

  // --- Contact Info ---
  contact: {
    email: "info@clientsite.com",
    phone: "+30 210 000 0000",
    address: "Athens, Greece",
    social: {
      facebook: "",
      instagram: "",
      linkedin: "",
    },
  },

  // --- SEO Defaults ---
  seo: {
    titleTemplate: "%s | My Client Site",
    defaultImage: "/assets/images/og-image.jpg",
  },

  // --- Deployment ---
  // deploy.platform: 'netlify' | 'vercel'
  deploy: {
    platform: "netlify",
  },
}
