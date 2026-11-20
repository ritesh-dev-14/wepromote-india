import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container section-padding">
        <div className="grid gap-14 md:grid-cols-2">
          <div>
            <p className="eyebrow">The next chapter starts here</p>

            <h2 className="mt-7 font-[Manrope] text-5xl font-medium leading-tight tracking-[-0.07em] md:text-7xl">
              LET'S BUILD
              <br />
              <span className="serif">Authority.</span>
            </h2>

            <Link to="/book-a-call" className="button-primary mt-9">
              Enter the Conversation
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="eyebrow mb-7">Explore</p>
              {[
                ["About", "/about"],
                ["Our Work", "/work"],
                ["Capabilities", "/capabilities"],
                ["Public Relations", "/public-relations"],
                ["Contact", "/contact"],
              ].map(([name, path]) => (
                <Link
                  key={path}
                  to={path}
                  className="mb-5 block text-sm text-white/60 transition hover:text-[#ff3b12]"
                >
                  {name}
                </Link>
              ))}
            </div>

            <div>
              <p className="eyebrow mb-7">Contact</p>

              <a
                href="mailto:info@wepromoteindia.com"
                className="mb-5 block text-sm text-white/60 hover:text-[#ff3b12]"
              >
                info@wepromoteindia.com
              </a>

              <a
                href="tel:+917009404727"
                className="mb-5 block text-sm text-white/60 hover:text-[#ff3b12]"
              >
                +91 7009404727
              </a>

              <p className="text-sm leading-7 text-white/50">
                Mohali
                <br />
                New Delhi
                <br />
                India
              </p>

              <div className="mt-7 flex gap-4">
                <a href="#" aria-label="Instagram" className="hover:text-[#ff3b12]">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:text-[#ff3b12]">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <circle cx="6" cy="7" r="1.5" />
                    <path d="M4.75 10h2.5v9h-2.5zM10 10h2.4v1.2c.5-.8 1.4-1.4 2.8-1.4 2.7 0 3.8 1.6 3.8 4.5V19h-2.6v-4.2c0-1.5-.3-2.4-1.8-2.4s-2 1.1-2 2.4V19H10z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="line my-14" />

        <div className="flex flex-col justify-between gap-5 text-xs text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} WE PROMOTE USA. All rights reserved.</p>
          <p>Strategy. Identity. Presence. Authority.</p>
        </div>
      </div>
    </footer>
  );
}