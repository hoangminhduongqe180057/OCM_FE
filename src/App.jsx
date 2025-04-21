import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { useTheme } from "@mui/material/styles";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import CoursesPage from "./pages/CoursesPage";
import NavBar from "./components/NavBar/NavBar";
import Sidebar from "./components/NavBar/Sidebar";
import Notifications from "./components/Notification/Notifications";
import ToastNotification from "./components/Notification/ToastNotification";
import { CircularProgress, Box, useMediaQuery, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

const ProtectedRoute = ({ children }) => {
  const { role, accessToken, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  if (status === "loading") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (!accessToken || accessToken === undefined) {
    return <Navigate to="/login" replace />;
  }
  if (!["Admin", "Instructor"].includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppContent = () => {
  const location = useLocation();
  const hideNav = ["/login", "/register"].includes(location.pathname);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openSidebar, setOpenSidebar] = useState(!isMobile);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!hideNav && <NavBar toggleSidebar={toggleSidebar} openSidebar={openSidebar} />}
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {!hideNav && <Sidebar open={openSidebar} toggleSidebar={toggleSidebar} />}
        <Box sx={{ flexGrow: 1, mt: hideNav ? 0 : 8 }}>
          <ToastNotification />
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <ProtectedRoute>
                  <CoursesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/new"
              element={
                <ProtectedRoute>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h4">Thêm khóa học (chưa triển khai)</Typography>
                  </Box>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />
            <Route path="/student" element={<StudentPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
          <AppContent />
      </ThemeProvider>
    </Provider>
  );
}

function StudentPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Chào mừng học viên!
      </Typography>
      <Typography>Trang này đang được phát triển.</Typography>
    </Box>
  );
}

export default App;