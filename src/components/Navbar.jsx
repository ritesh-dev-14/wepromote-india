// import { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";
// import { Menu, X, ArrowUpRight } from "lucide-react";

// const links = [
//   { name: "Home", path: "/" },
//   { name: "About", path: "/about" },
//   { name: "Our Work", path: "/work" },
//   { name: "Capabilities", path: "/capabilities" },
//   { name: "Public Relations", path: "/public-relations" },
// ];

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
//       <div className="container flex h-20 items-center justify-between">
//         <Link to="/" onClick={() => setMenuOpen(false)}>
//           <img
//             src="/images/logo.png"
//             alt="We Promote"
//             className="dark-logo w-44 object-contain md:w-52"
//           />
//         </Link>

//         <nav className="hidden items-center gap-8 lg:flex">
//           {links.map((link) => (
//             <NavLink
//               key={link.path}
//               to={link.path}
//               className={({ isActive }) =>
//                 `nav-link ${isActive ? "active" : ""}`
//               }
//             >
//               {link.name}
//             </NavLink>
//           ))}
//         </nav>

//         <Link
//           to="/book-a-call"
//           className="hidden items-center gap-3 border border-[#ff3b12] px-5 py-3 text-[10px] uppercase tracking-[1.5px] text-[#ff3b12] transition hover:bg-[#ff3b12] hover:text-black lg:flex"
//         >
//           Start a Conversation
//           <ArrowUpRight size={14} />
//         </Link>

//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="text-white lg:hidden"
//           aria-label="Toggle navigation"
//           aria-expanded={menuOpen}
//         >
//           {menuOpen ? <X size={25} /> : <Menu size={25} />}
//         </button>
//       </div>

//       <AnimatePresence>
//         {menuOpen && (
//           <motion.nav
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="overflow-hidden border-t border-white/10 bg-[#090909] lg:hidden"
//           >
//             <div className="container flex flex-col py-8">
//               {links.map((link, index) => (
//                 <motion.div
//                   key={link.path}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.07 }}
//                 >
//                   <NavLink
//                     to={link.path}
//                     onClick={() => setMenuOpen(false)}
//                     className="block border-b border-white/10 py-5 font-[Manrope] text-2xl"
//                   >
//                     {link.name}
//                   </NavLink>
//                 </motion.div>
//               ))}

//               <Link
//                 to="/book-a-call"
//                 onClick={() => setMenuOpen(false)}
//                 className="button-primary mt-7"
//               >
//                 Start a Conversation
//                 <ArrowUpRight size={15} />
//               </Link>
//             </div>
//           </motion.nav>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }




import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Our Work", path: "/work" },
  { name: "Capabilities", path: "/capabilities" },
  { name: "Public Relations", path: "/public-relations" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-transparent bg-transparent">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img
            src="/images/logo.png"
            alt="We Promote"
            className="dark-logo w-44 object-contain md:w-52"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            to="/"
            className="nav-meta-link"
            aria-label="Select English language"
          >
            <span>[</span> ENG <span>]</span>
          </Link>
          <Link to="/contact" className="nav-meta-link">
            <span>[</span> Contact <span>]</span>
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-[#090909] lg:hidden"
          >
            <div className="container flex flex-col py-8">
              {links.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.07 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-white/10 py-5 font-[Manrope] text-2xl"
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}

              <Link
                to="/book-a-call"
                onClick={() => setMenuOpen(false)}
                className="button-primary mt-7"
              >
                Start a Conversation
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}