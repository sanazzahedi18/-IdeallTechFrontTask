"use client";

import "./globals.css";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { Provider, useSelector } from "react-redux";
import store from "@todolist/core/redux/store/store";
import createAppTheme from "@todolist/styles/theme";
import { selectDarkMode } from "@todolist/core/redux/slices/darkModeSlice";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

 
  const DynamicThemeProvider = () => {
    const mode = useSelector(selectDarkMode);
    const theme = createAppTheme(mode);

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container sx={{ height: "100vh"  }}>{children}</Container>
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
