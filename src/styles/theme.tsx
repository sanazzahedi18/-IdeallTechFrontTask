import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1a73e8",
      light: "#e8f0fe",
    },
    background: {
      default: "#f5f5f7",
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

export default theme;
