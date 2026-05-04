import React from "react";
import Navbar from "../components_lite/Navbar";
import Footer from "../components_lite/Footer";
import { motion } from "framer-motion";
import {
  Github, Linkedin, Mail, MapPin, GraduationCap,
  Code2, Database, Server, Sparkles, ArrowRight,
  Award, Rocket, Heart, Coffee, Phone,
} from "lucide-react";
import profilePic from "../../assets/professional.jpg";

const Stat = ({ value, label, icon: Icon }) => (
  <div className="flex items-center gap-3 px-4 py-3 rounded-2xl glass">
    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-orange-500 text-white flex items-center justify-center">
      <Icon size={18} />
    </div>
    <div>
      <p className="text-xl font-bold text-gray-900 dark:text-white leading-none">{value}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  </div>
);

const SkillCard = ({ icon: Icon, title, items, accent }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all"
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 shadow-md ${accent}`}>
      <Icon size={22} />
    </div>
    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
    <div className="flex flex-wrap gap-2 mt-3">
      {items.map((s) => (
        <span
          key={s}
          className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-xs font-medium"
        >
          {s}
        </span>
      ))}
    </div>
  </motion.div>
);

const TimelineItem = ({ year, title, place, desc, color }) => (
  <div className="relative pl-8 pb-8 border-l-2 border-gray-200 dark:border-white/10 last:border-0 last:pb-0">
    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${color} ring-4 ring-white dark:ring-gray-950`} />
    <span className="inline-block text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-300 mb-1">
      {year}
    </span>
    <h4 className="text-base font-bold text-gray-900 dark:text-white">{title}</h4>
    <p className="text-sm text-gray-500 dark:text-gray-400">{place}</p>
    {desc && <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{desc}</p>}
  </div>
);

const Creator = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-purple-50/40 to-gray-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-300 text-xs font-medium mb-4">
              <Sparkles size={12} /> Available for opportunities
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.05] tracking-tight">
              Hi, I'm <span className="text-gradient">Aditya Shinde</span>
            </h1>
            <p className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-300 mt-4">
              Full-Stack Developer · MERN Stack · UI/UX Enthusiast
            </p>
            <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl leading-relaxed">
              MCA graduate building modern web applications end-to-end — from clean UIs in React
              to robust APIs with Node and MongoDB. I obsess over performance, accessibility, and
              the small details that make products feel magical.
            </p>

            {/* Quick contact */}
            <div className="flex flex-wrap gap-3 mt-7">
              <a
                href="mailto:adityashinde@example.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-gradient text-sm font-semibold"
              >
                <Mail size={16} /> Get in touch
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-10">
              <Stat icon={Rocket} value="10+" label="Projects" />
              <Stat icon={Award} value="MCA" label="Degree" />
              <Stat icon={Coffee} value="∞" label="Cups of ☕" />
            </div>
          </motion.div>

          {/* Right: photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-3xl blur-2xl opacity-40 animate-pulse" />
              <div className="relative w-72 h-96 md:w-80 md:h-[480px] rounded-3xl overflow-hidden border-4 border-white dark:border-white/10 shadow-2xl">
                <img src={profilePic} alt="Aditya Shinde" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 rounded-2xl px-5 py-3 shadow-xl border border-gray-100 dark:border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">Open to work</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-300 text-xs font-medium mb-3">
            <Code2 size={12} /> Tech Stack
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Tools I <span className="text-gradient">work with</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">
            From pixel-perfect interfaces to scalable backends — here's what's in my toolkit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <SkillCard
            icon={Code2}
            title="Frontend"
            accent="bg-gradient-to-br from-blue-500 to-purple-500"
            items={["React.js", "Tailwind CSS", "Framer Motion", "Three.js", "Redux Toolkit", "TypeScript"]}
          />
          <SkillCard
            icon={Server}
            title="Backend"
            accent="bg-gradient-to-br from-emerald-500 to-teal-500"
            items={["Node.js", "Express", "REST APIs", "JWT Auth", "Socket.io", "GraphQL"]}
          />
          <SkillCard
            icon={Database}
            title="Database & Tools"
            accent="bg-gradient-to-br from-orange-500 to-pink-500"
            items={["MongoDB", "Mongoose", "PostgreSQL", "Git/GitHub", "Docker", "Postman"]}
          />
        </div>
      </section>


      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative overflow-hidden rounded-3xl p-10 md:p-14 text-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 shadow-2xl"
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
          <Heart className="text-white/80 mx-auto mb-3" size={28} />
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
            Let's build something <span className="italic">remarkable</span> together.
          </h2>
          <p className="text-white/85 mt-3 max-w-xl mx-auto">
            Have a project in mind? I'm always open to interesting collaborations and full-time opportunities.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:adityashinde@example.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-purple-700 font-semibold text-sm hover:scale-[1.03] active:scale-[0.97] transition-transform"
            >
              <Mail size={16} /> Send a message <ArrowRight size={16} />
            </a>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur text-white border border-white/30 font-semibold text-sm hover:bg-white/20 transition"
            >
              <Phone size={16} /> Schedule a call
            </a>
          </div>
          <p className="text-white/70 text-xs mt-6 flex items-center justify-center gap-2">
            <MapPin size={12} /> Maharashtra, India · Open to remote
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Creator;
