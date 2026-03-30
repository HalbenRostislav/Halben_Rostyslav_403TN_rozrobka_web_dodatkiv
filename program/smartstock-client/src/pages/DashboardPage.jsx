import { useEffect, useState } from 'react';
import api from '../api/axiosConfig'; 

const DashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Помилка завантаження товарів: ' + err.response?.data?.error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Функція виходу
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Завантаження...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      {/* Кнопка тепер ВСЕРЕДИНІ return */}
      <button 
        onClick={handleLogout} 
        style={{ 
          float: 'right', 
          backgroundColor: '#ff4d4d', 
          color: 'white', 
          border: 'none', 
          padding: '10px 15px', 
          cursor: 'pointer',
          borderRadius: '5px' 
        }}
      >
        Вийти з системи
      </button>

      <h2 style={{ textAlign: 'center' }}>📊 Склад товарів SmartStock</h2>
      
      <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            <th>SKU</th>
            <th>Назва</th>
            <th>Кількість</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>{product.current_stock}</td>
              <td style={{ color: product.status === 'CRITICAL' ? 'red' : 'green', fontWeight: 'bold' }}>
                {product.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPage;