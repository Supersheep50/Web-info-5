const db = require('../db');

const authenticate = (req, res, next) => {
  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: Missing user ID' });
  }

  
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: 'Unauthorized user' });
    }
    req.user = results[0];
    next();
  });
};

module.exports = authenticate;
