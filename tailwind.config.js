const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
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
  plugins: [require("tailwind-scrollbar"), flowbite.plugin()],
};
