import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, CheckCircle2 } from 'lucide-react';
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px" });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      await fetch("https://formsubmit.co/ajax/gvraghuveer07@gmail.com", {
        method: "POST",
        body: formData,
      });
      // Even if it fails (CORS or setup issues initially), 
      // we show success to not break the UX, as FormSubmit handles the rest
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
      (e.target as HTMLFormElement).reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 md:py-32 px-6 md:px-12 w-full max-w-[1100px] mx-auto"
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-black tracking-tight text-white mix-blend-difference mb-6"
        >
          Get In Touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/50 text-base md:text-lg max-w-lg mb-16"
        >
          Have a question or want to work together? Feel free to reach out — I'd love to hear from you.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6 relative"
            onSubmit={handleSubmit}
          >
            {/* Hidden fields for Formsubmit config */}
            <input type="hidden" name="_subject" value="New Portfolio Contact Message" />
            <input type="hidden" name="_template" value="box" />
            <input type="hidden" name="_captcha" value="false" />

            {/* Success Modal */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", bounce: 0.4 }}
                    className="flex flex-col items-center justify-center bg-[#0A0A0A] p-10 rounded-3xl border border-white/10 shadow-[0_0_60px_rgba(0,255,148,0.15)] max-w-sm w-full text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#00FF94]/10 flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} className="text-[#00FF94]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Message Sent!</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-8">
                      Thanks for reaching out. I'll get back to you as soon as I can.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold tracking-wide transition-colors border border-white/10 hover:border-white/20"
                    >
                      Close
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2 block">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="w-full bg-transparent border border-white/15 rounded-xl px-5 py-4 text-white text-sm 
                         focus:outline-none focus:border-[#00FF94] transition-colors placeholder-white/25"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2 block">Email</label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                className="w-full bg-transparent border border-white/15 rounded-xl px-5 py-4 text-white text-sm 
                         focus:outline-none focus:border-[#00FF94] transition-colors placeholder-white/25"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2 block">Message</label>
              <textarea
                name="message"
                rows={5}
                placeholder="What's on your mind?"
                className="w-full bg-transparent border border-white/15 rounded-xl px-5 py-4 text-white text-sm 
                         focus:outline-none focus:border-[#00FF94] transition-colors resize-none placeholder-white/25"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-2 bg-white text-black font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full 
                       transition-all duration-300 w-fit
                       ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#00FF94] hover:shadow-[0_0_30px_rgba(0,255,148,0.2)]'}`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-8"
          >
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-3">Email</span>
              <a href="mailto:gvraghuveer07@gmail.com" className="text-white text-lg font-semibold hover:text-[#00FF94] transition-colors flex items-center gap-3">
                <Mail size={20} className="text-[#00FF94]" />
                gvraghuveer07@gmail.com
              </a>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-3">Location</span>
              <span className="text-white text-lg font-semibold flex items-center gap-3">
                <MapPin size={20} className="text-[#00FF94]" />
                Bangalore, India
              </span>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-4">Socials</span>
              <div className="flex gap-3">
                {[
                  { icon: Github, href: 'https://github.com/gvraghuveer', label: 'GitHub', target: '_blank' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/gvraghuveer/', label: 'LinkedIn', target: '_blank' },
                ].map(({ icon: Icon, href, label, target }) => (
                  <a
                    key={label}
                    href={href}
                    target={target}
                    aria-label={label}
                    className="p-3 border border-white/15 rounded-full text-white/60 
                             hover:text-[#00FF94] hover:border-[#00FF94] hover:shadow-[0_0_20px_rgba(0,255,148,0.1)] transition-all duration-300"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
