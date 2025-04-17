import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage.jsx';
import NotificationsPage from './pages/DashboardPage.jsx';
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux';
import Notifications from './components/Notifications.jsx';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user || !['Admin', 'Instructor'].includes(user.role)) {
    return <Navigate to="/login" />;
  }
  return children;
};

const AppContent = () => {
  const location = useLocation();
  const hideNav = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      {!hideNav && <NavBar />}
      <Notifications />
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
        <Route path="/" element={<Navigate to="/login" />} />
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

export default App;