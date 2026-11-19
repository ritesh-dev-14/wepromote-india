import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function InnerPage({ title, subtitle }) {
  return (
    <main className="min-h-screen bg-[#090909] pt-40">
      <div className="container section-padding">
        <Link
          to="/"
          className="mb-14 inline-flex items-center gap-3 text-xs uppercase tracking-widest text-white/50 hover:text-[#B39A72]"
        >
          <ArrowLeft size={15} />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="eyebrow">WE PROMOTE USA / Explore</div>

          <h1 className="display-heading mt-10 max-w-5xl">
            {title}
          </h1>

          <p className="mt-9 max-w-2xl text-base leading-8 text-white/55">
            {subtitle}
          </p>

          <Link to="/book-a-call" className="button-primary mt-12">
            Start a Conversation
            <ArrowUpRight size={15} />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}