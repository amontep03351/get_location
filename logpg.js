const { Pool } = require('pg');

// กำหนดการเชื่อมต่อกับฐานข้อมูล PostgreSQL
const pool = new Pool({
    user: 'root',
    host: 'https://dashboard.render.com/d/dpg-cou3qegl5elc73c544gg-a',
    database: 'log_location',
    password: '4EjYnHJo38HbTuimE3X9rNVr77qMbwY8',
    port: '5432',
});

// ทำการเชื่อมต่อกับฐานข้อมูล
pool.connect()
  .then(client => {
    console.log('Connected to PostgreSQL database');
    // ส่งคำสั่ง SQL เพื่อดึงข้อมูลจากตาราง pg_log
    return client.query('SELECT * FROM pg_log');
  })
  .then(result => {
    console.log('Fetched data from pg_log table:');
    console.table(result.rows); // แสดงข้อมูลในรูปแบบของตาราง
  })
  .catch(error => {
    console.error('Error connecting to PostgreSQL:', error);
  })
  .finally(() => {
    pool.end(); // ปิดการเชื่อมต่อกับฐานข้อมูลเมื่อเสร็จสิ้น
  });
