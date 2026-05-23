import { motion } from "motion/react";
import { Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useToast } from "../lib/toast";
import { useSiteSettings } from "../hooks/useSiteData";

export function ContactSection() {
  const settings = useSiteSettings();
  const submitContact = useMutation(api.contacts.submit);
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const firstName = (data.get("firstName") as string)?.trim();
    const lastName = (data.get("lastName") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const message = (data.get("message") as string)?.trim();

    if (!firstName || !lastName || !email || !message) {
      showToast("Please fill in all fields", "error");
      return;
    }

    setLoading(true);
    try {
      await submitContact({ firstName, lastName, email, message });
      showToast("Message sent! We'll be in touch soon.");
      form.reset();
    } catch {
      showToast("Failed to send message. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-canvas relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl text-navy font-bold mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-muted mb-10 leading-relaxed">
              Have questions about our missions, how to volunteer, or corporate
              partnerships? We'd love to hear from you.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-terracotta shadow-sm border border-border-theme group-hover:scale-110 group-hover:bg-terracotta group-hover:text-white transition-all duration-300">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-navy">Email Us</h4>
                  <p className="text-muted">
                    {settings?.contactEmail ?? "info@savecatafrica.org"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-terracotta shadow-sm border border-border-theme group-hover:scale-110 group-hover:bg-terracotta group-hover:text-white transition-all duration-300">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-navy">Regional Office</h4>
                  <p className="text-muted">
                    {settings?.contactAddress ?? "Nairobi, Kenya"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-terracotta shadow-sm border border-border-theme group-hover:scale-110 group-hover:bg-terracotta group-hover:text-white transition-all duration-300">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-navy">Operation Hours</h4>
                  <p className="text-muted">
                    {settings?.contactHours ?? "Mon - Fri, 9am - 5pm EAT"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-border-theme"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-inter text-xs uppercase tracking-widest font-bold text-[#A89689]">
                    First Name
                  </label>
                  <input
                    name="firstName"
                    required
                    className="w-full bg-canvas border border-border-theme rounded-xl p-4 text-navy focus:ring-2 focus:ring-terracotta/20 outline-none transition-all"
                    placeholder="Jane"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-inter text-xs uppercase tracking-widest font-bold text-[#A89689]">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    required
                    className="w-full bg-canvas border border-border-theme rounded-xl p-4 text-navy focus:ring-2 focus:ring-terracotta/20 outline-none transition-all"
                    placeholder="Doe"
                    type="text"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-inter text-xs uppercase tracking-widest font-bold text-[#A89689]">
                  Email Address
                </label>
                <input
                  name="email"
                  required
                  type="email"
                  className="w-full bg-canvas border border-border-theme rounded-xl p-4 text-navy focus:ring-2 focus:ring-terracotta/20 outline-none transition-all"
                  placeholder="jane@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="font-inter text-xs uppercase tracking-widest font-bold text-[#A89689]">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  className="w-full bg-canvas border border-border-theme rounded-xl p-4 text-navy focus:ring-2 focus:ring-terracotta/20 outline-none transition-all h-32 resize-none"
                  placeholder="How can we help?"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-navy py-5 rounded-xl text-white font-bold shadow-lg hover:bg-terracotta transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
                <Send className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
