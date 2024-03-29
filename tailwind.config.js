const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inclusive Sans"', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        // Heading - desktop
        "dh-2xl": ["72px", "1.2em"],
        "dh-xl": ["64px", "1.2em"],
        "dh-l": ["48px", "1.2em"],
        "dh-m": ["40px", "1.2em"],
        "dh-s": ["32px", "1.2em"],
        "dh-xs": ["24px", "1.2em"],
        // Heading - mobile
        "mh-2xl": ["56px", "1.2em"],
        "mh-xl": ["48px", "1.2em"],
        "mh-l": ["40px", "1.2em"],
        "mh-m": ["32px", "1.2em"],
        "mh-s": ["24px", "1.2em"],
        "mh-xs": ["20px", "1.2em"],
        // Paragraph
        "p-xl": ["20px", "1.2em"],
        "p-l": ["18px", "1.2em"],
        "p-m": ["16px", "1.2em"],
        "p-s": ["14px", "1.2em"],
        "p-xs": ["12px", "1.2em"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        gray: {
          25: "#fdfdfc",
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d7d3d0",
          400: "#a9a29d",
          500: "#79716b",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
        primary: {
          25: "#f8f2f4",
          50: "#f1e4e9",
          100: "#dcbcc8",
          200: "#c893a6",
          300: "#b36b85",
          400: "#a25370",
          500: "#993d5f",
          600: "#6c374b",
          700: "#512a38",
          800: "#361c25",
          900: "#28151c",
        },
        error: {
          300: "#f8a6a0",
          500: "#db574d",
        },
        warning: {
          100: "#fffaeb",
          200: "#fedf89",
          300: "#fdb022",
          400: "#f79009",
          500: "#b54708",
        },
        success: {
          100: "#ecfdf3",
          200: "#98ddba",
          300: "#17b26a",
          400: "#17b26a",
          500: "#074d31",
        },
        information: {
          100: "#f0f7ff",
          200: "#89b2f0",
          300: "#558fec",
          400: "#3067c7",
          500: "#102a65",
        },
      },
      boxShadow: {
        "focus-ring-primary": "0px 0px 0px 4px rgba(125, 64, 86, 0.25)",
        "focus-ring-black": "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        "focus-ring-error": "0px 0px 0px 4px rgba(240, 68, 56, 0.24)",
        "focus-ring-gray-shadow":
          "box-shadow: 0px 0px 0px 4px rgba(152, 162, 179, 0.14)",
      },
      boxShadowColor: {
        primary: {
          25: "#f8f2f4",
          50: "#f1e4e9",
          100: "#dcbcc8",
          200: "#c893a6",
          300: "#b36b85",
          400: "#a25370",
          500: "#993d5f",
          600: "#6c374b",
          700: "#512a38",
          800: "#361c25",
          900: "#28151c",
        },
      },
    },
  },
  plugins: [],
};
