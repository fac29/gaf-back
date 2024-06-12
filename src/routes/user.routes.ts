import { Express, Request, Response } from 'express';
import {
	sqlDeleteUser,
	sqlFetchUser,
	sqlUpdateUser,
	sqlCreateUser,
} from '../sqlStatements/sqlStatements';

export function Users(app: Express) {
	//
	app.delete('/user/:id', async (req: Request, res: Response) => {
		const userId: number = parseInt(req.params.id);
		try {
			const deleteUser = await sqlDeleteUser(userId);
			if (deleteUser === 'there were no changes as user does not exist') {
				res.send('there were no changes as user does not exist');
			} else {
				res.send(`User with ID ${userId} deleted successfully`);
			}
		} catch (error) {
			res.send((error as Error).message);
			console.log((error as Error).message);
		}
	});
	//
	app.get('/user/:id', async (req: Request, res: Response) => {
		const userId: number = parseInt(req.params.id);

		try {
			const fetchUser = await sqlFetchUser(userId);
			if (fetchUser.length < 1) {
				res.send(`User with ID ${userId} was not found in the database`);
			} else {
				res.send(fetchUser);
			}
		} catch (error) {
			res.send((error as Error).message);
			console.log((error as Error).message);
		}
	});
	//
	app.put('/user/:id', async (req: Request, res: Response) => {
		const userId: number = parseInt(req.params.id);
		const newContent = req.body.content;

		try {
			const updateUser = await sqlUpdateUser(userId, newContent);
			if (updateUser.length < 1) {
				res.send(`User with ID ${userId} was not found in the database`);
			} else {
				res.send(updateUser);
			}
		} catch (error) {
			res.send((error as Error).message);
			console.log((error as Error).message);
		}
	});
	//
	app.post('/user', async (req: Request, res: Response) => {
		const newContent = req.body.content;

		try {
			const newUser = await sqlCreateUser(newContent);
			res.send(newUser);
		} catch (error) {
			res.send((error as Error).message);
			console.log((error as Error).message);
		}
	});
}
