const db = require('../db');

exports.getAllJourneyPlans = (req, res) => {
  const userId = req.user.id;
  const query = 'SELECT * FROM journey_plans WHERE user_id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching journey plans:', err);
      return res.status(500).json({ error: 'Failed to retrieve journey plans' });
    }
    res.json(results);
  });
};

exports.createJourneyPlan = (req, res) => {
  const userId = req.user.id;
  const { name, locations, start_date, end_date, activities, description } = req.body;

  const query = `
    INSERT INTO journey_plans (user_id, name, locations, start_date, end_date, activities, description)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [userId, name, JSON.stringify(locations), start_date, end_date, JSON.stringify(activities), description],
    (err, result) => {
      if (err) {
        console.error('Error creating journey plan:', err);
        return res.status(500).json({ error: 'Failed to create journey plan' });
      }
      res.status(201).json({ id: result.insertId });
    }
  );
};

exports.updateJourneyPlan = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { name, locations, start_date, end_date, activities, description } = req.body;

  const query = `
    UPDATE journey_plans
    SET name = ?, locations = ?, start_date = ?, end_date = ?, activities = ?, description = ?
    WHERE id = ? AND user_id = ?
  `;

  db.query(
    query,
    [name, JSON.stringify(locations), start_date, end_date, JSON.stringify(activities), description, id, userId],
    (err) => {
      if (err) {
        console.error('Error updating journey plan:', err);
        return res.status(500).json({ error: 'Failed to update journey plan' });
      }
      res.json({ message: 'Journey plan updated' });
    }
  );
};

exports.deleteJourneyPlan = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  db.query('DELETE FROM journey_plans WHERE id = ? AND user_id = ?', [id, userId], (err) => {
    if (err) {
      console.error('Error deleting journey plan:', err);
      return res.status(500).json({ error: 'Failed to delete journey plan' });
    }
    res.json({ message: 'Journey plan deleted' });
  });
};
