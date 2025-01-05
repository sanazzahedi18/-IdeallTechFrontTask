"use client";

import "./globals.css";
import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { Provider, useSelector } from "react-redux";
import store from "@todolist/core/redux/store/store";
import createAppTheme from "@todolist/styles/theme";
import { selectDarkMode } from "@todolist/core/redux/slices/darkModeSlice";
import DarkModeSwitch from "@todolist/components/common/DarkModeSwitch";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const DynamicThemeProvider = () => {
    const mode = useSelector(selectDarkMode);
    const theme = createAppTheme(mode);

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            height: "100vh",
            p: isMobile ? "15px" : "40px",
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          {children}
          <Box
            sx={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
            }}
          >
            <DarkModeSwitch />
          </Box>
        </Box>
      </ThemeProvider>
    );
  };

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ToastContainer />
            <DynamicThemeProvider />
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}
