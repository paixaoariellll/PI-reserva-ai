module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      white: "#ffffff", // White
      black: "#2c2c2c", // Jet
      gray: {
        1: "#f7fafc", // Cultured
        2: "#edf2f7", // Alice Blue
        3: "#4a5568", // Independence
        4: "#2d3748", // Charcoal
        5: "#1a202c", // Raisin Black
      },
      grey: "#cbd5e0", // Beau Blue
      purple: {
        1: "#985ebf", // Amethyst
        2: "#805ad5", // Han Purple
        3: "#753fbf", // Plump Purple
        4: "#6530d9", // Slate Blue
      },
      blue: {
        1: "#8eC2ed", // Aero
        2: "#3182ce", // Steel Blue
      },
      orange: "#f2a950", // Yellow Orange
      pink: "#bf7eae", // Opera Mauve
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
  ],
}
