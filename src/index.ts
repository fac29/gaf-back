import express from 'express';
import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';
import Products from './routes/product.routes';

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

// Create a new SQLite database (or open an existing one)
const db = new sqlite3.Database(':memory:');

// Set up a simple route
// app.get('/', (req, res) => {
// 	res.send('Hello, wodrld!');
// });
Products(app);

// Start the Express server
app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
