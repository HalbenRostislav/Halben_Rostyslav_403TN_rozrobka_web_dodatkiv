const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer')) {
    try {
      token = token.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; 
      next();
    } catch (error) {
      res.status(401).json({ error: 'Неавторизовано' });
    }
  } else {
    res.status(401).json({ error: 'Токен відсутній' });
  }
};

// Нова функція: приймає список дозволених ролей
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Доступ заборонено для вашої ролі' });
    }
    next();
  };
};

module.exports = { protect, authorize };