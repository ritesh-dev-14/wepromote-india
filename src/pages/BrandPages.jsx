import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import PageHero from "../components/PageHero";
import ProjectCard from "../components/ProjectCard";

const capabilities = [
  {
    number: "01",
    title: "Brand strategy & positioning",
    description:
      "Define what makes your business valuable, who it serves and the place it should occupy in the market.",
    services: ["Brand discovery", "Market positioning", "Messaging direction"],
  },
  {
    number: "02",
    title: "Identity & design systems",
    description:
      "Build a recognisable visual language that makes your positioning clear and consistent.",
    services: ["Visual identity", "Brand guidelines", "Creative direction"],
  },
  {
    number: "03",
    title: "Digital experiences",
    description:
      "Turn your website and digital touchpoints into useful, considered experiences for your audience.",
    services: ["Website design", "Development", "Digital content"],
  },
  {
    number: "04",
    title: "Public relations & media",
    description:
      "Shape thoughtful communications that help the right people notice and understand your work.",
    services: ["Media relations", "Brand stories", "Executive communication"],
  },
  {
    number: "05",
    title: "Search & discoverability",
    description:
      "Make it easier for customers and partners to find your business and understand its capabilities.",
    services: ["Search strategy", "Content structure", "Organic visibility"],
  },
  {
    number: "06",
    title: "Growth infrastructure",
    description:
      "Connect your brand, content and digital systems so each part supports sustainable growth.",
    services: ["Campaign planning", "Content systems", "Performance insights"],
  },
];

const mediaApproach = [
  {
    number: "01",
    title: "Find the story",
    description:
      "We get to know your business, expertise and perspective before deciding what deserves attention.",
  },
  {
    number: "02",
    title: "Shape the message",
    description:
      "We turn that understanding into clear, relevant communication for the audiences that matter.",
  },
  {
    number: "03",
    title: "Build recognition",
    description:
      "We support consistent visibility that contributes to credibility over time.",
  },
];

function PageCta({ eyebrow, title, action = "Start a Conversation", to = "/book-a-call" }) {
  return (
    <section className="section-padding bg-[#ff3b12] text-[#111]">
      <div className="container flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[3px]">{eyebrow}</p>
          <h2 className="mt-7 max-w-4xl font-[Manrope] text-4xl font-semibold leading-[1.05] tracking-[-0.07em] md:text-7xl">
            {title}
          </h2>
        </div>
        <Link
          to={to}
          className="inline-flex min-h-14 shrink-0 items-center gap-4 border border-[#111] px-6 text-[10px] font-bold uppercase tracking-[1.5px] transition hover:bg-[#111] hover:text-white"
        >
          {action}
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}

export function WorkPage() {
  return (
    <main>
      <PageHero
        eyebrow="WE PROMOTE / SELECTED WORK"
        title={
          <>
            BUILT WITH <span className="serif">INTENTION.</span>
          </>
        }
        description="A selection of brand, digital and communication work shaped around the businesses behind it."
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=85"
      />

      <section className="section-padding">
        <div className="container">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Selected partnerships</p>
              <h2 className="display-heading mt-7 max-w-3xl">
                DIFFERENT BUSINESSES.
                <br />
                <span className="serif">A CLEARER PRESENCE.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/55">
              Explore how thoughtful positioning and consistent digital
              experiences can help a business show up with greater clarity.
            </p>
          </div>

          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Have a project in mind?"
        title="LET'S MAKE YOUR NEXT CHAPTER COUNT."
      />
    </main>
  );
}

export function CapabilitiesPage() {
  return (
    <main>
      <PageHero
        eyebrow="WE PROMOTE / CAPABILITIES"
        title={
          <>
            THE ARCHITECTURE OF <span className="serif">AUTHORITY.</span>
          </>
        }
        description="The connected disciplines that help businesses communicate their value, build recognition and earn trust."
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85"
      />

      <section className="section-padding bg-[#f1efe9] text-[#151515]">
        <div className="container">
          <div className="grid gap-8 border-b border-black/15 pb-12 md:grid-cols-[0.8fr_1.2fr]">
            <p className="eyebrow !text-[#8b7049]">One connected approach</p>
            <p className="max-w-2xl text-lg leading-8 text-[#625e57]">
              Authority is not built by one deliverable. It grows when strategy,
              identity, communication and digital presence work together.
            </p>
          </div>

          <div>
            {capabilities.map((item, index) => (
              <motion.article
                key={item.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: (index % 2) * 0.08 }}
                className="grid gap-5 border-b border-black/15 py-9 md:grid-cols-[70px_0.85fr_1.15fr]"
              >
                <span className="text-xs font-semibold tracking-widest text-[#e5392a]">
                  {item.number}
                </span>
                <h2 className="font-[Manrope] text-2xl font-semibold leading-tight tracking-[-0.05em] md:text-3xl">
                  {item.title}
                </h2>
                <div>
                  <p className="max-w-xl text-sm leading-7 text-[#625e57]">
                    {item.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-semibold uppercase tracking-[1.2px] text-[#8b7049]">
                    {item.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Build your brand ecosystem"
        title="LET'S FIND THE RIGHT PLACE TO BEGIN."
      />
    </main>
  );
}

export function PublicRelationsPage() {
  return (
    <main>
      <PageHero
        eyebrow="WE PROMOTE / PUBLIC RELATIONS"
        title={
          <>
            BE SEEN IN THE <span className="serif">RIGHT ROOMS.</span>
          </>
        }
        description="Strategic communications and thoughtful media visibility to help your brand earn attention for the work it does."
        image="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2000&q=85"
      />

      <section className="section-padding bg-[#f1efe9] text-[#151515]">
        <div className="container grid gap-12 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow !text-[#8b7049]">More than a mention</p>
            <h2 className="display-heading mt-8">
              REPUTATION IS BUILT THROUGH{" "}
              <span className="serif">CONSISTENCY.</span>
            </h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-[#625e57]">
            <p>
              Public relations begins with understanding what makes a business
              worth listening to. The goal is not noise for its own sake, but
              clear communication that supports credibility.
            </p>
            <p>
              From finding a useful story to preparing a message for the right
              audience, each step should feel true to the business and relevant
              to the people it wants to reach.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <p className="eyebrow">Our approach</p>
          <h2 className="display-heading mt-8 max-w-4xl">
            CLEAR STORY. <span className="serif">CONSIDERED VISIBILITY.</span>
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {mediaApproach.map((item) => (
              <article
                key={item.number}
                className="border-t border-white/20 pt-6"
              >
                <span className="text-xs text-[#ff3b12]">{item.number}</span>
                <h3 className="mt-6 font-[Manrope] text-2xl font-medium tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/55">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Start with the story"
        title="LET'S GIVE YOUR WORK THE RIGHT VOICE."
      />
    </main>
  );
}

export function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="WE PROMOTE / CONTACT"
        title={
          <>
            EVERY GOOD THING STARTS WITH A{" "}
            <span className="serif">CONVERSATION.</span>
          </>
        }
        description="Tell us what you are building, where you want to go and what you need the world to understand about your business."
      />

      <section className="section-padding bg-[#f1efe9] text-[#151515]">
        <div className="container grid gap-14 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow !text-[#8b7049]">Get in touch</p>
            <h2 className="display-heading mt-8">
              LET'S START <span className="serif">SOMETHING.</span>
            </h2>
            <div className="mt-10 space-y-6">
              <a
                href="mailto:info@wepromoteindia.com"
                className="flex items-center gap-4 text-sm transition hover:text-[#e5392a]"
              >
                <Mail size={18} />
                info@wepromoteindia.com
              </a>
              <a
                href="tel:+917009404727"
                className="flex items-center gap-4 text-sm transition hover:text-[#e5392a]"
              >
                <Phone size={18} />
                +91 7009404727
              </a>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {["Mohali", "New Delhi"].map((city) => (
              <article key={city} className="border border-black/15 p-7 md:p-9">
                <MapPin className="text-[#e5392a]" size={20} />
                <h3 className="mt-7 font-[Manrope] text-2xl font-semibold tracking-tight">
                  {city}
                </h3>
                <p className="mt-3 text-sm text-[#68635c]">India</p>
              </article>
            ))}
            <div className="flex items-center gap-4 border border-black/15 p-7 text-sm leading-7 text-[#625e57] sm:col-span-2 md:p-9">
              <Globe2 className="shrink-0 text-[#e5392a]" size={20} />
              Working with ambitious businesses across India.
            </div>
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Have a little more to share?"
        title="TELL US WHERE YOU WANT YOUR BRAND TO GO."
        action="Book a Call"
      />
    </main>
  );
}

function sendInquiry(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const subject = `Project enquiry from ${formData.get("name")}`;
  const body = [
    `Name: ${formData.get("name")}`,
    `Email: ${formData.get("email")}`,
    `Company: ${formData.get("company") || "Not provided"}`,
    "",
    "What would you like to discuss?",
    formData.get("message"),
  ].join("\n");

  window.location.href = `mailto:info@wepromoteindia.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function BookCallPage() {
  return (
    <main>
      <PageHero
        eyebrow="WE PROMOTE / START A CONVERSATION"
        title={
          <>
            LET'S TALK ABOUT YOUR NEXT{" "}
            <span className="serif">MARKET POSITION.</span>
          </>
        }
        description="Share a little about your business and what you want to achieve. We’ll take it from there."
      />

      <section className="section-padding bg-[#f1efe9] text-[#151515]">
        <div className="container grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow !text-[#8b7049]">A good place to begin</p>
            <h2 className="display-heading mt-8">
              WHAT ARE YOU{" "}
              <span className="serif">WORKING TOWARDS?</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#625e57]">
              This form opens a prefilled email in your mail app, so you can
              review your message before sending it to our team.
            </p>
            <a
              href="tel:+917009404727"
              className="mt-8 inline-flex items-center gap-3 text-sm text-[#625e57] transition hover:text-[#e5392a]"
            >
              <Phone size={16} />
              Prefer to call? +91 7009404727
            </a>
          </div>

          <form onSubmit={sendInquiry} className="grid gap-6">
            <label className="grid gap-2 text-xs font-semibold uppercase tracking-[1.3px]">
              Your name
              <input
                required
                name="name"
                autoComplete="name"
                className="min-h-12 border-b border-black/25 bg-transparent px-1 text-base font-normal normal-case tracking-normal outline-none transition focus:border-[#e5392a]"
              />
            </label>
            <label className="grid gap-2 text-xs font-semibold uppercase tracking-[1.3px]">
              Email address
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                className="min-h-12 border-b border-black/25 bg-transparent px-1 text-base font-normal normal-case tracking-normal outline-none transition focus:border-[#e5392a]"
              />
            </label>
            <label className="grid gap-2 text-xs font-semibold uppercase tracking-[1.3px]">
              Company <span className="font-normal normal-case tracking-normal">(optional)</span>
              <input
                name="company"
                autoComplete="organization"
                className="min-h-12 border-b border-black/25 bg-transparent px-1 text-base font-normal normal-case tracking-normal outline-none transition focus:border-[#e5392a]"
              />
            </label>
            <label className="grid gap-2 text-xs font-semibold uppercase tracking-[1.3px]">
              What would you like to discuss?
              <textarea
                required
                name="message"
                rows="4"
                className="resize-y border-b border-black/25 bg-transparent px-1 py-3 text-base font-normal normal-case tracking-normal outline-none transition focus:border-[#e5392a]"
              />
            </label>
            <button type="submit" className="button-primary mt-3 justify-self-start">
              Prepare email
              <Send size={15} />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <NotFoundPage />;
  }

  return (
    <main>
      <PageHero
        eyebrow={`WE PROMOTE / WORK / ${project.name}`}
        title={project.name}
        description={project.category}
        image={project.image}
      />

      <section className="section-padding bg-[#f1efe9] text-[#151515]">
        <div className="container grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
          <p className="eyebrow !text-[#8b7049]">The project</p>
          <div>
            <p className="text-xl leading-9 text-[#625e57]">{project.short}</p>
            <div className="mt-12 grid gap-10 border-t border-black/15 pt-8 md:grid-cols-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#e5392a]">
                  The challenge
                </p>
                <p className="mt-4 text-sm leading-7 text-[#625e57]">
                  {project.challenge}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#e5392a]">
                  The transformation
                </p>
                <p className="mt-4 text-sm leading-7 text-[#625e57]">
                  {project.transformation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
          <p className="eyebrow">How we approached it</p>
          <ol className="divide-y divide-white/15 border-y border-white/15">
            {project.approach.map((step, index) => (
              <li key={step} className="grid gap-4 py-6 sm:grid-cols-[48px_1fr]">
                <span className="text-xs text-[#ff3b12]">
                  0{index + 1}
                </span>
                <p className="text-sm leading-7 text-white/70">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="container pb-16">
        <Link
          to="/work"
          className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[1.5px] text-white/65 transition hover:text-[#ff3b12]"
        >
          <ArrowUpRight className="rotate-[-135deg]" size={15} />
          Back to all work
        </Link>
      </div>
      <PageCta eyebrow="Have a similar challenge?" title="LET'S TALK ABOUT WHAT'S NEXT." />
    </main>
  );
}

export function NotFoundPage() {
  return (
    <main className="min-h-[70vh] bg-[#090909] pt-40">
      <div className="container section-padding">
        <p className="eyebrow">404 / Page not found</p>
        <h1 className="display-heading mt-8 max-w-4xl">
          THIS PAGE HAS MOVED ON.{" "}
          <span className="serif">LET'S GET YOU BACK.</span>
        </h1>
        <Link to="/" className="button-primary mt-10">
          Back to Home
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </main>
  );
}
