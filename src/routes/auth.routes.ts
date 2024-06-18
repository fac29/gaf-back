import { Express, Request, Response } from 'express';
import {
    sqlCreateSession,
    sqlFetchUserByEmail,
} from '../sqlStatements/sqlStatements';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export function Auth(app: Express) {
	app.post('/login', async (req, res) => {
		try {
			const { username, password } = req.body;
            const users = await sqlFetchUserByEmail
	
            if (Array.isArray(users) && users.length > 0) {
                const user = users[0]; // Assuming email is unique and we get an array with a single user
                if (bcrypt.compareSync(password, user.password_hash)) {
                  const sessionId = crypto.randomBytes(18).toString('base64');
                  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days from now
        
                  const sessionResult = await sqlCreateSession(sessionId, user.id, expiresAt);

                  console.log(sessionResult);
        
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
              res.status(500).json({ message: error.message });
            }
          });
        }