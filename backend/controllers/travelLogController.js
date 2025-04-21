const db = require('../db');

exports.getAllTravelLogs = (req, res) => {
  const userId = req.user.id;
  const query = 'SELECT * FROM travel_logs WHERE user_id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching travel logs:', err);
      return res.status(500).json({ error: 'Failed to retrieve logs' });
    }
    res.json(results);
  });
};

exports.createTravelLog = (req, res) => {
  const userId = req.user.id;
  const { title, description, start_date, end_date, post_date, tags } = req.body;

  const query = `
    INSERT INTO travel_logs (user_id, title, description, start_date, end_date, post_date, tags)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [userId, title, description, start_date, end_date, post_date, JSON.stringify(tags)], (err, result) => {
    if (err) {
      console.error('Error creating log:', err);
      return res.status(500).json({ error: 'Failed to create travel log' });
    }
    res.status(201).json({ id: result.insertId });
  });
};

exports.updateTravelLog = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { title, description, start_date, end_date, post_date, tags } = req.body;

  const query = `
    UPDATE travel_logs
    SET title = ?, description = ?, start_date = ?, end_date = ?, post_date = ?, tags = ?
    WHERE id = ? AND user_id = ?
  `;

  db.query(query, [title, description, start_date, end_date, post_date, JSON.stringify(tags), id, userId], (err) => {
    if (err) {
      console.error('Error updating log:', err);
      return res.status(500).json({ error: 'Failed to update travel log' });
    }
    res.json({ message: 'Log updated' });
  });
};

exports.deleteTravelLog = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  db.query('DELETE FROM travel_logs WHERE id = ? AND user_id = ?', [id, userId], (err) => {
    if (err) {
      console.error('Error deleting log:', err);
      return res.status(500).json({ error: 'Failed to delete travel log' });
    }
    res.json({ message: 'Log deleted' });
  });
};
