export default {
  darkMode: "class", // ✅ REQUIRED

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      /* 🎨 PREMIUM COLOR SYSTEM */
      colors: {
        gray: {
          50: '#fcfaf8',
          100: '#f3f0ea',
          200: '#e5e1d8',
          300: '#cfc9be',
          400: '#a39d93',
          500: '#7a756d',
          600: '#5c546b',
          700: '#2e253e',
          800: '#181223',
          900: '#0b0812',
          950: '#06040a',
        },

        /* 🔥 Brand gradient colors */
        brand: {
          blue: "#3b82f6",
          purple: "#8b5cf6",
          pink: "#ec4899",
        }
      },

      /* 🌈 GRADIENTS */
      backgroundImage: {
        "premium-gradient":
          "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",

        "glass-gradient":
          "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
      },

      /* ✨ SHADOWS (Zorin style glow) */
      boxShadow: {
        glow: "0 0 25px rgba(59,130,246,0.35)",
        glowPurple: "0 0 25px rgba(168,85,247,0.35)",
        glowSoft: "0 10px 40px rgba(0,0,0,0.3)",
      },

      /* 💎 BORDER RADIUS */
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },

      /* 🧠 FONT (PREMIUM FEEL) */
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      /* 🎯 ANIMATIONS */
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },

        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },

      animation: {
        float: "float 4s ease-in-out infinite",
        fadeUp: "fadeUp 0.6s ease forwards",
      },
    },
  },

  plugins: [],
};