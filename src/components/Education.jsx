import { GraduationCap, BookOpen, Award, CheckCircle2 } from "lucide-react";
import { profile } from "../data/profile";

export function Education() {
  const { academics } = profile;

  return (
    <section className="py-16 border-b border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="space-y-2 mb-8">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            // ACADEMIC FOUNDATION
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F4F4F5]">
            Education &amp; Curriculum
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main University Card */}
          <div className="lg:col-span-8 p-6 rounded-xl bg-[#0D0D12] border border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#F4F4F5]">
                    {academics.university}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-cyan-300">
                    {academics.program}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:items-end">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-white/5 text-[#F4F4F5] border border-white/10">
                  {academics.duration}
                </span>
                <span className="text-[11px] text-[#71717A] mt-1">Undergraduate Student</span>
              </div>
            </div>

            {/* University Curriculum & Coursework */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>University Curriculum Focus</span>
              </div>
              <p className="text-xs text-[#71717A] leading-relaxed">
                Academic subjects covered as part of the core computer science coursework at REVA University:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {academics.curriculum.map((subject) => (
                  <span
                    key={subject}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 border border-white/5 text-xs text-[#D4D4D8]"
                  >
                    <CheckCircle2 className="w-3 h-3 text-cyan-400/80" />
                    <span>{subject}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-black/30 border border-white/5 text-[11px] text-[#71717A] leading-relaxed">
              <span className="text-cyan-400 font-semibold font-mono mr-1">Note:</span>
              Technologies such as AWS, Docker, YOLOv8, and advanced React development are part of ongoing self-driven project engineering outside formal lecture halls.
            </div>
          </div>

          {/* Academic Background Card */}
          <div className="lg:col-span-4 p-6 rounded-xl bg-[#0D0D12] border border-white/10 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                <span>Pre-University Background</span>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-sm text-[#F4F4F5]">
                  {academics.priorEducation.degree}
                </h4>
                <p className="text-xs text-[#A1A1AA]">
                  {academics.priorEducation.board}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-black/40 border border-white/5">
                <div className="text-[10px] text-[#71717A] uppercase font-mono">Academic Score</div>
                <div className="text-2xl font-bold font-mono text-cyan-300 mt-0.5">
                  ~{academics.priorEducation.score}
                </div>
                <div className="text-[11px] text-[#71717A] mt-1">
                  Completed senior secondary schooling prior to enrolling in B.Tech CSE.
                </div>
              </div>
            </div>

            <div className="text-[11px] text-[#52525B] font-mono">
              Bengaluru, Karnataka • Active Engineering Enrolment
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
