import { Express, Request, Response } from 'express';
import {
	sqlDeleteCart,
	sqlFetchCart,
	sqlUpdateCarts,
	sqlCreateCart,
} from '../sqlStatements/sqlStatements';

export function Cart(app: Express) {
	//
	app.delete('/cart/:id', async (req: Request, res: Response) => {
		const cartId: number = parseInt(req.params.id);
		try {
			const deleteCart = await sqlDeleteCart(cartId);
			if (deleteCart === 'there were no changes as product does not exist') {
				res.send('there were no changes as cart does not exist');
			} else {
				res.send(`Cart with ID ${cartId} deleted successfully`);
			}
		} catch (error) {
			res.send((error as Error).message);
			console.log((error as Error).message);
		}
	});
	//
	app.get('/cart/:id', async (req: Request, res: Response) => {
		const cartId: number = parseInt(req.params.id);

		try {
			const fetchCart = await sqlFetchCart(cartId);
			if (fetchCart.length < 1) {
				res.send(`Cart with ID ${cartId} was not found in the database`);
			} else {
				res.send(fetchCart);
			}
		} catch (error) {
			res.send((error as Error).message);
			console.log((error as Error).message);
		}
	});
	//
	app.put('/cart/:id', async (req: Request, res: Response) => {
		const cartId: number = parseInt(req.params.id);
		//req.body should contain product id and quantitynumber
		const newContent = req.body;

		try {
			const updateCart = await sqlUpdateCarts(cartId, newContent);
			if (updateCart.length < 1) {
				res.send(`Cart with ID ${cartId} was not found in the database`);
			} else {
				res.send(updateCart);
			}
		} catch (error) {
			res.send((error as Error).message);
			console.log((error as Error).message);
		}
	});
	//
	app.post('/cart', async (req: Request, res: Response) => {
		const uId = req.body.userId;
		try {
			const newCart = await sqlCreateCart(uId);
			res.send(newCart);
		} catch (error) {
			res.send((error as Error).message);
			console.log((error as Error).message);
		}
	});
}
