const express = require('express');
const cors = require('cors'); // Перемістив імпорт корс вище
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/User'); 
require('dotenv').config();

const app = express(); // 1. СПОЧАТКУ створюємо додаток

// 2. ПОТІМ підключаємо проміжне програмне забезпечення (middleware)
app.use(cors()); 
app.use(express.json());

// 3. Маршрути
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Конфігурація Swagger
const swaggerDocument = {
  openapi: '3.0.0',
  info: { 
    title: 'SmartStock API - Security Edition', 
    version: '1.1.0',
    description: 'Документація API з підтримкою JWT-авторизації'
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    }
  },
  security: [{ bearerAuth: [] }], 
  paths: {
    '/api/auth/register': {
      post: {
        summary: 'Реєстрація нового користувача',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: { type: 'string', example: 'admin_rostik' },
                  password: { type: 'string', example: 'password123' },
                  role: { type: 'string', example: 'ADMIN' }
                }
              }
            }
          }
        },
        responses: { '201': { description: 'Користувача створено' } }
      }
    },
    '/api/auth/login': {
      post: {
        summary: 'Вхід у систему (отримання токена)',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: { type: 'string', example: 'admin_rostik' },
                  password: { type: 'string', example: 'password123' }
                }
              }
            }
          }
        },
        responses: { '200': { description: 'Успішний логін, токен отримано' } }
      }
    },
    '/api/products': {
      get: { 
        summary: 'Отримати всі товари (Потрібен токен)', 
        tags: ['Products'],
        responses: { '200': { description: 'Успішно' }, '401': { description: 'Неавторизовано' } } 
      },
      post: { 
        summary: 'Створити товар (Тільки для ADMIN)',
        tags: ['Products'],
        requestBody: {
          required: true,
          content: { 
            'application/json': { 
              schema: { 
                type: 'object', 
                properties: { 
                  sku: {type:'string'}, 
                  name: {type:'string'}, 
                  current_stock: {type:'integer'} 
                } 
              } 
            } 
          }
        },
        responses: { '201': { description: 'Створено' }, '403': { description: 'Немає прав' } }
      }
    }
  }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log('📦 База даних синхронізована');
  app.listen(PORT, () => {
    console.log(`🚀 Сервер запущено на http://localhost:${PORT}`);
    console.log(`📖 Документація: http://localhost:${PORT}/api-docs`);
  });
});