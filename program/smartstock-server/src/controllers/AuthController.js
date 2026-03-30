const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserDTO = require('../dto/UserDTO');

class AuthController {
  // РЕЄСТРАЦІЯ
  async register(req, res) {
    try {
      const { username, password, role } = req.body;
      const user = await User.create({ username, password, role });
      res.status(201).json(new UserDTO(user));
    } catch (error) {
      res.status(400).json({ error: 'Користувач вже існує або дані невірні' });
    }
  }

  // ЛОГІН
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Невірний логін або пароль' });
      }

      // Генериція токена
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.json({ token, user: new UserDTO(user) });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();