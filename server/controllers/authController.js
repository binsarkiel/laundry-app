const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
  register: async (req, res) => {
    try {
      const { username, password, role } = req.body;

      // Validasi input (sangat penting!)
      if (!username || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Cek apakah username sudah ada
      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' }); // 409 Conflict
      }

      // Buat user baru
      const newUser = await User.create(username, password, role);

      // Generate JWT
      const token = jwt.sign(
        { userId: newUser.id, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token berlaku selama 1 jam
      );

      // Kirim response (jangan kirim password!)
      res.status(201).json({ message: 'User registered successfully', token, user: { id: newUser.id, username: newUser.username, role: newUser.role } });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Validasi input
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }

      const user = await User.findByUsername(username);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' }); // 401 Unauthorized
      }

      // Bandingkan password yang di-hash
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Kirim response
      res.status(200).json({ message: 'Login successful', token, user: { id: user.id, username: user.username, role: user.role } });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers['authorization']; // Ambil header Authorization
    const token = authHeader && authHeader.split(' ')[1]; // Ambil token (pisahkan dari "Bearer ")

    if (!token) {
      return res.status(401).json({ message: 'No token provided' }); // 401 Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: 'Invalid token', error: err.message }); // 403 Forbidden
      }
      req.user = user; // Simpan informasi user di request object
      next(); // Lanjutkan ke middleware/controller berikutnya
    });
  },

  authorizeRole: (roles) => {
    return (req, res, next) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Unauthorized access' }); // 403 Forbidden
      }
      next();
    };
  },
  checkAuth: async (req, res) => {
    try {
      // Middleware authenticateToken sudah menambahkan req.user
      if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
      }
      res.status(200).json({ success: true, data: req.user }); // Kirim data user
    } catch (error) {
      console.error("Check auth error:", error);
      res.status(500).json({ success: false, message: 'Error checking authentication', error: error.message });
    }
  }
};

module.exports = authController;