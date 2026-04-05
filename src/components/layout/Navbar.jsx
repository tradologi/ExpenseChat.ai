import { useApp } from "../../context/AppContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, theme, toggleTheme, toggleRole } = useApp();
  const [scrolled, setScrolled] = useState(false);

  // 🔥 Detect scroll for shrink effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "px-6 py-2 bg-[#030712]/90 backdrop-blur-2xl border-b border-white/10 shadow-lg"
          : "px-6 py-4 bg-[#030712]/70 backdrop-blur-xl border-b border-white/10"
      }`}
    >

      {/* 🔥 TOP GLOW LINE */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

      <div className="flex items-center justify-between">

        {/* ================= LEFT ================= */}
        <div className="flex items-center gap-3 group cursor-pointer">

          {/* 🔥 AI ORB LOGO */}
          <div className="relative w-9 h-9 flex items-center justify-center">
            
            {/* glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-emerald-400 blur-md opacity-70 group-hover:opacity-100 transition"></div>

            {/* core */}
            <div className="relative w-8 h-8 rounded-full bg-[#030712] border border-white/10 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 animate-pulse"></div>
            </div>

          </div>

          {/* 🔥 ANIMATED LOGO TEXT */}
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-x">
            ExpenseChat.ai
          </span>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex items-center gap-3">

          {/* 🌙 THEME TOGGLE */}
          <button
            //onClick={toggleTheme}
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 hover:scale-105"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>

          {/* 👤 ROLE */}
          <button
            onClick={toggleRole}
            className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-all duration-200 hover:scale-105"
          >
            {user.role}
          </button>

          {/* 🔥 PREMIUM AVATAR (E) */}
          <div className="relative group">

            {/* glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-md opacity-60 group-hover:opacity-100 transition"></div>

            {/* avatar */}
            <div className="relative w-9 h-9 rounded-full bg-[#030712] border border-white/10 flex items-center justify-center text-white font-bold">
              E
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;