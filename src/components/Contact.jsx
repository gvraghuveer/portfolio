import { useState } from "react";
import { Mail, Copy, Check, Send, Loader2, AlertCircle, ExternalLink } from "lucide-react";
import { Github, Linkedin } from "./Icons";
import { Section } from "./Section";
import { profile } from "../data/profile";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.social.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/gvraghuveer07@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Message from ${formData.name}`,
          _template: "table",
        }),
      });

      const data = await response.json();

      if (response.ok && (data.success === "true" || data.success === true)) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to deliver message");
      }
    } catch (err) {
      console.warn("Contact form submit error:", err);
      setStatus("error");
      setErrorMessage(
        "Could not send automatically (network/adblocker). Please click below to send via your email client."
      );
    }
  };

  return (
    <Section id="contact" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
          Connect & Collaboration
        </h2>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-emerald-500 font-medium">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Available for Internships
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Direct Info */}
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Let's build something extraordinary together.
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            I am currently open to full-stack web development projects, summer internships, software collaborations, and frontend architecture challenges.
          </p>

          <div className="space-y-2 pt-2">
            {/* Copy Email Button */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
              <div className="flex items-center gap-2 overflow-hidden">
                <Mail className="size-4 text-neutral-400 shrink-0" />
                <span className="font-mono text-xs text-neutral-800 dark:text-neutral-200 truncate">
                  {profile.social.email}
                </span>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="size-3 text-emerald-500" />
                    <span className="text-emerald-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-medium text-neutral-800 dark:text-neutral-200 transition-colors"
              >
                <Github className="size-4" />
                <span>GitHub</span>
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-medium text-neutral-800 dark:text-neutral-200 transition-colors"
              >
                <Linkedin className="size-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Contact Form */}
        <div className="p-4 sm:p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 backdrop-blur-md">
          {status === "success" ? (
            <div className="py-8 px-4 flex flex-col items-center justify-center text-center space-y-3">
              <div className="size-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                <Check className="size-6" />
              </div>
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                Message Sent Successfully!
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-xs leading-relaxed">
                Thank you for reaching out. Your inquiry was delivered directly to Raghuveer's inbox.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-2 text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
              >
                Send another message →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  disabled={status === "submitting"}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/70 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:focus:ring-cyan-400 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  disabled={status === "submitting"}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/70 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:focus:ring-cyan-400 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                  Message
                </label>
                <textarea
                  rows={3}
                  required
                  disabled={status === "submitting"}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hello Raghuveer, I would like to discuss..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/70 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:focus:ring-cyan-400 resize-none disabled:opacity-50"
                />
              </div>

              {status === "error" && (
                <div className="p-3 rounded-lg border border-rose-500/20 bg-rose-500/[0.08] text-rose-500 text-[11px] space-y-2">
                  <div className="flex items-center gap-1.5 font-medium">
                    <AlertCircle className="size-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                  <a
                    href={`mailto:${profile.social.email}?subject=${encodeURIComponent(
                      `Portfolio Inquiry from ${formData.name || "Visitor"}`
                    )}&body=${encodeURIComponent(formData.message || "")}`}
                    className="inline-flex items-center gap-1 font-semibold text-rose-600 dark:text-rose-400 underline underline-offset-2"
                  >
                    Open in default mail client <ExternalLink className="size-3" />
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    <span>Sending Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="size-3.5" />
                    <span>Send Direct Inquiry</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
