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
        background: "rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [],
};
