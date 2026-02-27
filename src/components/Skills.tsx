import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LayoutTemplate, Server, Database, Cloud, Code2 } from 'lucide-react';
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss3,
  SiNodedotjs, SiExpress, SiFastapi, SiPython,
  SiMongodb, SiSupabase, SiMysql, SiFirebase,
  SiVercel, SiNetlify, SiCloudflare, SiHeroku,
  SiCplusplus, SiC, SiNumpy, SiPandas, SiScikitlearn
} from 'react-icons/si';

const skillCategories = [
  {
    title: 'Frontend',
    icon: <LayoutTemplate className="w-6 h-6 text-[#00FF94]" />,
    skills: [
      { name: 'React', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'HTML5', icon: SiHtml5 },
      { name: 'CSS3', icon: SiCss3 }
    ]
  },
  {
    title: 'Backend',
    icon: <Server className="w-6 h-6 text-[#00FF94]" />,
    skills: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Express.js', icon: SiExpress },
      { name: 'FastAPI', icon: SiFastapi },
      { name: 'Python', icon: SiPython }
    ]
  },
  {
    title: 'Database',
    icon: <Database className="w-6 h-6 text-[#00FF94]" />,
    skills: [
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'Supabase', icon: SiSupabase },
      { name: 'MySQL', icon: SiMysql },
      { name: 'Firebase', icon: SiFirebase }
    ]
  },
  {
    title: 'DevOps & Cloud',
    icon: <Cloud className="w-6 h-6 text-[#00FF94]" />,
    skills: [
      { name: 'Vercel', icon: SiVercel },
      { name: 'Netlify', icon: SiNetlify },
      { name: 'Cloudflare', icon: SiCloudflare },
      { name: 'Heroku', icon: SiHeroku }
    ]
  },
  {
    title: 'Languages',
    icon: <Code2 className="w-6 h-6 text-[#00FF94]" />,
    skills: [
      { name: 'C++', icon: SiCplusplus },
      { name: 'C', icon: SiC },
    ]
  },
  {
    title: 'Libraries',
    icon: <Code2 className="w-6 h-6 text-[#00FF94]" />,
    skills: [
      { name: 'NumPy', icon: SiNumpy },
      { name: 'Pandas', icon: SiPandas },
      { name: 'Scikit-learn', icon: SiScikitlearn }
    ]
  }
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-24 md:py-32 px-6 md:px-12 w-full max-w-[1100px] mx-auto"
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-black tracking-tight text-white mix-blend-difference mb-10"
        >
          What I Work With
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
              className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#00FF94]/30 hover:shadow-[0_0_30px_rgba(0,255,148,0.05)] transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-[#00FF94]/30 transition-colors">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-mono font-medium text-white/70 bg-black/40 border border-white/10 rounded-lg 
                             cursor-default transition-all duration-300 
                             group-hover:hover:text-[#00FF94] group-hover:hover:border-[#00FF94]/50 group-hover:hover:bg-[#00FF94]/5"
                  >
                    <skill.icon className="w-3.5 h-3.5" />
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
