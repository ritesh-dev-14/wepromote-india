import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.12 }}
    >
      <Link
        to={`/work/${project.slug}`}
        className="group block"
      >
        <div className="project-card">

          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
          />

          <div className="project-info">

            <p>{project.category}</p>

            <h3 className="mt-2 flex items-center justify-between gap-4">
              {project.name}

              <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </h3>

          </div>
        </div>

        <p className="mt-4 max-w-lg text-sm leading-7 text-white/55">
          {project.short}
        </p>

      </Link>
    </motion.article>
  );
}