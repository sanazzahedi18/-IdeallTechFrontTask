"use client";
import { createTheme } from "@mui/material/styles";

const createAppTheme = (mode: "light" | "dark") => {
  const background = mode === "light" ? "#F9F9F9" : "#2B3035";
  const bgWhite = mode === "light" ? "#FFFFFF" : "black";
  const textToWhite = mode === "light" ? "#000000" : "#FFFFFF";
  const whiteTogrey = mode === "light" ? "#FFFFFF" : "#2B3035";
  const btnColor = mode === "light" ? "#0760FB" : "#FFFFFF";
  const btnBgColor = mode === "light" ? "#0760FB1A" : "#003892";


  return createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#1a73e8",
        light: "#e8f0fe",
      },

      grey: {
        "100": background,
        "200": bgWhite,
        "300": textToWhite,
        "400":whiteTogrey,
        "500":btnColor,
        "600":btnBgColor,
      },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
      h4: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 500,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          body {
            font-family: 'Poppins', sans-serif;
          }
        `,
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            "@media (min-width: 1200px)": {
              maxWidth: 1200,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 8,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            height: 32,
          },
        },
      },
    },
  });
};

export default createAppTheme;
