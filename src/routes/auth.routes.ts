import { Express, Request, Response } from 'express';
import {
	sqlCreateSession,
	sqlFetchUserByEmail,
	sqlCreateUser,
} from '../sqlStatements/sqlStatements';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export function Auth(app: Express) {
	app.post('/login', async (req, res) => {
		try {
			const { email, password } = req.body;
			const users = await sqlFetchUserByEmail(email);
	

			if (Array.isArray(users) && users.length > 0) {
				const user = users[0]; // Assuming email is unique and we get an array with a single user
				if (bcrypt.compareSync(password, user.password)) {
					
					const expiresAt = new Date(
						Date.now() + 7 * 24 * 60 * 60 * 1000,
					).toISOString(); // 7 days from now

					const sessionId = await sqlCreateSession(user.id, expiresAt);

					if (typeof sessionId === 'string') {
						return res.status(500).send(sessionId);
					  }

					res.cookie('sid', sessionId, {
						signed: true,
						httpOnly: true,
						maxAge: 604800000,
						sameSite: 'lax',
					});
					res.status(200).json({ message: 'Login successful' });
				} else {
					res.status(401).json({ message: 'Invalid email or password' });
				}
			} else {
				res.status(401).json({ message: 'Invalid email or password' });
			}
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ message: error.message });
			} else {
				res.status(500).json({ message: 'An unknown error occurred' });
			}
		}
	});

	app.post('/signup', async (req, res) => {

		try{
			const { name, password, email } = req.body;
			
			if (!name || !password || !email) {
				return res.status(400).send('Bad input');
			}

			// Hash the password
			const hashedPassword = await bcrypt.hash(password, 12);

			// Create the user in the DB
			const userResult = await sqlCreateUser(name, '', hashedPassword, '', '', email);

			//Check if we get a wrong answer
			if (typeof userResult === 'string') {
				return res.status(500).send(userResult);
			}

			// Fetch the created user to get their ID
			const users = await sqlFetchUserByEmail(email);
			if (!Array.isArray(users) || users.length === 0) {
				return res.status(500).send('User creation failed');
			}
			const user = users[0];

		}


	});
}
