const credlyProfileUrl = "https://www.credly.com/users/rafaditya-syahputra";

const hardSkills = [
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind",
  "Laravel",
  "PHP",
  "Node.js",
  "Python",
  "MySQL",
  "AWS Cloud",
  "Git & GitHub",
  "RESTful API",
  "Docker",
  "Vite"
];

// Helper pintar untuk menangani teks dwibahasa atau string tunggal
const localize = (val, lang) => {
  if (!val) return "";
  if (typeof val === "string") return val; // Jika string biasa, langsung dipakai otomatis di kedua bahasa
  if (typeof val === "object") {
    return val[lang] || val.en || val.id || ""; // Jika ada terjemahan { en, id }, ambil yang sesuai
  }
  return val;
};

// =========================================================================
// DATA UTAMA (SINGLE SOURCE OF TRUTH)
// Cukup edit/tambah di sini saja! Urutan dijamin 100% sama di EN dan ID.
// Format teks: bisa string biasa ("teks") atau objek dwibahasa ({ en: "...", id: "..." })
// =========================================================================

const rawProfileData = {
  name: "Rafaditya Syahputra",
  shortName: "Rafaditya",
  role: {
    en: "Cloud Computing Engineer",
    id: "Cloud Computing Engineer"
  },
  location: "Bandung, Indonesia",
  school: "SMKN 13 Bandung",
  avatar: "/img/avatar_profile.png",
  greeting: {
    en: "Hi I'm",
    id: "Halo, saya"
  },
  bioPrefix: {
    en: "Cloud Engineer from",
    id: "Cloud Engineer asal"
  },
  bioMiddle: {
    en: "Currently studying Software Engineering at",
    id: "Saat ini menempuh jurusan Rekayasa Perangkat Lunak di"
  },
  bioSuffix: {
    en: "and building 13Syntax digital solutions, scalable web applications, and modern developer products.",
    id: "dan membangun solusi digital 13Syntax, aplikasi web scalable, serta produk developer modern."
  },
  currentFocus: {
    text: {
      en: "Building high-performance web systems and mastering Cloud Architecture.",
      id: "Membangun sistem web berkinerja tinggi dan mendalami Arsitektur Cloud."
    },
    highlight: "13Syntax",
    highlightHref: "https://github.com/Raditt10"
  }
};

const rawNavLinks = [
  {
    label: { en: "Home", id: "Beranda" },
    href: "#top",
    iconName: "House"
  },
  {
    label: { en: "About", id: "Tentang" },
    href: "#about",
    iconName: "User"
  },
  {
    label: { en: "Achievements", id: "Prestasi" },
    href: "#achievements",
    iconName: "Trophy"
  },
  {
    label: { en: "Projects", id: "Proyek" },
    href: "#projects",
    iconName: "FolderOpen"
  }
];

const rawSocialLinks = [
  { label: "GitHub", href: "https://github.com/Raditt10", iconName: "Github" },
  { label: "Instagram", href: "https://www.instagram.com/zeroclo.id/", iconName: "Instagram" },
  { label: "Email", href: "mailto:iniakuraditt@gmail.com", iconName: "Mail" },
  { label: "Resume / CV", href: "/file/CV.pdf", iconName: "FileText" }
];

const rawPersonalProjects = [
  {
    title: "Kultilas",
    date: "2025",
    description: {
      en: "Web-based application designed to facilitate the management and tracking of student extracurricular activities in schools.",
      id: "Aplikasi berbasis web yang dirancang untuk mempermudah pengelolaan dan pemantauan kegiatan ekstrakurikuler siswa di sekolah."
    },
    href: "https://github.com/Raditt10/Kultilas",
    tags: ["Fullstack", "Laravel", "Alpine.js", "Tailwind CSS"]
  },
  {
    title: "HoshiDay.io",
    date: "2025",
    description: {
      en: "Interactive web app designed to track fictional character birthdays with real-time countdown timers, dynamic roster, and QR code sharing.",
      id: "Aplikasi web interaktif untuk memantau hari ulang tahun karakter fiksi dengan hitung mundur real-time, daftar dinamis, dan berbagi kode QR."
    },
    href: "https://hoshi-day-io.vercel.app/",
    tags: ["React", "Tailwind", "Framer Motion"]
  },
  {
    title: "For U",
    date: "2024",
    description: {
      en: "Interactive digital gift web application built with modern animated UI, confetti celebratory effects, and Discord webhook notifications.",
      id: "Aplikasi kado digital interaktif yang dibangun dengan antarmuka animasi modern, efek konfeti perayaan, dan notifikasi webhook Discord."
    },
    href: "https://github.com/Raditt10/forU",
    tags: ["React", "Node.js", "Tailwind", "MongoDB"]
  }
];

const rawFeaturedPortfolio = [
  {
    title: "BendaharaKu",
    date: "2024",
    description: {
      en: "Web application for recording, monitoring, and managing class finances transparently and easily for students and school treasurers.",
      id: "Aplikasi web untuk mencatat, memantau, dan mengelola keuangan kelas secara transparan dan mudah bagi siswa serta bendahara sekolah."
    },
    href: "https://github.com/Raditt10/bendeharaKu",
    tags: ["Native PHP", "MySQL", "Tailwind"]
  },
  {
    title: "IrmaVerse",
    date: "2025",
    description: {
      en: "Official web platform of IRMA Extracurricular Activities at SMKN 13 Bandung featuring AI integration, member management, and dynamic CMS.",
      id: "Platform web resmi Ekstrakurikuler IRMA di SMKN 13 Bandung yang dilengkapi integrasi AI, manajemen anggota, dan CMS dinamis."
    },
    href: "https://irmaverse.13syntax.web.id/",
    tags: ["Next.js", "Tailwind", "Prisma ORM", "MySQL", "Socket.io", "Gemini API"]
  },
  {
    title: "Kandaga",
    date: "2026",
    description: {
      en: "Integrated digital showcase and student work curation platform for SMKN 13 Bandung, connecting vocational portfolio archives (RPL, TKJ, Chemical Analysis) directly with industry partners via the BKK system.",
      id: "Platform etalase digital dan kurasi karya siswa terintegrasi untuk SMKN 13 Bandung, menghubungkan arsip portofolio jurusan (RPL, TKJ, Analis Kimia) langsung dengan mitra industri melalui sistem BKK."
    },
    href: "https://github.com/Raditt10",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io", "Gemini API", "Prisma ORM"]
  },
  {
    title: "Puspasehat27",
    date: "2025",
    description: {
      en: "Mobile-based application for monitoring health at integrated healthcare posts (Posyandu) featuring dashboard monitoring, data CRUD, chart visualisations, and an integrated Chatbot.",
      id: "Aplikasi berbasis mobile untuk monitoring kesehatan di posyandu dengan fitur dashboard, CRUD data, visualisasi chart, dan Chatbot terintegrasi."
    },
    href: "https://github.com/Raditt10/Puspasehat27",
    tags: ["Flutter", "Dart", "Firebase", "Gemini API"]
  }
];

const rawAchievementsData = [
  {
    medal: "gold",
    title: {
      en: "3rd Place Winner",
      id: "Juara 3"
    },
    event: "LKS SMK Tingkat Provinsi Jawa Barat",
    field: "IT Software Solution for Business",
    date: "2026",
    location: {
      en: "West Java",
      id: "Jawa Barat"
    },
    href: "/img/sertif-itsoft_lks_prov.webp"
  },
  {
    medal: "gold",
    title: {
      en: "1st Place Winner",
      id: "Juara 1"
    },
    event: "LKS SMK Tingkat Kota Bandung",
    field: "IT Software Solution for Business",
    date: "2026",
    location: "Bandung",
    href: "/img/sertif_itsoft_lkskota.webp"
  },
  {
    medal: "gold",
    title: {
      en: "Gold Medalist",
      id: "Peraih Medali Emas"
    },
    event: "Indonesian Science Olympiad (ISO)",
    field: {
      en: "Informatics",
      id: "Informatika"
    },
    date: "2025",
    location: {
      en: "National",
      id: "Nasional"
    },
    href: "/img/sertif_olim_informatika.webp"
  },
  {
    medal: "silver",
    title: {
      en: "Semi Finalist",
      id: "Semi Finalis"
    },
    event: "Competition and Bootcamp JHIC",
    field: {
      en: "IT Innovation",
      id: "Inovasi TI"
    },
    date: "2025",
    location: "Indonesia",
    href: "/img/sertif_jhic.webp"
  }
];

const rawCertificationsData = [
  {
    medal: "certificate",
    title: "AWS Practice Set",
    event: "Solutions Architect - Associate",
    field: {
      en: "Cloud Architecture",
      id: "Arsitektur Cloud"
    },
    date: "2025",
    location: "Amazon Web Services",
    href: "/img/sertif-aws1.webp"
  },
  {
    medal: "certificate",
    title: "AWS Practice Set",
    event: "AWS Certified AI Practitioner",
    field: {
      en: "Artificial Intelligence",
      id: "Kecerdasan Buatan"
    },
    date: "2025",
    location: "Amazon Web Services",
    href: "/img/sertif-aws2.webp"
  },
  {
    medal: "certificate",
    title: {
      en: "AWS Academy Training",
      id: "Pelatihan AWS Academy"
    },
    event: "Cloud Practitioner Essentials",
    field: {
      en: "Cloud Computing",
      id: "Komputasi Cloud"
    },
    date: "2025",
    location: "Amazon Web Services",
    href: "/img/sertif-aws5.webp"
  },
  {
    medal: "certificate",
    title: "AWS Technical Essentials",
    event: "AWS Technical Essentials",
    field: {
      en: "Infrastructure & Ops",
      id: "Infrastruktur & Operasional"
    },
    date: "2025",
    location: "Amazon Web Services",
    href: "/img/sertif-aws7.jpg"
  }
];

const rawCredlyBadgesData = [
  {
    id: "9b3bcef4-ebe6-4b2d-8e93-ec0ed6623143",
    title: "AWS Academy Graduate - Cloud Architecting - Training Badge",
    issuedDate: {
      en: "Oct 31, 2025",
      id: "31 Okt 2025"
    }
  },
  {
    id: "7faeb985-8a73-4d6f-8392-28e17414bc3b",
    title: "AWS Academy Graduate - Cloud Developing - Training Badge",
    issuedDate: {
      en: "Dec 8, 2025",
      id: "8 Des 2025"
    }
  },
  {
    id: "fa01f18b-e318-4809-b757-e5fe3fe83c94",
    title: "AWS Academy Graduate - Cloud Foundations - Training Badge",
    issuedDate: {
      en: "Oct 7, 2025",
      id: "7 Okt 2025"
    }
  },
  {
    id: "ee5dd57b-ffa3-4ebb-9c6b-08b598c7af4f",
    title: "AWS Academy Graduate - Machine Learning for Natural Language Processing - Training Badge",
    issuedDate: {
      en: "Mar 3, 2026",
      id: "3 Mar 2026"
    }
  }
];

const sectionLabels = {
  findMeOn: { en: "Find me on", id: "Temukan saya di" },
  personalProjects: { en: "Personal Projects", id: "Proyek Pribadi" },
  allProjects: { en: "All Projects", id: "Semua Proyek" },
  featuredPortfolio: { en: "Featured Portfolio", id: "Portofolio Unggulan" },
  achievements: { en: "Achievements", id: "Prestasi" },
  certifications: { en: "Certifications", id: "Sertifikasi" },
  badges: { en: "Badges", id: "Lencana Credly" },
  allBadges: { en: "All Badges on Credly", id: "Semua Lencana di Credly" },
  hardSkills: { en: "Hard Skills", id: "Keahlian Teknis" }
};

// =========================================================================
// AUTO GENERATOR TRANSLATIONS (EN & ID)
// Otomatis men-generate object translations untuk LanguageContext
// =========================================================================
const buildLanguageData = (lang) => ({
  navLinks: rawNavLinks.map((item) => ({
    ...item,
    label: localize(item.label, lang)
  })),
  profileData: {
    ...rawProfileData,
    role: localize(rawProfileData.role, lang),
    greeting: localize(rawProfileData.greeting, lang),
    bioPrefix: localize(rawProfileData.bioPrefix, lang),
    bioMiddle: localize(rawProfileData.bioMiddle, lang),
    bioSuffix: localize(rawProfileData.bioSuffix, lang),
    currentFocus: {
      ...rawProfileData.currentFocus,
      text: localize(rawProfileData.currentFocus.text, lang)
    }
  },
  sections: Object.keys(sectionLabels).reduce((acc, key) => {
    acc[key] = localize(sectionLabels[key], lang);
    return acc;
  }, {}),
  socialLinks: rawSocialLinks.map((item) => ({
    ...item,
    label: localize(item.label, lang)
  })),
  personalProjects: rawPersonalProjects.map((item) => ({
    ...item,
    title: localize(item.title, lang),
    description: localize(item.description, lang)
  })),
  featuredPortfolio: rawFeaturedPortfolio.map((item) => ({
    ...item,
    title: localize(item.title, lang),
    description: localize(item.description, lang)
  })),
  achievementsData: rawAchievementsData.map((item) => ({
    ...item,
    title: localize(item.title, lang),
    event: localize(item.event, lang),
    field: localize(item.field, lang),
    location: localize(item.location, lang)
  })),
  certificationsData: rawCertificationsData.map((item) => ({
    ...item,
    title: localize(item.title, lang),
    event: localize(item.event, lang),
    field: localize(item.field, lang),
    location: localize(item.location, lang)
  })),
  credlyBadgesData: rawCredlyBadgesData.map((item) => ({
    ...item,
    title: localize(item.title, lang),
    issuedDate: localize(item.issuedDate, lang)
  })),
  modal: {
    openOriginal: lang === "id" ? "Buka dokumen asli" : "Open original",
    close: lang === "id" ? "Tutup" : "Close"
  },
  footer: {
    rights: lang === "id" ? "Hak Cipta Dilindungi" : "All Rights Reserved"
  },
  theme: {
    switchToLight: lang === "id" ? "Beralih ke mode terang" : "Switch to light mode",
    switchToDark: lang === "id" ? "Beralih ke mode gelap" : "Switch to dark mode",
    toggleTheme: lang === "id" ? "Ganti tema" : "Toggle theme"
  },
  langToggle: {
    switchToId: "Ganti ke Bahasa Indonesia",
    switchToEn: "Switch to English",
    current: lang === "id" ? "ID" : "EN"
  },
  notFound: {
    title: lang === "id" ? "Halaman Tidak Ditemukan" : "Page Not Found",
    desc: lang === "id" ? "Oops.. Sepertinya fitur ini belum tersedia." : "Oops.. Looks like this feature isn't available yet.",
    button: lang === "id" ? "Kembali lagi" : "Back to Home"
  }
});

const translations = {
  en: buildLanguageData("en"),
  id: buildLanguageData("id")
};

// Fallback exports
const navLinks = translations.en.navLinks;
const profileData = translations.en.profileData;
const socialLinks = translations.en.socialLinks;
const personalProjects = translations.en.personalProjects;
const featuredPortfolio = translations.en.featuredPortfolio;
const achievementsData = translations.en.achievementsData;
const certificationsData = translations.en.certificationsData;
const badgesData = certificationsData;
const credlyBadgesData = translations.en.credlyBadgesData;

export {
  translations,
  navLinks,
  profileData,
  socialLinks,
  personalProjects,
  featuredPortfolio,
  achievementsData,
  certificationsData,
  badgesData,
  credlyBadgesData,
  credlyProfileUrl,
  hardSkills,
  localize
};
