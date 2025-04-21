const db = require('../db');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  const { username, password, email, address } = req.body;

  if (!username || !password || !email || !address) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (username, password, email, address)
      VALUES (?, ?, ?, ?)
    `;

    db.query(query, [username, hashedPassword, email, address], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.status(500).json({ error: 'Registration failed' });
      }

      res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    });
  } catch (err) {
    console.error('Error hashing password:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
