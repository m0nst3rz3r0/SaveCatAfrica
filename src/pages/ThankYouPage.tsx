import { motion } from "motion/react";
import { Heart, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SeoHead } from "../components/SeoHead";

export function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col font-inter bg-canvas">
      <SeoHead />
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 md:px-10 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart className="h-10 w-10 text-terracotta" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Thank You!
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-10">
            Your generous support helps us rescue, protect, and care for cats
            across Africa. Every contribution makes a real difference.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white font-bold uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform shadow-md"
            >
              <Home className="h-4 w-4" />
              Back Home
            </Link>
            <a
              href="/#impact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-terracotta text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-sunset transition-colors shadow-md"
            >
              <Heart className="h-4 w-4" />
              Donate Again
            </a>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
