import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage'; // Ми створимо цей файл на наступному кроці

// Простий компонент для захисту маршрутів
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Публічний маршрут */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Захищений маршрут до Дашборду */}
        <Route path="/" element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        } />
        
        {/* Перенаправлення за замовчуванням */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;