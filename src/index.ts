import express, { Express, Application, Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';
import Products from './routes/product.routes';
import { Users } from './routes/user.routes';
import { Auth } from './routes/auth.routes'
import { Cart } from './routes/cart.routes';
import { Reviews } from './routes/review.routes';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';

const app: Express = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(
	cors({
		origin: 'http://localhost:5173',
	}),
);
app.use(express.json());

app.use(bodyParser.json());
app.use(cookieParser('hlkjfasdfasdfasdfasddfasdfasdfas123321dlsadf'))

// Create a new SQLite database (or open an existing one)
const db = new sqlite3.Database(':memory:');

Products(app)
Users(app)
Auth(app)
Cart(app)
Reviews(app)


app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
