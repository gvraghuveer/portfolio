import { Mail, ArrowUp } from "lucide-react";
import { Github, Linkedin } from "./Icons";
import { profile } from "../data/profile";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-neutral-200/80 dark:border-white/10 bg-white/70 dark:bg-[#07070a]/90 backdrop-blur-2xl pt-6 pb-24 text-xs text-neutral-600 dark:text-[#71717A] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-neutral-200/80 dark:border-white/5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-neutral-900 dark:text-[#F4F4F5]">{profile.name}</span>
              <span className="font-mono text-cyan-600 dark:text-cyan-400">(@{profile.handle})</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-[#A1A1AA]">
              {profile.currentYear} CSE @ {profile.university} ({profile.period})
            </p>
            <p className="text-[11px] text-neutral-500 dark:text-[#71717A]">
              AI • Software Engineering • Cloud • Research • IoT
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${profile.social.email}`}
              className="text-neutral-600 dark:text-neutral-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full glass-card hover:border-cyan-500/40 text-neutral-600 dark:text-[#A1A1AA] hover:text-neutral-900 dark:hover:text-[#F4F4F5] transition-colors cursor-pointer ml-2"
              title="Return to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="text-neutral-400 dark:text-[#52525B]">raghuveer@reva:~$</span>
            <span className="text-cyan-600 dark:text-cyan-400">npm run dev:portfolio</span>
            <span className="text-emerald-500 dark:text-emerald-400">● 200 OK</span>
          </div>
          <div>
            &copy; {new Date().getFullYear()} {profile.name}. Crafted with React 19, Vite &amp; Tailwind CSS.
          </div>
        </div>
      </div>
    </footer>
  );
}
