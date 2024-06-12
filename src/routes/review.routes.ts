import { Express, Request, Response } from 'express';
import {
	sqlDeleteReview,
	sqlFetchReview,
	sqlUpdateReview,
	sqlCreateReview,
} from '../sqlStatements/sqlStatements';

export function Reviews(app: Express) {
	//
	app.delete('/review/:id', async (req: Request, res: Response) => {
		const reviewId: number = parseInt(req.params.id);
		try {
			const deleteReview = await sqlDeleteReview(reviewId);
			if (deleteReview === 'there were no changes as product does not exist') {
				res.send('there were no changes as cart does not exist');
			} else {
				res.send(`Review with ID ${reviewId} deleted successfully`);
			}
		} catch (error) {
			res.send((error as Error).message);
			console.log((error as Error).message);
		}
	});
	//
	app.get('/review/:id', async (req: Request, res: Response) => {
		const reviewId: number = parseInt(req.params.id);

		try {
			const fetchReview = await sqlFetchReview(reviewId);
			if (fetchReview.length < 1) {
				res.send(`Review with ID ${reviewId} was not found in the database`);
			} else {
				res.send(fetchReview);
			}
		} catch (error) {
			res.send((error as Error).message);
			console.log((error as Error).message);
		}
	});
	//
	app.put('/review/:id', async (req: Request, res: Response) => {
		const reviewId: number = parseInt(req.params.id);
		const newContent = req.body.content;

		try {
			const updateReview = await sqlUpdateReview(reviewId, newContent);
			if (updateReview.length < 1) {
				res.send(`Review with ID ${reviewId} was not found in the database`);
			} else {
				res.send(updateReview);
			}
		} catch (error) {
			res.send((error as Error).message);
			console.log((error as Error).message);
		}
	});
	//
	app.post('/review', async (req: Request, res: Response) => {
		const newContent = req.body.content;

		try {
			const newReview = await sqlCreateReview(newContent);
			res.send(newReview);
		} catch (error) {
			res.send((error as Error).message);
			console.log((error as Error).message);
		}
	});
}
