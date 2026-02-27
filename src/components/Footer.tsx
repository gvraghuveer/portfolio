import { Github, Linkedin, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, FormEvent } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-5% 0px" });

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
    <footer id="contact" ref={ref} className="relative w-full px-6 md:px-12 pt-8 pb-8 max-w-[1100px] mx-auto">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">

        {/* Contact Form & Info Section */}
        <div className="px-8 md:px-12 pt-12 pb-10 border-b border-white/8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center md:text-left"
          >
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#00FF94] mb-3">Get in touch</p>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Let's build<br />something together.
            </h3>
          </motion.div>

          {/* Form and info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-5 relative"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="_subject" value="New Portfolio Contact Message" />
              <input type="hidden" name="_template" value="box" />
              <input type="hidden" name="_captcha" value="false" />

              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0A]/90 backdrop-blur-md rounded-2xl border border-white/10"
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.9, opacity: 0, y: 20 }}
                      transition={{ type: "spring", bounce: 0.4 }}
                      className="flex flex-col items-center justify-center text-center w-full"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#00FF94]/10 flex items-center justify-center mb-4">
                        <CheckCircle2 size={32} className="text-[#00FF94]" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Message Sent!</h3>
                      <p className="text-white/60 text-sm leading-relaxed mb-6">
                        Thanks for reaching out!
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsSuccess(false)}
                        className="py-2.5 px-8 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold tracking-wide transition-colors border border-white/10"
                      >
                        Close
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2 block">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white text-sm 
                           focus:outline-none focus:border-[#00FF94] transition-colors placeholder-white/20"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2 block">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white text-sm 
                           focus:outline-none focus:border-[#00FF94] transition-colors placeholder-white/20"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2 block">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="What's on your mind?"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white text-sm 
                           focus:outline-none focus:border-[#00FF94] transition-colors resize-none placeholder-white/20"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full md:w-fit bg-[#00FF94] text-black font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full 
                         transition-all duration-300 mt-2
                         ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </motion.form>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-6"
            >
              <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2">Email</span>
                <a href="mailto:gvraghuveer07@gmail.com" className="text-white text-base font-semibold hover:text-[#00FF94] transition-colors flex items-center gap-3">
                  <Mail size={18} className="text-[#00FF94]" />
                  gvraghuveer07@gmail.com
                </a>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-2">Location</span>
                <span className="text-white text-base font-semibold flex items-center gap-3">
                  <MapPin size={18} className="text-[#00FF94]" />
                  Bangalore, India
                </span>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-4">Connect</span>
                <div className="flex gap-4">
                  {[
                    { icon: Github, href: 'https://github.com/gvraghuveer', label: 'GitHub', target: '_blank' },
                    { icon: Linkedin, href: 'https://www.linkedin.com/in/gvraghuveer/', label: 'LinkedIn', target: '_blank' },
                  ].map(({ icon: Icon, href, label, target }) => (
                    <a
                      key={label}
                      href={href}
                      target={target}
                      aria-label={label}
                      className="p-3 bg-black/30 border border-white/10 rounded-full text-white/60 
                               hover:text-black hover:bg-[#00FF94] hover:border-[#00FF94] transition-all duration-300"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="px-8 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <span className="text-[11px] font-mono text-white/25 tracking-wider">
              &copy; {currentYear} &middot; All rights reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
