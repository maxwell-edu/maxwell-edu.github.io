import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  GraduationCap,
  Trophy,
  Sigma,
  Code2,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Target,
  Layers,
  Compass,
  BookOpen,
  Crown,
  CheckCircle2,
  LifeBuoy,
  Rocket,
  Check,
} from "lucide-react";

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');

/* Gem-cut gradient button — ported from the reference HTML's .btn-gem */
.btn-gem {
  background: linear-gradient(135deg, #D97706 0%, #B45309 50%, #78350F 100%);
  box-shadow: 0 10px 30px -8px rgba(217, 119, 6, 0.35), inset 0 1px 1px rgba(255,255,255,0.2);
  transition: all 0.3s ease;
  color: white;
}
.btn-gem:hover {
  box-shadow: 0 15px 40px -8px rgba(217, 119, 6, 0.55), inset 0 1px 1px rgba(255,255,255,0.25);
  transform: translateY(-2px);
}
`;

const display = { fontFamily: "'Fraunces', serif" };
const mono = { fontFamily: "'IBM Plex Mono', monospace" };

// ---------- Structured Data (JSON-LD) ----------
// NOTE: "url" and "logo" are placeholders — replace with the real production
// domain and a hosted logo file before deploying. No price/offers data is
// included because no real tuition pricing was ever established for this
// site; fabricating a price would be a factual claim we can't stand behind.
// "Course" is used instead of "Product" — schema.org's Product type (with
// offers/price/availability) is built for retail goods, not tutoring
// services, and using it here would misrepresent what Maxwell Education is.
const SCHEMA_ORG_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": "https://www.maxwelleducation.example/#organization",
      name: "Maxwell Education",
      url: "https://www.maxwelleducation.example/",
      logo: "https://www.maxwelleducation.example/logo.png",
      description:
        "Maxwell Education is a Richmond Hill, Ontario tutoring academy specializing in Math, Science, Programming, AP/IB coursework, and academic competition preparation for students in Grades 3–12.",
      email: "admin@maxedu.ca",
      telephone: "+1-289-276-2958",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Richmond Hill",
        addressRegion: "ON",
        addressCountry: "CA",
      },
      areaServed: "Richmond Hill, Ontario",
      knowsAbout: [
        "Ontario Curriculum Mathematics",
        "AP Calculus AB and BC",
        "IB Diploma Programme Physics",
        "University of Waterloo CEMC Contests",
      ],
    },
    {
      "@type": "Course",
      name: "Math & Science",
      description:
        "Core Ontario math and science sequence from Grade 3 fluency through the full Grade 11/12 curriculum.",
      provider: { "@id": "https://www.maxwelleducation.example/#organization" },
    },
    {
      "@type": "Course",
      name: "AP / IB Advanced",
      description:
        "Advanced coursework and exam preparation for AP and IB students, plus university-level mathematics (College Calculus with Proofs, Linear Algebra) for students beyond Grade 12.",
      provider: { "@id": "https://www.maxwelleducation.example/#organization" },
    },
    {
      "@type": "Course",
      name: "Contest Prep",
      description:
        "Direct coaching for academic competitions including CSMC, Euclid, COMC, AMC, the Canadian Computing Competition, Physics Bowl, and F=ma.",
      provider: { "@id": "https://www.maxwelleducation.example/#organization" },
    },
    {
      "@type": "Course",
      name: "Programming",
      description:
        "Introductory and advanced Java and Python instruction for students building toward AP Computer Science A or the CCC.",
      provider: { "@id": "https://www.maxwelleducation.example/#organization" },
    },
  ],
};

function SchemaMarkup() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ORG_JSONLD) }}
    />
  );
}

// ---------- Shared ----------
function Eyebrow({ children, center = false }) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase mb-5 font-semibold text-amber-400 ${
        center ? "justify-center" : ""
      }`}
      style={mono}
    >
      <span className="w-8 h-px bg-amber-400" />
      {children}
    </div>
  );
}

function GlowBlob({ className }) {
  return <div className={`absolute rounded-full blur-3xl pointer-events-none ${className}`} />;
}

// ---------- Nav ----------
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Programs", href: "#programs" },
    { label: "Results", href: "#results" },
    { label: "Our Philosophy", href: "#philosophy" },
    { label: "FAQ", href: "#faq" },
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-slate-950/70 border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <span
            className="w-9 h-9 rounded-md flex items-center justify-center text-sm font-bold bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950"
            style={mono}
          >
            M
          </span>
          <span className="text-lg font-bold tracking-tight text-white" style={display}>
            Maxwell Education
          </span>
        </a>

        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href="#cta"
            className="btn-gem text-sm font-bold px-5 py-2.5 rounded-md"
          >
            Book a Free Assessment
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 border-t border-white/10 bg-slate-950/95">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-slate-300 pt-4" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            href="#cta"
            className="btn-gem text-sm font-bold px-5 py-3 rounded-md text-center"
            onClick={() => setOpen(false)}
          >
            Book a Free Assessment
          </a>
        </div>
      )}
    </header>
  );
}

// ---------- Hero ----------
function Hero() {
  const stats = [
    {
      icon: Target,
      value: "92%+",
      detail: "Average GPA Improvement · Closed foundational gaps to unlock consistent school grades",
    },
    {
      icon: Layers,
      value: "Dual-Track",
      detail: "Remedial & Advanced Support · Fluidly balancing custom school-curriculum repair with elite prep",
    },
    {
      icon: Trophy,
      value: "8+ Tracks",
      detail: "Global Contests Evaluated · Direct long-term coaching for Waterloo, AMC, and Computing lists",
    },
    {
      icon: Compass,
      value: "Gr 3–12",
      detail: "Continuous Blueprint · Tracking data records and growth curves from primary years to graduation",
    },
  ];

  const offers = [
    { name: "Alex X.", school: "University of Toronto" },
    { name: "David L. & Matt L.", school: "University of Waterloo" },
    { name: "Lin Z.", school: "University of Chicago" },
  ];

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 pt-40 pb-20 md:pt-48 md:pb-28">
      <GlowBlob className="w-[32rem] h-[32rem] bg-amber-500/10 -top-40 -right-40" />
      <GlowBlob className="w-96 h-96 bg-indigo-500/10 bottom-0 -left-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          {/* Left: copy */}
          <div>
            <Eyebrow>Richmond Hill · Online &amp; In-Person</Eyebrow>
            <h1 className="text-5xl md:text-7xl leading-[1.03] font-bold tracking-tight text-white" style={display}>
              Unlocking Joyful Learning:{" "}
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Your Path to Math Mastery.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base font-medium text-slate-400">
              Maxwell Education is a Richmond Hill, Ontario tutoring academy
              specializing in Math, Science, Programming, AP/IB coursework,
              and academic competition preparation for students in Grades
              3–12.
            </p>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-300">
              For families weighing where their child fits, the question
              isn't Math <em>or</em> competitions — it's how far to take
              things, and how fast.
            </p>

            {/* One Continuous Track — highlighted definition block */}
            <div className="mt-6 backdrop-blur-md bg-white/5 border border-amber-400/20 rounded-2xl p-6 max-w-xl">
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-amber-400 mb-3" style={mono}>
                Definition — One Continuous Track
              </h2>
              <p className="text-sm leading-relaxed text-slate-300" style={mono}>
                One Continuous Track is our blueprint spanning Grades 3–12.
                Because the{" "}
                <a
                  href="https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-mathematics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 underline underline-offset-2"
                >
                  Ontario mathematics curriculum
                </a>{" "}
                builds cumulatively from one grade to the next, we guide
                students along one ongoing path across Math, Science, and
                Coding instead of standard, rigid grade-level tutoring —
                fluidly adjusting the mix between foundational repair and
                elite contest prep based on individual milestones.
              </p>

              <div className="mt-5 grid sm:grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <LifeBuoy size={16} className="text-slate-300" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wide" style={mono}>
                      The Remedial Rail
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-400">
                    Precise diagnostics, targeted gap-closing, and rebuilt
                    academic confidence — the foundation for stronger grades
                    ahead.
                  </p>
                </div>
                <div className="rounded-xl bg-amber-400/5 border border-amber-400/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Rocket size={16} className="text-amber-400" />
                    <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wide" style={mono}>
                      The Advanced Rail
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-400">
                    A custom advanced ceiling, focused work on the hardest
                    AP/IB material, and full-speed prep for Waterloo, AMC,
                    and other international competitions.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#cta"
                className="btn-gem inline-flex items-center gap-2 text-base font-bold px-7 py-4 rounded-md"
              >
                Book a Free Assessment <ArrowRight size={18} />
              </a>
              <a
                href="#programs"
                className="inline-flex items-center gap-2 text-base font-bold px-7 py-4 rounded-md border border-white/20 text-white hover:bg-white/5 transition-colors"
              >
                Explore Our Tracks
              </a>
            </div>
          </div>

          {/* Right: Achievement Dashboard */}
          <div className="relative">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-7 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-amber-400" />
                  <p className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-400" style={mono}>
                    Academic Track Record
                  </p>
                </div>
                <span className="text-[10px] font-semibold tracking-widest text-slate-500" style={mono}>
                  OFFICIAL RECORD
                </span>
              </div>

              <div className="space-y-4">
                {stats.map((s) => (
                  <div key={s.detail} className="flex items-center gap-4 rounded-xl bg-white/5 border border-white/10 px-4 py-3.5">
                    <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center flex-shrink-0">
                      <s.icon size={18} className="text-amber-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xl font-bold text-white leading-tight" style={mono}>
                        {s.value}
                      </p>
                      <p className="text-xs text-slate-400 leading-snug">{s.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:flex absolute -bottom-6 -left-6 items-center gap-2 backdrop-blur-md bg-slate-900/90 border border-amber-400/30 rounded-xl px-4 py-3 shadow-xl">
              <CheckCircle2 size={16} className="text-amber-400" />
              <span className="text-xs font-bold text-white">Results our families can name and verify</span>
            </div>
          </div>
        </div>

        {/* Elite Results Strip */}
        <div className="mt-20 pt-10 border-t border-white/10">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-400 mb-5" style={mono}>
            Recent offers earned by our students
          </p>
          <div className="flex flex-wrap gap-3">
            {offers.map((o) => (
              <div key={o.name} className="flex items-center gap-3 backdrop-blur-md bg-white/5 border border-amber-400/30 rounded-full pl-3 pr-5 py-2.5">
                <span className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
                  <GraduationCap size={15} className="text-amber-400" />
                </span>
                <div>
                  <p className="text-sm font-bold text-white leading-tight">{o.school}</p>
                  <p className="text-xs text-slate-400" style={mono}>{o.name}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 backdrop-blur-md bg-amber-400/10 border border-amber-400/40 rounded-full pl-3 pr-5 py-2.5">
              <span className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center">
                <Trophy size={15} className="text-amber-400" />
              </span>
              <div>
                <p className="text-sm font-bold text-white leading-tight">Full Marks — CSMC</p>
                <p className="text-xs text-slate-400" style={mono}>Mathematics Competition</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Philosophy ----------
function Philosophy() {
  const pillars = [
    {
      icon: Compass,
      num: "01",
      title: "Guided Exploration",
      body: "Math clicks when a student discovers the idea themselves. We ask the questions that lead there, instead of handing over the answer — so understanding sticks long after the session ends.",
    },
    {
      icon: BookOpen,
      num: "02",
      title: "Solid Foundations",
      body: "Solid Foundations is the Grades 3–8 stage of our One Continuous Track. We close gaps early and build fluency deliberately, so a student arrives at high school ready to advance — not catching up.",
    },
    {
      icon: Crown,
      num: "03",
      title: "Navigating Higher Horizons",
      body: "Higher Horizons is the Grades 9–12 stage of that same One Continuous Track. As a student is ready, it can bring in course selection, AP/IB pacing, and academic competitions — the combination shaped by their own goals, not a fixed sequence every student follows.",
    },
  ];
  return (
    <section id="philosophy" className="relative py-24 md:py-32 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <Eyebrow>Our Philosophy</Eyebrow>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white max-w-xl" style={display}>
          Three principles, one path to mastery.
        </h2>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div
              key={p.num}
              className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-amber-400/50 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(245,158,11,0.3)] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
                  <p.icon size={20} className="text-amber-400" />
                </span>
                <span className="text-sm font-bold text-amber-400" style={mono}>{p.num}</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white" style={display}>
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Programs — Bento Grid ----------
function Programs() {
  const mathSci = {
    blurb:
      "Because Ontario's Grade 11/12 math and science curriculum builds sequentially — each course assumes mastery of the last — we teach the full sequence from Grade 3 fluency onward, so gaps get closed before they compound.",
    items: [
      "Gr 3–10 Math",
      "Gr 11 Functions",
      "Gr 12 Advanced Functions",
      "Gr 12 Vector & Calculus",
      "Gr 12 Data Management",
      "Gr 11/12 Physics",
      "Gr 11/12 Chemistry",
    ],
  };
  const contest = {
    blurb:
      "Because contests like CSMC, Euclid, and the CCC are set and graded by an external body — the University of Waterloo's CEMC — a strong result is a comparable, third-party signal of problem-solving ability.",
    items: [
      "CSMC",
      "Euclid",
      "COMC",
      "AMC 8 / 10 / 12",
      "Gauss → Hypatia",
      "Canadian Computing Competition",
      "Physics Bowl",
      "F = ma",
    ],
  };
  const apib = {
    blurb:
      "Because AP and IB exams are scored against a fixed external standard, we pace instruction around that published standard — not just the classroom material.",
    items: ["AP Calculus AB & BC", "AP Physics 1 / 2 / C", "IB Physics HL / SL", "College Calculus with Proofs*", "Linear Algebra*"],
  };
  const code = {
    blurb:
      "Because AP Computer Science A and the CCC both assume working fluency in a real language, we start students early — so the language itself isn't the obstacle.",
    items: ["Java — Intro & Advanced", "Python — Intro & Advanced"],
  };

  const cardHover =
    "hover:border-amber-400/50 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(245,158,11,0.3)] transition-all duration-300";

  return (
    <section id="programs" className="relative py-24 md:py-32 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <Eyebrow>Course Catalog</Eyebrow>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white max-w-xl" style={display}>
          A curriculum for every stage of the journey.
        </h2>
        <p className="mt-4 max-w-xl text-slate-400">
          Math &amp; Science, AP/IB, Contest Prep, and Programming aren't
          separate programs — they're areas within the same One Continuous
          Track, drawn on as they fit a student's grade level and goals.
        </p>

        {/* Bento grid — everything visible at once, no tab click required */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-6">
          {/* Math & Science — large, featured */}
          <div className={`lg:col-span-2 lg:row-span-2 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col ${cardHover}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center flex-shrink-0">
                <Sigma size={22} className="text-amber-400" />
              </span>
              <h3 className="text-2xl font-bold text-white" style={display}>Math &amp; Science</h3>
            </div>
            <p className="text-sm text-slate-400 mb-6 max-w-md">{mathSci.blurb}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {mathSci.items.map((it) => (
                <span key={it} className="text-xs font-bold px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                  {it}
                </span>
              ))}
            </div>
          </div>

          {/* Contest Prep — wide, highlighted as the differentiator */}
          <div
            className={`lg:col-span-2 rounded-2xl p-8 flex flex-col bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-transparent border border-amber-400/30 ${cardHover}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center flex-shrink-0">
                <Trophy size={22} className="text-amber-400" />
              </span>
              <h3 className="text-2xl font-bold text-white" style={display}>Contest Prep</h3>
            </div>
            <p className="text-sm text-slate-300 mb-6 max-w-md">{contest.blurb}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {contest.items.map((it) => (
                <span key={it} className="text-xs font-bold px-3 py-2 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-200">
                  {it}
                </span>
              ))}
            </div>
          </div>

          {/* AP / IB Advanced — compact */}
          <div className={`backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col ${cardHover}`}>
            <span className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-4">
              <GraduationCap size={20} className="text-amber-400" />
            </span>
            <h3 className="text-lg font-bold text-white mb-2" style={display}>AP / IB Advanced</h3>
            <p className="text-xs text-slate-400 mb-4">{apib.blurb}</p>
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {apib.items.map((it) => (
                <span key={it} className="text-[10px] font-bold px-2.5 py-1.5 rounded-md bg-white/5 border border-white/10 text-slate-300">
                  {it}
                </span>
              ))}
            </div>
          </div>

          {/* Programming — compact */}
          <div className={`backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col ${cardHover}`}>
            <span className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-4">
              <Code2 size={20} className="text-amber-400" />
            </span>
            <h3 className="text-lg font-bold text-white mb-2" style={display}>Programming</h3>
            <p className="text-xs text-slate-400 mb-4">{code.blurb}</p>
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {code.items.map((it) => (
                <span key={it} className="text-[10px] font-bold px-2.5 py-1.5 rounded-md bg-white/5 border border-white/10 text-slate-300">
                  {it}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-5 text-xs text-slate-500">
          * Advanced Track Elite — College Calculus with Proofs and Linear
          Algebra are reserved for students who've already mastered Grade 12
          or AP-level material, a further step alongside our regular AP/IB
          offerings.
        </p>
      </div>
    </section>
  );
}

// ---------- Success Stories — "Proof Wall" ----------
function ProofCard({ school, title, body }) {
  return (
    <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-amber-400/50 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(245,158,11,0.3)] transition-all duration-300">
      <p className="text-xs uppercase tracking-[0.15em] mb-3 font-bold text-amber-400" style={mono}>
        {school}
      </p>
      <h3 className="text-2xl font-bold mb-2 text-white" style={display}>
        {title}
      </h3>
      <p className="text-sm mb-6 text-slate-400 leading-relaxed">{body}</p>
      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400" style={mono}>VERIFIED OFFER</span>
        <span className="text-xl text-amber-400" style={display}>∎</span>
      </div>
    </div>
  );
}

// ---------- Verified Credentials Wall ----------
function CredentialCard({ image, alt, level, title, blurb }) {
  return (
    <div className="group relative flex flex-col backdrop-blur-md bg-white/5 border border-amber-400/20 rounded-2xl p-6 pt-8 hover:border-amber-400/50 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(245,158,11,0.3)] transition-all duration-300">
      {/* Official Verified badge */}
      <div
        className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-emerald-500 pl-1.5 pr-3 py-1 text-[10px] font-bold text-white shadow-lg shadow-emerald-500/30"
        style={mono}
      >
        <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-white/25">
          <Check size={9} strokeWidth={3.5} />
        </span>
        2026 Official Record
      </div>

      {/* Certificate image placeholder — replace src with the real scanned
          certificate before publishing; this is not a stand-in graphic. */}
      <div className="relative mb-5 rounded-xl overflow-hidden border border-white/10 bg-slate-900/60 aspect-[4/3]">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 rounded-xl pointer-events-none ring-1 ring-inset ring-white/5 transition-all duration-500 group-hover:ring-2 group-hover:ring-amber-400/50 group-hover:shadow-[0_0_30px_rgba(251,191,36,0.35)]" />
      </div>

      <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-amber-400 mb-1.5" style={mono}>
        {level}
      </p>
      <h3 className="text-lg font-bold text-white leading-snug mb-2" style={display}>
        {title}
      </h3>
      <p className="text-xs leading-relaxed text-slate-400">{blurb}</p>
    </div>
  );
}

function CredentialsWall() {
  // Prefix with Vite's BASE_URL so image paths resolve correctly whether
  // the site is deployed at a domain root or a GitHub Pages sub-path
  // (e.g. https://<user>.github.io/<repo>/) — a plain "/assets/..." string
  // is NOT rewritten by Vite at build time, only imported modules are.
  const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

  const credentials = [
    {
      image: asset("assets/credentials/amc8-distinction.jpg"),
      alt: "AMC 8 Certificate of Distinction",
      level: "Top 5% Globally",
      title: "AMC 8 Certificate of Distinction",
      blurb:
        "This is our coaching at full stretch — a direct result against North America's toughest selection bar. For families aiming at the very top.",
    },
    {
      image: asset("assets/credentials/amc8-certificate.jpg"),
      alt: "AMC 8 Certificate",
      level: "Top 10% Globally",
      title: "AMC 8 Certificate",
      blurb:
        "Proof that strong results aren't one-off luck — they come from a system. Excellence becomes something you can plan for.",
    },
    {
      image: asset("assets/credentials/kangaroo-medal.jpg"),
      alt: "Canadian Math Kangaroo National Medal, Grade 6",
      level: "National Medalist in Canada",
      title: "Canadian Math Kangaroo National Medal (Grade 6)",
      blurb:
        "Earned in the Grade 3–6 window, when mathematical thinking forms fastest — proof we can take a student to the top of the national field this early.",
    },
    {
      image: asset("assets/credentials/kangaroo-ribbon.jpg"),
      alt: "Canadian Math Kangaroo Ribbon, Grade 6",
      level: "Certificate of Excellence",
      title: "Canadian Math Kangaroo Ribbon (Grade 6)",
      blurb:
        "Depth without losing the fun — built for students at a mid-level or turning a corner, giving them real math confidence to carry to a bigger stage.",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-slate-950 border-y border-white/10">
      <GlowBlob className="w-96 h-96 bg-emerald-500/5 top-0 right-1/4" />
      <div className="relative max-w-7xl mx-auto px-6">
        <Eyebrow>Verified Credentials</Eyebrow>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white max-w-2xl" style={display}>
          2026 competition certificates, on the record.
        </h2>
        <p className="mt-4 max-w-xl text-slate-400">
          Every certificate below belongs to a real student in our program,
          from this year's competition cycle — shown here as the official
          record, not a marketing composite.
        </p>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.map((c) => (
            <CredentialCard key={c.title} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Results() {
  const stories = [
    {
      title: "Alex X.",
      school: "University of Toronto · Computer Science",
      body: "Our student Alex X. received an offer of admission to the University of Toronto's Computer Science program after participating in our Higher Horizons pathway.",
    },
    {
      title: "David L. & Matt L.",
      school: "University of Waterloo · Software Engineering & Mathematics",
      body: "David L. & Matt L. — two students in our program — each received an offer of admission to the University of Waterloo, a school known for its rigor in math and engineering, with offers spanning Software Engineering and Mathematics.",
    },
    {
      title: "Lin Z.",
      school: "University of Chicago · Economics & Math (AP/Contest Route)",
      body: "Our student Lin Z. received an offer of admission to the University of Chicago for Economics & Math, after participating in AP coursework and contest preparation with us.",
    },
  ];
  return (
    <section id="results" className="relative py-24 md:py-32 bg-slate-900">
      <GlowBlob className="w-96 h-96 bg-amber-500/5 top-0 right-0" />
      <div className="relative max-w-7xl mx-auto px-6">
        <Eyebrow>Proof of Results</Eyebrow>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white max-w-xl" style={display}>
          The outcomes speak for themselves.
        </h2>
        <p className="mt-4 max-w-xl text-slate-400">
          Every case below is a real student who came through our program —
          not a composite, not a testimonial written for the website.
        </p>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {stories.map((s) => (
            <ProofCard key={s.title} school={s.school} title={s.title} body={s.body} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Format & Location ----------
function Format() {
  const items = [
    { icon: MapPin, title: "Richmond Hill", body: "In-person classes at our campus" },
    { icon: GraduationCap, title: "Flexible Format", body: "Online & in-person options available" },
    { icon: Sigma, title: "Grades 3–12", body: "From foundational math to university-level prep" },
  ];
  return (
    <section className="py-16 bg-slate-950 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-3 gap-8">
        {items.map((it) => (
          <div key={it.title} className="flex items-start gap-3">
            <it.icon size={20} className="text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">{it.title}</p>
              <p className="text-sm text-slate-400">{it.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- FAQ ----------
function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  const qas = [
    {
      q: "What grade levels do you teach?",
      a: "Grades 3–12 are our primary student range — from foundational math skills through AP and IB. We also offer select university-level mathematics instruction, including Calculus with Proofs and Linear Algebra, for students ready to go beyond the Grade 12 curriculum.",
    },
    {
      q: "Should my child take AP or IB courses with you?",
      a: "It depends on your child's school curriculum and goals. We offer both tracks — AP (Calculus AB & BC, Chemistry, Physics, Computer Science A) and IB (Physics and Chemistry, HL/SL) — and guide families toward the right fit.",
    },
    {
      q: "How do you decide which competitions fit my child?",
      a: "We start from where a student already performs strongest — math, computing, or physics — and match them to the right contest ladder, whether that's Gauss through Hypatia, AMC, CCC, or Physics Bowl.",
    },
    {
      q: "Do you offer online classes, or only in-person?",
      a: "Both. Our Richmond Hill location offers in-person classes, and we also run the same programs online for families who prefer remote learning.",
    },
    {
      q: "How does contest preparation fit alongside regular coursework?",
      a: "Contest coaching runs alongside our regular curriculum, building on the same fundamentals while sharpening the advanced problem-solving that regular coursework doesn't always cover.",
    },
  ];
  return (
    <section id="faq" className="py-24 md:py-32 bg-slate-900">
      <div className="max-w-3xl mx-auto px-6">
        <Eyebrow>Common Questions</Eyebrow>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-12" style={display}>
          Frequently asked questions.
        </h2>

        <div className="space-y-3">
          {qas.map((item, idx) => (
            <div key={item.q} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
              >
                <h3 className="text-base font-semibold pr-6 text-white m-0">{item.q}</h3>
                <ChevronDown
                  size={18}
                  className="text-amber-400 flex-shrink-0 transition-transform"
                  style={{ transform: openIdx === idx ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              {openIdx === idx && (
                <p className="px-6 pb-5 text-sm leading-relaxed text-slate-400">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Final CTA ----------
function FinalCTA() {
  return (
    <section id="cta" className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950">
      <GlowBlob className="w-96 h-96 bg-amber-500/10 -bottom-20 -left-20" />
      <GlowBlob className="w-96 h-96 bg-indigo-500/10 -top-20 -right-20" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <Eyebrow center>Begin the Path</Eyebrow>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white" style={display}>
          Ready to unlock joyful learning?
        </h2>
        <p className="mt-5 text-lg max-w-lg mx-auto text-slate-300">
          Book a free assessment and we'll map the right starting point —
          whether that's shoring up foundations or building toward a
          national contest.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="tel:2892762958"
            className="btn-gem inline-flex items-center gap-2 text-base font-bold px-7 py-4 rounded-md"
          >
            <Phone size={18} /> 289-276-2958
          </a>
          <a
            href="mailto:admin@maxedu.ca"
            className="inline-flex items-center gap-2 text-base font-bold px-7 py-4 rounded-md border border-white/20 text-white hover:bg-white/5 transition-colors"
          >
            <Mail size={18} /> admin@maxedu.ca
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="py-10 bg-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span
            className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950"
            style={mono}
          >
            M
          </span>
          <span className="text-sm font-bold text-white" style={display}>
            Maxwell Education
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5"><MapPin size={14} /> Richmond Hill · Online & In-Person</span>
          <span className="flex items-center gap-1.5"><Phone size={14} /> 289-276-2958</span>
          <span className="flex items-center gap-1.5"><Mail size={14} /> admin@maxedu.ca</span>
        </div>
        <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} Maxwell Education</p>
      </div>
    </footer>
  );
}

// ---------- Page ----------
export default function MaxwellEducationLanding() {
  return (
    <div className="bg-slate-950">
      <SchemaMarkup />
      <style>{FONT_IMPORT}</style>
      <div style={{ fontFamily: "'Inter', sans-serif" }}>
        <Nav />
        <Hero />
        <Philosophy />
        <Programs />
        <CredentialsWall />
        <Results />
        <Format />
        <FAQ />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
