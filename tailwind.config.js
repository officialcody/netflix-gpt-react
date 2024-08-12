const { BACKGROUND_IMG_URL } = require("./src/utils/app.constants");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        mainbg: `url('${BACKGROUND_IMG_URL}')`,
      },
      colors: {
        backgroundbright: "rgba(0, 0, 0, 0.5)",
        background: "rgba(0, 0, 0, 0.6)",
        backgrounddull: "rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
};
