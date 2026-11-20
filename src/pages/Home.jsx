import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, MoveUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import HeroThread from "../components/HeroThread";

const reveal = {
  hidden: { opacity: 0, y: 45 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const heroStatements = [
  "We build brand authority that commands market trust",
  "Senior brand strategists involved in every mandate",
  "165+ ongoing clients & 4,500+ projects delivered",
  "Strategy, identity & digital presence under one roof",
  "Turning decades of real legacy into digital dominance",
  "Positioning built to lead, not follow trends",
];

const projects = [
  {
    name: "TRIVENI",
    category: "Brand Presence & Positioning",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
    path: "/work/triveni",
  },
  {
    name: "INNE",
    category: "Elevator Engineering & Digital Experience",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    path: "/work/inne",
  },
  {
    name: "HANDA BANGALES",
    category: "Brand Launch & Market Awareness",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    path: "/work/handa-bangales",
  },
  {
    name: "AESTHETIC HOMEZ",
    category: "Manufacturer Brand Positioning",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
    path: "/work/aesthetic-homez",
  },
];

const capabilities = [
  "Brand Strategy & Positioning",
  "Identity & Digital Experiences",
  "Public Relations & Media",
  "Search & Discoverability",
  "Content & Perception",
  "Growth Infrastructure",
];

const businessTimeline = [
  {
    decade: "1980s",
    title: "Built on craft",
    description:
      "Businesses earned recognition through the quality of what they made and the relationships they built.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1100&q=85",
    alt: "Craftsperson working in a manufacturing environment",
  },
  {
    decade: "1990s",
    title: "Reaching new markets",
    description:
      "Better connections helped established businesses reach customers and partners beyond their local markets.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1100&q=85",
    alt: "Modern business district buildings",
  },
  {
    decade: "2000s",
    title: "The digital storefront",
    description:
      "Websites became an important first introduction, extending a company’s presence beyond its physical doors.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=85",
    alt: "Contemporary office and digital workspace",
  },
  {
    decade: "2010s",
    title: "Always within reach",
    description:
      "Mobile and social platforms changed how people discovered, compared and talked about businesses.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1100&q=85",
    alt: "Team collaborating around digital devices",
  },
  {
    decade: "2020s",
    title: "Trust becomes authority",
    description:
      "A clear, consistent presence across every touchpoint helps a brand earn recognition and lasting trust.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1100&q=85",
    alt: "Business team meeting and planning together",
  },
];

const timelinePath =
  "M100 240 C100 350 126 590 100 720 C74 850 74 1070 100 1200 C126 1330 126 1550 100 1680 C74 1810 74 2030 100 2160";

// Put your own file at: public/videos/showreel.mp4
const LOCAL_VIDEO = "/videos/showreel.mp4";
const FALLBACK_VIDEO =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";

function AnimatedStat({ value, progress }) {
  const [count, setCount] = useState(0);
  const target = Number(value.replace(/[^\d]/g, ""));
  const suffix = value.replace(/[\d,]/g, "");
  const hasLeadingZero = /^0\d/.test(value);
  const animatedCount = useTransform(progress, [0, 1], [0, target]);

  useMotionValueEvent(animatedCount, "change", (latest) => {
    setCount(Math.round(latest));
  });

  const formattedCount = new Intl.NumberFormat("en-US").format(count);

  return (
    <span>
      {hasLeadingZero ? formattedCount.padStart(2, "0") : formattedCount}
      {suffix}
    </span>
  );
}

function TimelineCard({ item, index }) {
  const ref = useRef(null);
  const copyRef = useRef(null);
  const direction = index % 2 === 0 ? -1 : 1;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: copyProgress } = useScroll({
    target: copyRef,
    offset: ["start 88%", "end 32%"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [direction * 110, direction * 14, 0],
  );
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const imageReveal = useTransform(
    scrollYProgress,
    [0, 0.54, 1],
    direction < 0
      ? ["inset(0 100% 0 0)", "inset(0 0 0 0)", "inset(0 0 0 0)"]
      : ["inset(0 0 0 100%)", "inset(0 0 0 0)", "inset(0 0 0 0)"],
  );

  return (
    <motion.article
      ref={ref}
      style={{ x, y, scale }}
      className="timeline-entry"
    >
      <motion.div
        className="timeline-entry-image"
        style={{ clipPath: imageReveal }}
      >
        <img src={item.image} alt={item.alt} loading="lazy" />
      </motion.div>
      <div ref={copyRef} className="timeline-entry-copy">
        <p className="timeline-decade">
          <ScrollWords text={item.decade} progress={copyProgress} start={0} end={0.12} />
        </p>
        <h3>
          <ScrollWords text={item.title} progress={copyProgress} start={0.14} end={0.36} />
        </h3>
        <p className="timeline-description">
          <ScrollWords
            text={item.description}
            progress={copyProgress}
            start={0.38}
            end={1}
          />
        </p>
      </div>
    </motion.article>
  );
}

function ScrollWords({ text, progress, start, end }) {
  const words = text.split(/\s+/);

  return words.map((word, index) => {
    const wordStart = start + ((end - start) * index) / words.length;
    const wordEnd = start + ((end - start) * (index + 1)) / words.length;

    return (
      <ScrollWord
        key={`${word}-${index}`}
        word={word}
        progress={progress}
        start={wordStart}
        end={wordEnd}
      />
    );
  });
}

function ScrollWord({ word, progress, start, end }) {
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.span className="timeline-word" style={{ opacity }}>
      {word}
    </motion.span>
  );
}

export default function Home() {
  const threadStageRef = useRef(null);
  const heroRef = useRef(null);
  const line0Ref = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const scrollRef = useRef(null);

  const videoStageRef = useRef(null);
  const knockoutRef = useRef(null);
  const statsRef = useRef(null);
  const timelineRef = useRef(null);
  const videoRef = useRef(null);
  const [holding, setHolding] = useState(false);

  const { scrollYProgress: videoScrollYProgress } = useScroll({
    target: videoStageRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: knockoutProgress } = useScroll({
    target: knockoutRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: statsProgress } = useScroll({
    target: statsRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });

  const videoScale = useTransform(videoScrollYProgress, [0, 1], [1, 1.08]);
  const videoTextOpacity = useTransform(
    videoScrollYProgress,
    [0, 0.45],
    [1, 0],
  );
  const slitX = useTransform(knockoutProgress, [0.15, 0.85], ["38%", "62%"]);

  const handleHoldStart = () => {
    setHolding(true);
    if (videoRef.current) videoRef.current.playbackRate = 2.2;
  };

  const handleHoldEnd = () => {
    setHolding(false);
    if (videoRef.current) videoRef.current.playbackRate = 1;
  };

  return (
    <main className="bg-[#090909] text-white">
      <div ref={threadStageRef} className="thread-stage relative">
        <section ref={heroRef} className="thread-hero relative">
          {/* Layered SVG Hero Thread — stays entirely within the hero */}
          <HeroThread
            heroRef={heroRef}
            line0Ref={line0Ref}
            line1Ref={line1Ref}
            line2Ref={line2Ref}
            scrollRef={scrollRef}
          />

          <div className="thread-hero-content">
            <p className="thread-eyebrow">A brand authority house · India</p>

            <h1 className="thread-title">
              <span ref={line0Ref} className="hero-line">WE BUILD</span>
              <span ref={line1Ref} className="hero-line">BRAND AUTHORITY</span>
              <span ref={line2Ref} className="hero-line">THAT LEADS.</span>
            </h1>

            <div className="thread-hero-footer">
              <p>
                Strategy, identity and digital presence for businesses built to
                lead.
              </p>
              <a ref={scrollRef} className="thread-scroll" href="#our-story">
                Scroll to follow the thread <ArrowDown size={14} />
              </a>
            </div>
          </div>
          <p className="thread-hero-index">Positioning · Presence · Perception</p>
        </section>

        <section id="our-story" className="thread-intro">
          <div className="container">
            <p className="thread-intro-label">01 / Who we are</p>
            <div className="story-grid">
              <motion.h2
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="thread-intro-title"
              >
                YOUR LEGACY HAS A STORY.
                <br />
                <span>MAKE THE WORLD SEE IT.</span>
              </motion.h2>

              <motion.div
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="story-copy"
              >
                <p>
                  Some businesses have spent decades building something real:
                  experience, relationships, expertise and a reputation earned
                  through years of work.
                </p>
                <p className="mt-6">
                  We bring strategy, identity and digital presence together so
                  the world sees the full scale of what you have built.
                </p>
              </motion.div>
            </div>

            <div className="thread-principles">
              {[
                {
                  number: "01",
                  title: "History",
                  description: "What you have built through years of real work.",
                },
                {
                  number: "02",
                  title: "Recognition",
                  description: "How the market discovers and remembers you.",
                },
                {
                  number: "03",
                  title: "Authority",
                  description: "How your brand earns trust and leads forward.",
                },
              ].map((item) => (
                <div key={item.number} className="thread-principle">
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Keep the original showreel and scroll-over statement animation below the new hero. */}
      <div ref={videoStageRef} className="relative">
        <section
          onMouseDown={handleHoldStart}
          onMouseUp={handleHoldEnd}
          onMouseLeave={handleHoldEnd}
          onTouchStart={handleHoldStart}
          onTouchEnd={handleHoldEnd}
          className="sticky top-0 z-0 flex h-screen w-full cursor-pointer select-none items-center justify-center overflow-hidden bg-black"
        >
          <motion.video
            ref={videoRef}
            style={{ scale: holding ? 1.05 : videoScale }}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500"
          >
            <source src={LOCAL_VIDEO} type="video/mp4" />
            <source src={FALLBACK_VIDEO} type="video/mp4" />
          </motion.video>

          <div className="pointer-events-none absolute inset-0 bg-black/30" />

          <motion.div
            style={{ opacity: videoTextOpacity }}
            className="relative z-10 mx-auto max-w-4xl px-6 text-center"
          >
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[3px] text-[#ff3b12]">
              {holding ? "2.2X SHOWREEL" : "CLICK & HOLD"}
            </p>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.09, delayChildren: 0.15 },
                },
              }}
              className="flex flex-col items-center space-y-1.5 md:space-y-2"
            >
              {heroStatements.map((line) => (
                <motion.p
                  key={line}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  className="font-[Manrope] text-base font-bold leading-snug tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] sm:text-xl md:text-[23px]"
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>

          <div className="pointer-events-none absolute bottom-5 left-6 right-6 z-10 flex items-center justify-between text-[10px] font-bold uppercase tracking-[2.5px] text-white/80">
            <span className="flex items-center gap-1.5">
              SCROLL <ArrowDown size={11} />
            </span>
            <span>BRAND AUTHORITY HOUSE</span>
          </div>
        </section>

        <section ref={knockoutRef} className="relative z-20">
          <div className="relative overflow-hidden bg-white px-5 py-24 text-[#0c0c0c] shadow-[0_-25px_60px_rgba(0,0,0,0.45)] sm:px-10 md:py-32">
            <div className="container relative z-10 mx-auto">
              <p className="mb-8 text-[11px] font-bold uppercase tracking-[4px] text-[#ff3b12]">
                01 / Who We Are
              </p>
              <h2 className="knockout-heading font-[Manrope] text-[10vw] font-extrabold uppercase leading-[0.94] tracking-[-0.04em] md:text-[6.8vw]">
                <span className="block text-right">WE PROMOTE IS A</span>
                <span className="block text-right">STRATEGIC</span>
                <span className="block">BRAND AUTHORITY</span>
                <span className="block text-right">HOUSE</span>
                <span className="block">BUILT FOR LEADERS.</span>
              </h2>
            </div>

            <motion.div
              style={{ left: slitX }}
              className="pointer-events-none absolute top-0 bottom-0 z-20 hidden w-[90px] -translate-x-1/2 overflow-hidden border-x border-black/15 mix-blend-lighten md:block md:w-[130px]"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-screen max-w-none object-cover brightness-110 contrast-125"
              >
                <source src={LOCAL_VIDEO} type="video/mp4" />
                <source src={FALLBACK_VIDEO} type="video/mp4" />
              </video>
            </motion.div>
          </div>

          <div className="philosophy-section bg-[#F1EFE9] text-[#151515]">
            <div className="container">
              <div className="story-grid">
                <motion.h2
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="knockout-heading display-heading"
                >
                  HISTORY IS NOT THE SAME AS{" "}
                  <span className="serif">AUTHORITY.</span>
                </motion.h2>
                <motion.div
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="story-copy"
                >
                  <p>
                    Some businesses have spent decades building something real.
                    They have experience, relationships, expertise and a
                    reputation earned through years of work.
                  </p>
                  <p className="mt-6">
                    But the world often discovers a business through a search
                    result, a website, an article or a digital first
                    impression. And sometimes, that impression tells a much
                    smaller story than the business deserves.
                  </p>
                  <p className="mt-6 font-semibold text-[#171717]">
                    We believe your digital presence should reflect the true
                    scale of what you have built.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* =================================================================
          3. COMPANY SCALE
      ================================================================== */}
      <section
        ref={statsRef}
        className="section-padding relative z-20 bg-[#111111]"
      >
        <div className="container">
          <div className="eyebrow">02 / Our Execution</div>

          <div className="mt-12 grid grid-cols-2 gap-12 md:grid-cols-4">
            {[
              { value: "165+", label: "Ongoing regular clients" },
              { value: "4,500+", label: "One-time IT projects delivered" },
              { value: "5+", label: "Years of execution" },
              { value: "02", label: "Office locations in India" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={reveal}
                transition={{ delay: index * 0.12 }}
                className="border-t border-white/20 pt-7"
              >
                <h3 className="stat-number">
                  <AnimatedStat value={item.value} progress={statsProgress} />
                </h3>
                <p className="stat-label">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          4. BUSINESS THROUGH THE DECADES
      ================================================================== */}
      <section className="timeline-section relative z-20 text-[#151515]">
        <div className="container">
          <div className="timeline-intro">
            <div className="eyebrow">03 / A changing landscape</div>
            <h2 className="display-heading mt-8">
              BUSINESS, <span className="serif">DECADE BY DECADE.</span>
            </h2>
            <p>
              The world changes how it discovers businesses. A strong legacy
              keeps moving forward.
            </p>
          </div>

          <div ref={timelineRef} className="timeline-track">
            <div className="timeline-line" />
            <motion.div
              className="timeline-line-progress"
              style={{ scaleY: timelineProgress }}
            />
            <svg
              className="timeline-curve"
              viewBox="0 0 200 2400"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path className="timeline-curve-track" d={timelinePath} />
              <motion.path
                className="timeline-curve-progress"
                d={timelinePath}
                style={{ pathLength: timelineProgress }}
              />
            </svg>

            {businessTimeline.map((item, index) => {
              return (
                <div
                  key={item.decade}
                  className={`timeline-row ${
                    index % 2 === 0 ? "timeline-row-left" : "timeline-row-right"
                  }`}
                >
                  <TimelineCard item={item} index={index} />
                  <span className="timeline-marker" aria-hidden="true" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================================
          5. LEGACY
      ================================================================== */}
      <section className="section-padding relative z-20 bg-[#090909]">
        <div className="container">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={reveal}
            >
              <div className="eyebrow">04 / Built Over Generations</div>

              <h2 className="display-heading mt-10">
                YOUR LEGACY SHOULD NOT DISAPPEAR WHEN SOMEONE{" "}
                <span className="serif">SEARCHES YOUR NAME.</span>
              </h2>

              <p className="mt-8 max-w-lg text-sm leading-8 text-white/55">
                A business may have spent decades building its manufacturing
                capabilities, expertise, customer relationships and reputation.
                Its digital presence should tell that same story with clarity,
                confidence and consistency.
              </p>

              <p className="mt-6 text-sm font-medium text-[#ff3b12]">
                We don&apos;t replace your legacy. We make the world recognise
                it.
              </p>

              <Link to="/about" className="button-outline mt-10">
                Discover Our Philosophy
                <MoveUpRight size={15} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative h-[560px] overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1200&q=85"
                alt="Industrial manufacturing facility"
                className="image-cover grayscale"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              <div className="absolute bottom-8 left-8">
                <p className="text-[10px] uppercase tracking-[3px] text-[#ff3b12]">
                  Experience deserves recognition
                </p>
                <p className="mt-3 font-[Manrope] text-3xl">
                  Built to last.
                  <br />
                  Positioned to lead.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =================================================================
          6. SELECTED WORK
      ================================================================== */}
      <section className="section-padding relative z-20 bg-[#F1EFE9] text-[#151515]">
        <div className="container">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <div className="eyebrow">05 / Selected Work</div>
              <h2 className="display-heading mt-8">
                BUILT WITH
                <br />
                <span className="serif">INTENTION.</span>
              </h2>
            </div>

            <Link
              to="/work"
              className="button-outline !border-black/30 !text-black"
            >
              View All Projects
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={reveal}
                transition={{ delay: (index % 2) * 0.15 }}
              >
                <Link to={project.path} className="project-card">
                  <img src={project.image} alt={project.name} loading="lazy" />

                  <div className="project-info">
                    <h3>{project.name}</h3>
                    <p>{project.category}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          7. CAPABILITIES
      ================================================================== */}
      <section className="section-padding relative z-20 bg-[#090909]">
        <div className="container">
          <div className="grid gap-14 md:grid-cols-2">
            <div>
              <div className="eyebrow">06 / What We Build</div>

              <h2 className="display-heading mt-9">
                THE ARCHITECTURE OF{" "}
                <span className="serif">AUTHORITY.</span>
              </h2>

              <p className="mt-8 max-w-md text-sm leading-8 text-white/55">
                Authority is not built through a single activity. It is the
                outcome of multiple brand-building disciplines working
                together.
              </p>
            </div>

            <div>
              {capabilities.map((capability, index) => (
                <motion.div
                  key={capability}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={reveal}
                  className="capability-row"
                >
                  <span className="text-xs text-[#ff3b12]">
                    0{index + 1}
                  </span>
                  <h3>{capability}</h3>
                  <ArrowUpRight size={20} />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-20 border border-white/10 bg-[#111111] p-8 md:p-14">
            <div className="eyebrow">One business. One ecosystem.</div>

            <h3 className="mt-7 max-w-3xl font-[Manrope] text-3xl font-medium leading-tight tracking-tight md:text-5xl">
              Strategy creates direction. Identity creates recognition. Digital
              creates presence. Together, they build authority.
            </h3>
          </div>
        </div>
      </section>

      {/* =================================================================
          8. FINAL CTA
      ================================================================== */}
      <section className="relative z-20 overflow-hidden bg-[#ff3b12] py-28 text-[#111111]">
        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
          >
            <p className="text-xs font-semibold uppercase tracking-[3px]">
              07 / The Next Chapter
            </p>

            <h2 className="mt-9 max-w-5xl font-[Manrope] text-5xl font-medium leading-[1.05] tracking-[-0.07em] md:text-8xl">
              YOUR NEXT MARKET POSITION STARTS WITH A CONVERSATION.
            </h2>

            <Link
              to="/book-a-call"
              className="mt-12 inline-flex min-h-14 items-center gap-5 border border-black px-7 text-xs font-bold uppercase tracking-widest transition hover:bg-black hover:text-white"
            >
              Enter the Conversation
              <ArrowUpRight size={17} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}