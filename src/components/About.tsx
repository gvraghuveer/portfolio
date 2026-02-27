import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const paragraphs = [
  "I'm Raghuveer — not a pro, just someone who genuinely enjoys tinkering with code and seeing what sticks. I love experimenting with new frameworks, breaking things apart to understand them, and learning something new every single day.",
  "Most of what I know comes from building random projects, watching way too many tutorials, and a lot of trial and error. I don't have all the answers, but I'm always excited to figure things out along the way.",
  "Right now I'm pursuing my B.Tech in Computer Science at Reva University, Bangalore. This portfolio is basically a playground — a place where I dump everything I'm learning and experimenting with."
];

function FadeInParagraph({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px" });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay, ease: [0.33, 1, 0.68, 1] }}
      className="text-base md:text-lg leading-relaxed text-white/70"
    >
      {text}
    </motion.p>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10% 0px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-12 w-full max-w-[1100px] mx-auto"
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
        {/* Section Label */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-black tracking-tight text-white mix-blend-difference mb-16"
        >
          About Me
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          {/* Left: Big statement */}
          <div className="md:w-2/5 shrink-0">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl lg:text-4xl font-black leading-tight tracking-tight text-white mix-blend-difference"
            >
              Still figuring it out — and loving every bit of it.
            </motion.h2>

            {/* Stats */}
          </div>

          {/* Right: Paragraphs */}
          <div className="md:w-3/5 flex flex-col gap-6">
            {paragraphs.map((p, i) => (
              <FadeInParagraph key={i} text={p} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
