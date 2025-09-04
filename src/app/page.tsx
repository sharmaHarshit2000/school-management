"use client";

import {
  GraduationCap,
  BarChart3,
  Zap,
  PlusCircle,
  ClipboardList,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-custom text-custom transition-all duration-300">
      <div className="text-center max-w-4xl mb-16">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <GraduationCap size={48} className="text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-400 dark:to-green-400 drop-shadow-md">
              Welcome to
            </span>{" "}
            <span className="text-accent-blue">School</span>
            <span className="text-accent-green"> Management</span>
          </h1>
        </div>
        <p className="text-lg md:text-xl text-card mb-12 leading-relaxed max-w-3xl mx-auto">
          A modern, intuitive platform designed to streamline school
          administration, student management, and academic reporting with
          powerful yet simple tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 w-full max-w-6xl">
        {[
          {
            icon: <GraduationCap size={28} />,
            title: "Student Management",
            desc: "Easily add, edit, or remove student records with our intuitive interface. Track progress and manage information efficiently.",
            bg: "bg-blue-100 dark:bg-blue-900/30",
          },
          {
            icon: <BarChart3 size={28} />,
            title: "Smart Reports",
            desc: "Generate comprehensive reports for attendance, performance, and analytics with just a few clicks.",
            bg: "bg-green-100 dark:bg-green-900/30",
          },
          {
            icon: <Zap size={28} />,
            title: "Easy Navigation",
            desc: "Quick access to all features through our clean, modern interface. Designed for speed and efficiency.",
            bg: "bg-purple-100 dark:bg-purple-900/30",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-card text-card p-8 rounded-3xl shadow-md border border-custom transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div
              className={`${feature.bg} w-16 h-16 mb-6 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
            >
              {feature.icon}
            </div>
            <h2 className="text-2xl font-bold mb-4">{feature.title}</h2>
            <p className="text-card/90 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center mb-20">
        <h2 className="text-3xl font-bold mb-8 text-card">Get Started Today</h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a href="/addSchool" className="btn btn-blue flex items-center gap-3">
            <PlusCircle size={20} />
            Add New School
          </a>
          <a
            href="/showSchools"
            className="btn btn-green flex items-center gap-3"
          >
            <ClipboardList size={20} />
            View Schools
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-16 pt-8 border-t border-custom">
        <p className="text-card/80 text-sm">
          Built with ❤️ using Next.js & TailwindCSS •
          <span className="text-accent-blue ml-1">
            Modern School Management Solution
          </span>
        </p>
      </div>
    </div>
  );
}
