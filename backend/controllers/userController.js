const db = require('../db');
const bcrypt = require('bcrypt');

// Register a new user
exports.registerUser = async (req, res) => {
  const { username, password, email, address } = req.body;

  if (!username || !password || !email || !address) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

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
    res.status(201).json({ message: 'User registered', id: result.insertId });
  });
};

// Login user
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Error logging in:', err);
      return res.status(500).json({ error: 'Login failed' });
    }

    const user = results[0];
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Fake session — return user info
    res.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
  });
};

// Get user info (for use after login)
exports.getUser = (req, res) => {
  const userId = req.params.id;

  db.query('SELECT id, username, email, address FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Failed to retrieve user' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(results[0]);
  });
};
