/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--theme-primary)",
          hover: "var(--theme-primary-hover)",
          dark: "var(--theme-primary-dark)",
          deep: "var(--theme-primary-deep)",
          light: "var(--theme-primary-light)",
          lighter: "var(--theme-primary-lighter)",
          pale: "var(--theme-primary-pale)",
        },
        accent: {
          DEFAULT: "var(--theme-accent)",
          alt: "var(--theme-accent-alt)",
        },
        highlight: "var(--theme-highlight)",
        surface: {
          DEFAULT: "var(--surface)",
          light: "var(--surface-light)",
        },
        border: {
          DEFAULT: "var(--border)",
          light: "var(--border-light)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          body: "var(--text-body)",
          muted: "var(--text-muted)",
        },
        overlay: {
          heavy: "var(--overlay-heavy)",
          medium: "var(--overlay-medium)",
          light: "var(--overlay-light)",
        },
        success: {
          bg: "var(--success-bg)",
          text: "var(--success-text)",
        },
        error: {
          bg: "var(--error-bg)",
          text: "var(--error-text)",
          accent: "var(--error-accent)",
        },
        disabled: "var(--disabled)",
        focus: "var(--focus)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.8s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
