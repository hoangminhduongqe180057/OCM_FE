import { Routes, Route } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <Provider store={store}>
        <Routes>
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
        </Routes>
    </Provider>
  );
}

export default App;