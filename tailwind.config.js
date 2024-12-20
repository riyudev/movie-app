/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      laptop: "900px",
      tablet: "500px",
    },
    extend: {
      fontFamily: {
        poppinsRegular: ["poppins-regular"],
        poppinsBold: ["poppins-bold"],
        cinzelRegular: ["cinzel-regular"],
        cinzelSemiBold: ["cinzel-semibold"],
        cinzelBold: ["cinzel-bold"],
      },
    },
  },
  plugins: [tailwindScrollbar],
};
