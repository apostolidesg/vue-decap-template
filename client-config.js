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
  // Maps to a file in /src/themes/{theme}.js
  theme: "default",

  // --- Languages ---
  languages: ["en", "el"],
  defaultLocale: "en",

  // --- Sections ---
  // Controls which sections appear on the homepage and in what order
  sections: ["hero", "about", "services", "testimonials", "faq", "contact"],

  // --- Navigation ---
  nav: [
    { label: { en: 'Home', el: 'Αρχική' }, path: '/' },
    { label: { en: 'About', el: 'Σχετικά' }, path: '/about' },
    { label: { en: 'Services', el: 'Υπηρεσίες' }, path: '/services' },
    { label: { en: 'Contact', el: 'Επικοινωνία' }, path: '/contact' },
  ],

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
  deploy: {
    platform: "netlify", // 'netlify' or 'vercel'
  },
};
