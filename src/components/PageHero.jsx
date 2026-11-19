import { motion } from "framer-motion";

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
}) {
  return (
    <section className="relative flex min-h-[68vh] items-end overflow-hidden bg-[#090909] pb-16 pt-40 md:pb-24">

      {image && (
        <>
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/55 to-[#090909]/30" />
        </>
      )}

      <div className="container relative z-10">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="eyebrow"
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="display-heading mt-8 max-w-5xl"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-8 max-w-2xl text-sm leading-8 text-white/65 md:text-base"
          >
            {description}
          </motion.p>
        )}

      </div>
    </section>
  );
}