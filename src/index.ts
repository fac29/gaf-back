import express, { Express, Application, Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';
import Products from './routes/product.routes';
const cors = require('cors');

const app: Express = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(
	cors({
		origin: 'http://localhost:5173',
		//origin: 'http://127.0.0.1:5173',
	}),
);
app.use(express.json());

// Create a new SQLite database (or open an existing one)
const db = new sqlite3.Database(':memory:');

Products(app);

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
