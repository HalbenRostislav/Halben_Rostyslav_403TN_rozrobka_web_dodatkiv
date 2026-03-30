import { useState } from 'react';
import api from '../api/axiosConfig';

const LoginPage = () => {
  const [username, setUsername] = useState('admin_rostik');
  const [password, setPassword] = useState('password123');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      alert('Успішний вхід! Токен збережено.');
      window.location.reload(); 
    } catch (error) {
      alert('Помилка входу: ' + error.response?.data?.error);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Вхід у SmartStock</h2>
      <form onSubmit={handleLogin}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Логін" /><br/><br/>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" /><br/><br/>
        <button type="submit">Увійти</button>
      </form>
    </div>
  );
};

export default LoginPage;