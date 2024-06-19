import { Express, Request, Response } from 'express';
import {
	sqlCreateSession,
	sqlFetchUserByEmail,
	sqlCreateUser,
	sqlDeleteSession,
} from '../sqlStatements/sqlStatements';
import bcrypt from 'bcryptjs';

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
					console.log(`Created SessionID: ${sessionId}`);

					if (typeof sessionId !== 'number') {
						throw new Error('Failed to create session');
					}

					res.cookie('sid', sessionId, {
						signed: true,
						httpOnly: true,
						maxAge: 604800000, // 7 days
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
			console.error('Error during login:', error);
			res.status(500).json({
				message:
					error instanceof Error ? error.message : 'An unknown error occurred',
			});
		}
	});

	app.post('/logout', async (req, res) => {
		try {
			const sessionId = req.signedCookies.sid;
			if (!sessionId) {
				return res
					.status(400)
					.json({ message: 'No session ID found in cookies' });
			}

			const result = await sqlDeleteSession(sessionId);
			res.clearCookie('sid');
			res.status(200).json({ message: 'Logout successful', result });
		} catch (error) {
			console.error('Error during logout:', error);
			res.status(500).json({
				message:
					error instanceof Error ? error.message : 'An unknown error occurred',
			});
		}
	});

	app.post('/signup', async (req, res) => {
		try {
			// Retrieve values from the body setting defaults
			const {
				name,
				username = '',
				password,
				address = '',
				imagePath = '',
				email,
			} = req.body;

			if (!name || !password || !email) {
				return res.status(400).send('Bad input');
			}

			// Hash the password
			const hashedPassword = await bcrypt.hash(password, 12);

			// Create the user in the DB
			const userResult = await sqlCreateUser(
				name,
				username,
				hashedPassword,
				address,
				imagePath,
				email,
			);

			// Catch sql error if not unique
			if (userResult instanceof Error) {
				console.log(
					`Error caught as instance of Error. It is returning: ${userResult}`,
				);
				return res
					.status(400)
					.json({ message: 'Error signing up, email already exists' });
			}

			console.log(userResult);

			console.log(`Created User: ${JSON.stringify(userResult)}`);

			//Check if we get a wrong answer
			if (typeof userResult !== 'string') {
				return res.status(500).send(userResult);
			}

			// Fetch the created user to get their ID
			const users = await sqlFetchUserByEmail(email);
			if (!Array.isArray(users) || users.length === 0) {
				return res.status(500).send('User creation failed');
			}

			const user = users[0];

			// Create the session with the new user's ID
			const expiresAt = new Date(
				Date.now() + 7 * 24 * 60 * 60 * 1000,
			).toISOString(); // 7 days from now

			const sessionId = await sqlCreateSession(user.id, expiresAt);

			console.log(`Created SessionID: ${sessionId}`);

			if (typeof sessionId !== 'number') {
				return res.status(500).send('Failed to create session');
			}

			// Set a cookie with the session ID
			res.cookie('sid', sessionId, {
				signed: true,
				httpOnly: true,
				maxAge: 604800000, // 7 days from now
				sameSite: 'lax',
			});

			// Send a success response
			res.status(200).json({ message: 'Signup successful' });
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ message: error.message });
			} else {
				res.status(500).json({ message: 'An unknown error occurred' });
			}
		}
	});
}
