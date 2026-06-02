import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

export function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-24 px-5 md:px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="04" title="TRANSMISSION" />

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-2 relative glass-panel corner-brackets p-8 noise-overlay overflow-hidden"
          >
            <div className="absolute top-0 right-0 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--cyan)] border-l border-b border-[var(--cyan)]/40">
              CHANNEL.OPEN
            </div>

            <h3 className="font-display text-3xl md:text-4xl font-light leading-tight">
              Let's <span className="text-gradient">connect</span>.
            </h3>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
              Open to collaborations, opportunities, and conversations about design, code and the future.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { Icon: Mail, label: "EMAIL", value: "prathameshkhachane320@gmail.com", href: "mailto:prathameshkhachane320@gmail.com" },
                { Icon: Github, label: "GITHUB", value: "@prathameshk", href: "#" },
                { Icon: Linkedin, label: "LINKEDIN", value: "/in/prathameshk", href: "#" },
              ].map(({ Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center gap-4 border border-border hover:border-[var(--cyan)] p-3 transition-all hover:bg-[var(--cyan)]/5"
                  data-cursor-hover
                >
                  <div className="h-9 w-9 grid place-items-center border border-[var(--cyan)]/30 text-[var(--cyan)] group-hover:glow-cyan transition-all">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
                    <div className="font-display text-sm truncate">{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={(e) => e.preventDefault()}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-3 relative glass-panel corner-brackets p-8 noise-overlay overflow-hidden space-y-6"
          >
            <div className="absolute top-0 right-0 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--cyan)] border-l border-b border-[var(--cyan)]/40">
              MSG.COMPOSE
            </div>

            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--cyan)] animate-pulse" />
              SECURE TERMINAL · ENCRYPTED
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { label: "IDENTIFIER", placeholder: "your name", type: "text" },
                { label: "FREQUENCY", placeholder: "you@email.com", type: "email" },
              ].map((f) => (
                <div key={f.label} className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full bg-transparent border-b border-border focus:border-[var(--cyan)] py-2 outline-none transition-all focus:shadow-[0_4px_20px_-10px_oklch(0.85_0.16_195)] placeholder:text-muted-foreground/50"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">PAYLOAD</label>
              <textarea
                rows={5}
                placeholder="transmit your message..."
                className="w-full bg-transparent border border-border focus:border-[var(--cyan)] p-3 outline-none transition-all focus:shadow-[0_0_30px_-10px_oklch(0.85_0.16_195)] placeholder:text-muted-foreground/50 resize-none"
              />
            </div>

            <button
              type="submit"
              className="group relative overflow-hidden flex items-center gap-3 px-7 py-4 bg-[var(--primary)] text-primary-foreground font-mono text-xs uppercase tracking-[0.25em] transition-all hover:shadow-[0_0_40px_oklch(0.72_0.18_230/0.7)]"
              data-cursor-hover
            >
              <span className="relative z-10">TRANSMIT</span>
              <Send className="h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-[var(--cyan)] to-[var(--primary)] transition-transform duration-500" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
