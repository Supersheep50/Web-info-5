// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'webcourse.cs.nuim.ie',
    user: 'cs230_p250126',
    password: 'p250126',
    database: 'cs230_p250126'
});

db.connect((err) => {
    if (err) {
        console.error('❌ MySQL connection error:', err);
        return;
    }
    console.log('✅ Connected to MySQL database.');
});

module.exports = db;
