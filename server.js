const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// กำหนดการเชื่อมต่อกับฐานข้อมูล PostgreSQL
const pool = new Pool({
  user: 'root',
  host: 'dpg-cou3qegl5elc73c544gg-a',
  database: 'log_location',
  password: '4EjYnHJo38HbTuimE3X9rNVr77qMbwY8',
  port: '5432',
});

// รับข้อมูลจากเว็บไซต์และ insert ลงในฐานข้อมูล
app.use(express.json());
app.post('/insert-coordinates', async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const client = await pool.connect();
    const result = await client.query('INSERT INTO pg_log (latitude, longitude) VALUES ($1, $2) RETURNING *', [latitude, longitude]);
    const insertedCoordinates = result.rows[0];
    client.release();

    res.json({ success: true, data: insertedCoordinates });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ success: false, error: 'An error occurred while inserting data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
