import { useState, useEffect, useRef, memo } from "react";
import photo from "./assets/photo.jpg";
import jsPDF from "jspdf";

const NAV_IDS = ["home", "summary", "experience", "skills", "links"];

const TRANSLATIONS = {
  ro: {
    navItems: ["Acasă", "Rezumat", "Experiență", "Abilități", "Linkuri"],
    openToWork: "Disponibil pentru angajare",
    downloadCV: "↓ Descarcă CV",
    sections: { summary: "Rezumat", experience: "Experiență", skills: "Abilități", links: "Linkuri" },
    awards: "Premii",
    education: "Educație",
    design: "Design",
    engineering: "Inginerie",
    strategy: "Strategie",
    languages: "Limbi",
    email: "Email",
    linkedin: "LinkedIn",
    phone: "Telefon",
    location: "Locație",
    footer: "Toate drepturile rezervate",
  },
  ru: {
    navItems: ["Главная", "Резюме", "Опыт", "Навыки", "Ссылки"],
    openToWork: "Открыт к работе",
    downloadCV: "↓ Скачать резюме",
    sections: { summary: "Резюме", experience: "Опыт", skills: "Навыки", links: "Ссылки" },
    awards: "Награды",
    education: "Образование",
    design: "Дизайн",
    engineering: "Разработка",
    strategy: "Стратегия",
    languages: "Языки",
    email: "Эл. почта",
    linkedin: "LinkedIn",
    phone: "Телефон",
    location: "Местоположение",
    footer: "Все права защищены",
  },
  en: {
    navItems: ["Home", "Summary", "Experience", "Skills", "Links"],
    openToWork: "Open to work",
    downloadCV: "↓ Download CV",
    sections: { summary: "Summary", experience: "Experience", skills: "Skills", links: "Links" },
    awards: "Awards",
    education: "Education",
    design: "Design",
    engineering: "Engineering",
    strategy: "Strategy",
    languages: "Languages",
    email: "Email",
    linkedin: "LinkedIn",
    phone: "Phone",
    location: "Location",
    footer: "All Rights Reserved",
  },
};

const CV_DATA = {
  name: "Caraman Gicu",
  title: { ro: "Designer UX/UI", ru: "UX/UI Дизайнер", en: "UX/UI Designer" },
  contact: {
    email: "caramangicu25@gmail.com",
    phone: "+373 78 973 345",
    location: "Chișinău, MD",
    linkedin: "linkedin.com/in/caramangicu",
  },
  about: {
    ro: "Designer și tehnolog creativ cu 8+ ani de experiență în construirea de produse digitale care echilibrează forma și funcția. Mă aflu la intersecția dintre meșteșugul vizual, gândirea sistemică și ingineria frontend.",
    ru: "Дизайнер и креативный технолог с 8+ летним опытом создания цифровых продуктов, сочетающих форму и функцию. Работаю на стыке визуального мастерства, системного мышления и frontend-разработки.",
    en: "Designer and creative technologist with 8+ years of experience building digital products that balance form and function. I thrive at the intersection of visual craft, systems thinking, and frontend engineering.",
  },
  experience: [
    {
      company: "Vercel", period: "2022 — Present",
      role: { ro: "Designer Principal de Produs", ru: "Ведущий продуктовый дизайнер", en: "Lead Product Designer" },
      location: "San Francisco, CA",
      bullets: {
        ro: ["Am condus reproiectarea Vercel Dashboard, crescând activarea utilizatorilor cu 34%", "Am construit și menținut sistemul intern de design folosit de 12 echipe de produs", "Am colaborat cu ingineria pe arhitectura componentelor React și standarde de accesibilitate", "Am mentorat o echipă de 4 designeri juniori și am stabilit procese de revizuire design"],
        ru: ["Руководил редизайном Vercel Dashboard, увеличив активацию пользователей на 34%", "Создал и поддерживал внутреннюю дизайн-систему для 12 продуктовых команд", "Сотрудничал с инженерами по архитектуре React-компонентов и стандартам доступности", "Наставлял команду из 4 junior-дизайнеров и выстраивал процессы дизайн-ревью"],
        en: ["Led redesign of the Vercel Dashboard, increasing user activation by 34%", "Built and maintained the internal design system used across 12 product teams", "Collaborated with engineering on React component architecture and accessibility standards", "Mentored a team of 4 junior designers and established design review processes"],
      },
    },
    {
      company: "Figma", period: "2020 — 2022",
      role: { ro: "Designer de Produs II", ru: "Продуктовый дизайнер II", en: "Product Designer II" },
      location: "San Francisco, CA",
      bullets: {
        ro: ["Am proiectat funcții de colaborare, inclusiv branching și istoricul versiunilor", "Am condus design sprints și studii de utilizabilitate cu 50+ participanți", "Am contribuit la lansarea FigJam, care a obținut 4M utilizatori în 3 luni", "Am creat ghiduri de motion design adoptate la nivel organizațional"],
        ru: ["Проектировал функции совместной работы, включая ветвление и историю версий", "Проводил дизайн-спринты и исследования юзабилити с 50+ участниками", "Участвовал в запуске FigJam, набравшего 4M пользователей за 3 месяца", "Создал руководства по motion-дизайну, принятые на уровне всей организации"],
        en: ["Designed core collaboration features including branching and version history", "Ran end-to-end design sprints and usability studies with 50+ participants", "Contributed to the FigJam launch, which acquired 4M users in 3 months", "Created motion design guidelines adopted org-wide"],
      },
    },
    {
      company: "Stripe", period: "2018 — 2020",
      role: { ro: "Designer UX", ru: "UX-дизайнер", en: "UX Designer" },
      location: "Remote",
      bullets: {
        ro: ["Am reproiectat experiența mobilă Stripe Dashboard pentru 2M+ comercianți", "Am colaborat cu data science pe vizualizări analitice și fluxuri de raportare", "Am construit prototipuri high-fidelity folosite în demo-uri pentru investitori"],
        ru: ["Переработал мобильный интерфейс Stripe Dashboard для 2M+ мерчантов", "Сотрудничал с data science над аналитическими визуализациями и отчётностью", "Создавал high-fidelity прототипы для инвесторов и корпоративных продаж"],
        en: ["Redesigned the Stripe Dashboard mobile experience for 2M+ merchants", "Collaborated with data science on analytics visualizations and reporting flows", "Built high-fidelity prototypes used in investor and enterprise sales demos"],
      },
    },
    {
      company: "Freelance", period: "2016 — 2018",
      role: { ro: "Consultant UI/UX", ru: "UI/UX консультант", en: "UI/UX Consultant" },
      location: "Chișinău, MD",
      bullets: {
        ro: ["Am livrat design end-to-end pentru 20+ startup-uri în fintech, sănătate și media", "Am dezvoltat identități de brand și sisteme de design de la zero"],
        ru: ["Реализовал end-to-end дизайн для 20+ стартапов в fintech, здравоохранении и медиа", "Разрабатывал брендинг и дизайн-системы с нуля"],
        en: ["Delivered end-to-end design for 20+ startups in fintech, health, and media", "Developed brand identities and design systems from scratch"],
      },
    },
  ],
  education: [
    {
      institution: "Rhode Island School of Design",
      degree: { ro: "Licență, Design Grafic", ru: "Бакалавр, Графический дизайн", en: "BFA, Graphic Design" },
      period: "2012 — 2016",
      detail: { ro: "Absolvit cu Onoruri · Lista Decanului · Premiul Tezei de Licență", ru: "Окончил с отличием · Список декана · Премия за дипломную работу", en: "Graduated with Honors · Dean's List · Senior Thesis Award" },
    },
    {
      institution: "MIT OpenCourseWare",
      degree: { ro: "Certificat, Interacțiunea Om-Calculator", ru: "Сертификат, Взаимодействие человек-компьютер", en: "Certificate, Human-Computer Interaction" },
      period: "2019",
      detail: { ro: "Curriculum autodirijat în utilizabilitate, cogniție și accesibilitate", ru: "Самостоятельная программа по юзабилити, когниции и доступности", en: "Self-directed curriculum in usability, cognition, and accessibility" },
    },
  ],
  skills: {
    Design: ["Figma", "Prototyping", "Design Systems", "Motion Design", "Accessibility", "UX Research"],
    Engineering: ["React", "TypeScript", "CSS/Tailwind", "Storybook", "Framer", "Git"],
    Strategy: ["Product Thinking", "A/B Testing", "OKRs", "User Interviews", "Data Analysis"],
  },
  languages: [{ lang: "Romanian", level: 100 }, { lang: "English", level: 85 }, { lang: "Russian", level: 70 }],
  awards: [{ title: "Awwwards Site of the Day", year: "2023" }, { title: "Fast Company Innovation by Design", year: "2022" }, { title: "CSS Design Awards — Special Kudos", year: "2021" }],
};

const accent = "#6ee7a0";
const bg = "#1a1f1b";
const sub = "rgba(255,255,255,0.4)";

const LANG_OPTIONS = [{ code: "ro", label: "RO" }, { code: "ru", label: "RU" }, { code: "en", label: "EN" }];

const CONTACT_CHIPS = [
  ["✉", CV_DATA.contact.email],
  ["☎", CV_DATA.contact.phone],
];

const PHOTO_MASK = "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 22%, rgba(0,0,0,0.65) 42%, black 62%, black 80%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)";

function generateCV(lang, t) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210, ml = 20, mr = 20, cw = W - ml - mr;
  let y = 20;

  const gap = (n = 5) => { y += n; };
  const checkPage = (needed = 12) => { if (y + needed > 277) { doc.addPage(); y = 20; } };

  const green = [110, 231, 160];
  const dark  = [28,  35, 29];
  const mid   = [80,  80, 80];
  const light = [120, 120, 120];

  // ── Header ──────────────────────────────────────────────
  doc.setFontSize(26).setFont("helvetica", "bold").setTextColor(...dark);
  doc.text(CV_DATA.name, ml, y); gap(8);

  doc.setFontSize(10).setFont("helvetica", "normal").setTextColor(...mid);
  doc.text(CV_DATA.title[lang], ml, y); gap(5);

  doc.setDrawColor(...green).setLineWidth(0.5);
  doc.line(ml, y, W - mr, y); gap(5);

  doc.setFontSize(8.5).setTextColor(...light);
  const contactLine = [
    CV_DATA.contact.email,
    CV_DATA.contact.phone,
    CV_DATA.contact.linkedin,
    CV_DATA.contact.location,
  ].join("   |   ");
  doc.text(contactLine, ml, y); gap(8);

  // About
  doc.setFontSize(9.5).setFont("helvetica", "normal").setTextColor(...mid);
  const aboutLines = doc.splitTextToSize(CV_DATA.about[lang], cw);
  doc.text(aboutLines, ml, y); gap(aboutLines.length * 5 + 6);

  // ── Section helper ──────────────────────────────────────
  const sectionHead = (title) => {
    checkPage(16);
    doc.setFontSize(9).setFont("helvetica", "bold").setTextColor(...green);
    doc.text(title.toUpperCase(), ml, y); gap(3);
    doc.setDrawColor(...green).setLineWidth(0.3);
    doc.line(ml, y, W - mr, y); gap(6);
  };

  // ── Experience ──────────────────────────────────────────
  sectionHead(t.sections.experience);
  CV_DATA.experience.forEach((exp) => {
    checkPage(22);
    doc.setFontSize(11).setFont("helvetica", "bold").setTextColor(...dark);
    doc.text(exp.company, ml, y);
    doc.setFontSize(8.5).setFont("helvetica", "normal").setTextColor(...light);
    doc.text(exp.period, W - mr, y, { align: "right" });
    gap(5);

    doc.setFontSize(9).setFont("helvetica", "italic").setTextColor(...green);
    doc.text(`${exp.role[lang]}  ·  ${exp.location}`, ml, y); gap(5);

    exp.bullets[lang].forEach((b) => {
      checkPage(8);
      const lines = doc.splitTextToSize(`• ${b}`, cw - 4);
      doc.setFont("helvetica", "normal").setTextColor(...mid).setFontSize(9);
      doc.text(lines, ml + 2, y);
      gap(lines.length * 4.5);
    });
    gap(4);
  });

  // ── Education ───────────────────────────────────────────
  sectionHead(t.education);
  CV_DATA.education.forEach((edu) => {
    checkPage(16);
    doc.setFontSize(10).setFont("helvetica", "bold").setTextColor(...dark);
    doc.text(edu.institution, ml, y);
    doc.setFontSize(8.5).setFont("helvetica", "normal").setTextColor(...light);
    doc.text(edu.period, W - mr, y, { align: "right" });
    gap(5);

    doc.setFontSize(9).setFont("helvetica", "italic").setTextColor(...green);
    doc.text(edu.degree[lang], ml, y); gap(4);

    doc.setFont("helvetica", "normal").setTextColor(...mid);
    doc.text(edu.detail[lang], ml, y); gap(8);
  });

  // ── Skills ──────────────────────────────────────────────
  sectionHead(t.sections.skills);
  Object.entries(CV_DATA.skills).forEach(([cat, skills]) => {
    checkPage(10);
    doc.setFontSize(8.5).setFont("helvetica", "bold").setTextColor(...mid);
    doc.text(t[cat.toLowerCase()].toUpperCase(), ml, y); gap(4);
    doc.setFont("helvetica", "normal").setTextColor(...dark).setFontSize(9);
    const skillLines = doc.splitTextToSize(skills.join("  ·  "), cw);
    doc.text(skillLines, ml, y); gap(skillLines.length * 4.5 + 4);
  });

  // ── Languages ───────────────────────────────────────────
  gap(2);
  doc.setFontSize(8.5).setFont("helvetica", "bold").setTextColor(...mid);
  doc.text(t.languages.toUpperCase(), ml, y); gap(5);
  CV_DATA.languages.forEach((l) => {
    checkPage(8);
    doc.setFont("helvetica", "normal").setFontSize(9).setTextColor(...dark);
    doc.text(`${l.lang}`, ml, y);
    doc.setTextColor(...light);
    doc.text(`${l.level}%`, ml + 30, y);
    gap(5);
  });
  gap(2);

  // ── Awards ──────────────────────────────────────────────
  sectionHead(t.awards);
  CV_DATA.awards.forEach((a) => {
    checkPage(8);
    doc.setFontSize(9).setFont("helvetica", "normal").setTextColor(...dark);
    doc.text(a.title, ml, y);
    doc.setTextColor(...green);
    doc.text(a.year, W - mr, y, { align: "right" });
    gap(6);
  });

  doc.save(`${CV_DATA.name.replace(" ", "_")}_CV.pdf`);
}

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }}>
      {children}
    </div>
  );
}

const SectionHead = memo(function SectionHead({ num, title }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "32px", paddingBottom: "12px", borderBottom: "1px solid rgba(110,231,160,0.2)" }}>
      <span style={{ color: accent, fontFamily: "monospace", fontSize: "12px", opacity: 0.7 }}>{num}</span>
      <span style={{ color: "white", fontSize: "14px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>{title}</span>
    </div>
  );
});

const LanguageSwitcher = memo(function LanguageSwitcher({ lang, setLang, isMobile }) {
  return (
    <div style={{
      position: "fixed", top: "16px",
      left: isMobile ? "auto" : "20px",
      right: isMobile ? "16px" : "auto",
      zIndex: 200,
      display: "flex", gap: "4px",
      background: "rgba(26,31,27,0.9)", backdropFilter: "blur(10px)",
      border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px",
      padding: "4px",
    }}>
      {LANG_OPTIONS.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className="cv-btn"
          style={{
            padding: "5px 11px",
            borderRadius: "7px",
            border: "none",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: lang === code ? 700 : 400,
            letterSpacing: "0.08em",
            background: lang === code ? accent : "transparent",
            color: lang === code ? bg : sub,
            transition: "all 0.2s ease",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
});

export default function App() {
  const [active, setActive] = useState("home");
  const [lang, setLang] = useState("en");
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const t = TRANSLATIONS[lang];
  const photoRef = useRef(null);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); }); },
      { threshold: 0.3, rootMargin: "-10% 0px -60% 0px" }
    );
    NAV_IDS.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let rafId;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (photoRef.current) {
          photoRef.current.style.opacity = Math.max(0, 1 - y / 500);
          photoRef.current.style.transform = `translateY(${-y * 0.35}px)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <div style={{ background: bg, minHeight: "100vh", color: "white", fontFamily: "'DM Sans', sans-serif", display: "flex" }}>

      <LanguageSwitcher lang={lang} setLang={setLang} isMobile={isMobile} />

      {!isMobile && (
        <nav style={{ position: "fixed", top: 0, left: 0, width: "200px", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", zIndex: 100, borderRight: "1px solid rgba(255,255,255,0.06)", background: "rgba(26,31,27,0.95)", backdropFilter: "blur(10px)" }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "16px", top: `${NAV_IDS.indexOf(active) * 44}px`, width: "3px", height: "44px", background: accent, borderRadius: "2px", transition: "top 0.3s cubic-bezier(0.4,0,0.2,1)" }} />
            {t.navItems.map((item, i) => (
              <a key={item} href={"#" + NAV_IDS[i]} onClick={() => setActive(NAV_IDS[i])}
                className="cv-nav-link"
                style={{ display: "flex", alignItems: "center", height: "44px", width: "100%", paddingLeft: "36px", textDecoration: "none", color: active === NAV_IDS[i] ? accent : sub, fontSize: "13px", fontWeight: active === NAV_IDS[i] ? 600 : 400, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {item}
              </a>
            ))}
          </div>
        </nav>
      )}

      {isMobile && (
        <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, display: "flex", justifyContent: "space-around", alignItems: "center", height: "60px", background: "rgba(26,31,27,0.97)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {t.navItems.map((item, i) => (
            <a key={item} href={"#" + NAV_IDS[i]} onClick={() => setActive(NAV_IDS[i])}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none", padding: "6px 10px", color: active === NAV_IDS[i] ? accent : sub, fontSize: "9px", fontWeight: active === NAV_IDS[i] ? 600 : 400, letterSpacing: "0.06em", textTransform: "uppercase", borderTop: active === NAV_IDS[i] ? `2px solid ${accent}` : "2px solid transparent", transition: "color 0.2s, border-color 0.2s", marginTop: "-2px" }}>
              {item}
            </a>
          ))}
        </nav>
      )}

      <main style={{ marginLeft: isMobile ? 0 : "200px", flex: 1, padding: isMobile ? "0 20px" : "0 64px", maxWidth: isMobile ? "100%" : "860px", position: "relative", zIndex: 1, paddingBottom: isMobile ? "60px" : 0 }}>

        {/* PHOTO */}
        <div ref={photoRef} style={{ position: "fixed", top: 0, right: 0, width: "50%", height: "100vh", zIndex: 0, pointerEvents: "none", willChange: "transform, opacity", display: isMobile ? "none" : "block" }}>
          <img
            src={photo}
            alt=""
            style={{
              width: "100%", height: "120%",
              objectFit: "cover", objectPosition: "50% 28%", display: "block",
              maskImage: PHOTO_MASK,
              maskComposite: "intersect",
              WebkitMaskImage: PHOTO_MASK,
              WebkitMaskComposite: "source-in",
              opacity: 0.82,
            }}
          />
        </div>

        {/* HOME */}
        <section id="home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "80px", position: "relative" }}>
          <div style={{ position: "relative", zIndex: 1 }}>
            <AnimatedSection delay={0}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: accent, boxShadow: `0 0 8px ${accent}`, animation: "pulse 2s infinite" }} />
                <span style={{ color: accent, fontSize: "13px", fontWeight: 500, letterSpacing: "0.1em" }}>{t.openToWork}</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div style={{ marginBottom: "24px" }}>
                <p style={{ color: sub, fontSize: "14px", letterSpacing: "0.1em", marginBottom: "8px" }}>{CV_DATA.title[lang]}</p>
                <h1 style={{ fontSize: "clamp(44px, 6.5vw, 74px)", fontWeight: 800, lineHeight: 1.05, color: "white", margin: 0 }}>
                  {CV_DATA.name.split(" ")[0]}<br />
                  <span style={{ color: accent }}>{CV_DATA.name.split(" ")[1]}</span>
                </h1>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "32px" }}>
                {CONTACT_CHIPS.map(([icon, value]) => (
                  <div key={value} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "7px 14px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "40px", fontSize: "13px", color: sub, background: "rgba(26,31,27,0.75)", backdropFilter: "blur(8px)" }}>
                    <span style={{ color: accent, fontSize: "12px" }}>{icon}</span>
                    {value}
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px", lineHeight: 1.75, maxWidth: isMobile ? "100%" : "400px", marginBottom: "36px" }}>{CV_DATA.about[lang]}</p>
              <button onClick={() => generateCV(lang, t)} className="cv-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", background: accent, color: bg, borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: 700, letterSpacing: "0.05em" }}>
                {t.downloadCV}
              </button>
            </AnimatedSection>
          </div>
        </section>

        {/* SUMMARY */}
        <section id="summary" style={{ paddingTop: "120px", paddingBottom: "80px", background: bg, position: "relative", zIndex: 2 }}>
          <AnimatedSection>
            <SectionHead num="01" title={t.sections.summary} />
            <div style={{ marginBottom: "48px" }}>
              <p style={{ color: sub, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>{t.awards}</p>
              {CV_DATA.awards.map((a) => (
                <div key={a.title} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ fontSize: "15px", color: "rgba(255,255,255,0.85)" }}>{a.title}</span>
                  <span style={{ color: accent, fontSize: "13px", fontFamily: "monospace" }}>{a.year}</span>
                </div>
              ))}
            </div>
            <div>
              <p style={{ color: sub, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>{t.education}</p>
              {CV_DATA.education.map((edu) => (
                <div key={edu.institution} style={{ marginBottom: "24px" }}>
                  <div className="cv-flex-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: "15px", fontWeight: 600, color: "white" }}>{edu.institution}</span>
                    <span style={{ color: sub, fontSize: "13px", fontFamily: "monospace" }}>{edu.period}</span>
                  </div>
                  <p style={{ color: accent, fontSize: "14px", margin: "4px 0 2px" }}>{edu.degree[lang]}</p>
                  <p style={{ color: sub, fontSize: "13px", margin: 0 }}>{edu.detail[lang]}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" style={{ paddingTop: "120px", paddingBottom: "80px", background: bg, position: "relative", zIndex: 2 }}>
          <AnimatedSection><SectionHead num="02" title={t.sections.experience} /></AnimatedSection>
          {CV_DATA.experience.map((exp, i) => (
            <AnimatedSection key={exp.company} delay={i * 0.08}>
              <div className="cv-card" style={{ marginBottom: "32px", padding: "28px", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", background: "rgba(255,255,255,0.02)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${accent}44`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}>
                <div className="cv-flex-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                  <span style={{ fontSize: "20px", fontWeight: 700, color: "white" }}>{exp.company}</span>
                  <span style={{ color: sub, fontSize: "12px", fontFamily: "monospace" }}>{exp.period}</span>
                </div>
                <div style={{ display: "flex", gap: "12px", marginBottom: "16px", alignItems: "center" }}>
                  <span style={{ color: accent, fontSize: "14px" }}>{exp.role[lang]}</span>
                  <span style={{ color: sub, fontSize: "12px" }}>· {exp.location}</span>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {exp.bullets[lang].map((b) => (
                    <li key={b} style={{ display: "flex", gap: "10px", padding: "5px 0", color: "rgba(255,255,255,0.65)", fontSize: "14px", lineHeight: 1.6 }}>
                      <span style={{ color: accent, flexShrink: 0, marginTop: "2px" }}>›</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </section>

        {/* SKILLS */}
        <section id="skills" style={{ paddingTop: "120px", paddingBottom: "80px", background: bg, position: "relative", zIndex: 2 }}>
          <AnimatedSection>
            <SectionHead num="03" title={t.sections.skills} />
            {Object.entries(CV_DATA.skills).map(([cat, skills]) => (
              <div key={cat} style={{ marginBottom: "32px" }}>
                <p style={{ color: sub, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>{t[cat.toLowerCase()]}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {skills.map((sk) => (
                    <span key={sk} style={{ padding: "6px 14px", border: `1px solid ${accent}33`, borderRadius: "6px", fontSize: "13px", color: "rgba(255,255,255,0.8)", background: `${accent}08` }}>{sk}</span>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ marginTop: "48px" }}>
              <p style={{ color: sub, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px" }}>{t.languages}</p>
              {CV_DATA.languages.map((l) => (
                <div key={l.lang} style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>{l.lang}</span>
                    <span style={{ fontSize: "13px", color: sub }}>{l.level}%</span>
                  </div>
                  <div style={{ height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "2px" }}>
                    <div style={{ height: "100%", width: `${l.level}%`, background: accent, borderRadius: "2px", boxShadow: `0 0 8px ${accent}66` }} />
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* LINKS */}
        <section id="links" style={{ paddingTop: "120px", paddingBottom: "120px", background: bg, position: "relative", zIndex: 2 }}>
          <AnimatedSection>
            <SectionHead num="04" title={t.sections.links} />
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: t.email,    value: CV_DATA.contact.email,    href: `mailto:${CV_DATA.contact.email}` },
                { label: t.linkedin, value: CV_DATA.contact.linkedin, href: `https://${CV_DATA.contact.linkedin}` },
                { label: t.phone,    value: CV_DATA.contact.phone,    href: `tel:${CV_DATA.contact.phone}` },
                { label: t.location, value: CV_DATA.contact.location, href: "#" },
              ].map((link) => (
                <a key={link.label} href={link.href}
                  className="cv-card"
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", textDecoration: "none", color: "white", background: "rgba(255,255,255,0.02)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${accent}44`; e.currentTarget.style.background = `${accent}06`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}>
                  <span style={{ color: sub, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>{link.label}</span>
                  <span style={{ color: accent, fontSize: "14px" }}>{link.value} ↗</span>
                </a>
              ))}
            </div>
          </AnimatedSection>
        </section>

        <footer style={{ padding: "40px 0", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center", background: bg, position: "relative", zIndex: 2 }}>
          <p style={{ color: sub, fontSize: "13px", margin: 0 }}>{CV_DATA.name} © {new Date().getFullYear()} · {t.footer}</p>
        </footer>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #1a1f1b; }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(110,231,160,0.3); border-radius: 2px; }

        .cv-btn { transition: transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .cv-btn:active { transform: scale(0.88) !important; }

        .cv-btn-primary { transition: transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease; }
        .cv-btn-primary:active { transform: scale(0.94) !important; box-shadow: 0 0 20px rgba(110,231,160,0.4); }

        .cv-nav-link { transition: color 0.2s, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), font-size 0.2s ease !important; }
        .cv-nav-link:hover { transform: translateX(6px) scale(1.13) !important; }
        .cv-nav-link:active { transform: translateX(8px) scale(1.05) !important; }

        .cv-card { transition: border-color 0.2s, background 0.2s, transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1) !important; }
        .cv-card:active { transform: scale(0.982) !important; }

        @media (max-width: 767px) {
          .cv-nav-link:hover { transform: none !important; }
          .cv-nav-link:active { transform: none !important; }
          .cv-flex-row { flex-direction: column !important; gap: 2px !important; }
        }
      `}</style>
    </div>
  );
}
