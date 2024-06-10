import express from 'express';
import sqlite3 from 'sqlite3';

const app = express();
const port = 3000;

// Create a new SQLite database (or open an existing one)
const db = new sqlite3.Database(':memory:');

// Set up a simple route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
