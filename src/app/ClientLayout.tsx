"use client";

import "./globals.css";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
  useTheme,
  LinearProgress,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useIsFetching,
} from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { Provider, useSelector } from "react-redux";
import store from "@todolist/core/redux/store/store";
import createAppTheme from "@todolist/core/styles/theme";
import { selectDarkMode } from "@todolist/core/redux/slices/darkModeSlice";
import DarkModeSwitch from "@todolist/components/common/DarkModeSwitch";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});


const MainContent = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const mode = useSelector(selectDarkMode);
  const isFetching = useIsFetching();
  const customTheme = createAppTheme(mode);

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {isFetching > 0 && (
        <LinearProgress
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: theme.zIndex.tooltip + 1,
          }}
        />
      )}
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

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <MainContent>{children}</MainContent>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}
