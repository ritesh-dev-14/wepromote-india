import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";

const principles = [
  {
    number: "01",
    title: "Clarity Before Activity",
    description:
      "A strong brand begins with understanding what it stands for, who it serves and how it should be recognised.",
  },
  {
    number: "02",
    title: "Consistency Creates Recognition",
    description:
      "Every meaningful touchpoint should contribute to one coherent impression, from identity and website to communication and visibility.",
  },
  {
    number: "03",
    title: "Presence Should Reflect Reality",
    description:
      "A business's digital presence should communicate the quality, experience and capability that exist behind its name.",
  },
];

export default function About() {
  return (
    <main>

      <PageHero
        eyebrow="WE PROMOTE USA / ABOUT"
        title={
          <>
            WE BELIEVE LEGACY DESERVES{" "}
            <span className="serif">AUTHORITY.</span>
          </>
        }
        description="We bring strategy, identity, digital experiences and communication together to help businesses express their real value with clarity and confidence."
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"
      />

      {/* OUR PHILOSOPHY */}

      <section className="section-padding bg-[#F1EFE9] text-[#151515]">

        <div className="container grid gap-12 md:grid-cols-[0.8fr_1.2fr]">

          <p className="eyebrow">OUR POINT OF VIEW</p>

          <div>

            <h2 className="display-heading">
              A BUSINESS IS MORE THAN ITS{" "}
              <span className="serif">FIRST IMPRESSION.</span>
            </h2>

            <p className="mt-8 max-w-2xl text-base leading-8 text-[#625e57]">
              Behind a business name are years of decisions, relationships,
              expertise, products and work.
            </p>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#625e57]">
              Yet people often encounter a brand through a search, a website
              or a single piece of communication. We believe those first
              encounters should tell a truer, fuller story.
            </p>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#625e57]">
              WE PROMOTE is a Brand Authority House focused on connecting
              the way a business operates with the way the world discovers
              and understands it.
            </p>

          </div>

        </div>

      </section>

      {/* PRINCIPLES */}

      <section className="section-padding">

        <div className="container">

          <p className="eyebrow">WHAT GUIDES US</p>

          <h2 className="display-heading mt-8 max-w-4xl">
            THE PRINCIPLES BEHIND THE{" "}
            <span className="serif">WORK.</span>
          </h2>

          <div className="mt-16">

            {principles.map((item, index) => (

              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="grid gap-5 border-t border-white/15 py-9 md:grid-cols-[80px_0.8fr_1fr]"
              >

                <span className="text-xs text-[#ff3b12]">
                  {item.number}
                </span>

                <h3 className="text-2xl font-medium">
                  {item.title}
                </h3>

                <p className="max-w-xl text-sm leading-7 text-white/55">
                  {item.description}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* COMPANY SCALE */}

      <section className="section-padding bg-[#151515]">

        <div className="container grid gap-12 md:grid-cols-2">

          <div>
            <p className="eyebrow">OUR EXECUTION</p>

            <h2 className="display-heading mt-8">
              BUILT THROUGH{" "}
              <span className="serif">EXECUTION.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-8">

            {[
              ["165+", "Ongoing regular clients"],
              ["4,500+", "One-time IT projects delivered"],
              ["5+", "Years of execution"],
              ["02", "Office locations in India"],
            ].map(([number, label]) => (

              <div key={label}>

                <p className="stat-number">{number}</p>

                <p className="stat-label">{label}</p>

              </div>

            ))}

          </div>

        </div>

        <div className="container mt-14 text-xs leading-6 text-white/40">
          The long-standing legacy discussed here refers to client
          businesses, not the founding age of WE PROMOTE.
        </div>

      </section>

      {/* CTA */}

      <section className="section-padding">

        <div className="container flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">

          <h2 className="display-heading max-w-3xl">
            LET'S BUILD WHAT YOUR BUSINESS{" "}
            <span className="serif">DESERVES.</span>
          </h2>

          <Link to="/book-a-call" className="button-primary">
            Start a Conversation
            <ArrowUpRight size={16} />
          </Link>

        </div>

      </section>

    </main>
  );
}