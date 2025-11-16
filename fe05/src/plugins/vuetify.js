import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader

const fallSunsetTheme = {
  dark: false,
  colors: {
    background: "#1a2228", // Dark slate blue, like the evening sky
    surface: "#2c3e50", // Slightly lighter blue-grey for cards and surfaces
    primary: "#e67e22", // A strong, deep orange like a setting sun
    secondary: "#8e44ad", // A touch of purple for twilight clouds
    accent: "#d35400", // A brighter, fiery orange for accents
    error: "#c0392b",
    info: "#2980b9",
    success: "#27ae60",
    warning: "#f39c12",
  },
};

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "fallSunsetTheme",
    themes: {
      fallSunsetTheme,
    },
  },
  icons: {
    defaultSet: "mdi",
  },
});
