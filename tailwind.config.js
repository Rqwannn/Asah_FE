module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        baloo: ['"Baloo 2"', "cursive"],
      },
      colors: {
        primary: "#1f684a",
        primaryDark: "#1b5a3e",
        accent: "#c06836",
        slateMuted: "#6b7280",
        inputBorder: "#dfdfdf",
      },
      boxShadow: {
        card: "0px 8px 24px rgba(0, 0, 0, 0.25)",
        icon: "0px 4px 10px rgba(14, 74, 48, 0.35)",
      },
      borderRadius: {
        card: "18px",
      },
    },
  },
  plugins: [],
};
