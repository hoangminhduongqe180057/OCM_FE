import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage.jsx';
import NavBar from './components/NavBar';
import { useSelector, useDispatch  } from 'react-redux';
import Notifications from './components/Notifications.jsx';
import ToastNotification from './components/ToastNotification';
import { CircularProgress, Box, Typography } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const { role, accessToken, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  if (!['Admin', 'Instructor'].includes(role)) {
    return <Navigate to="/student" replace />;
  }

  return children;
};

const AppContent = () => {
  const location = useLocation();
  const hideNav = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      {!hideNav && <NavBar />}
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
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/" element={<Navigate to="/login" replace/>} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
        <AppContent />
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