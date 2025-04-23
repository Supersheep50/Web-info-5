const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'webcourse.cs.nuim.ie',
  user: 'p250126',
  password: 'OhV9vohSeequeuya',
  database: 'cs230_p250126'
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
    return;
  }
  console.log('✅ Connected to MySQL');
});

module.exports = db;
