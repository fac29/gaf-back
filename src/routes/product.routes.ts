import { Express, Request, Response } from 'express';
import {
	sqlDeleteProduct,
	sqlFetchProduct,
	sqlRandomProducts,
	sqlQueryProducts,
} from '../sqlStatements/sqlStatements';

export function Products(app: Express) {
	app.delete('/product/:id', async (req: Request, res: Response) => {
		const productId: number = parseInt(req.params.id);
		try {
			const deleteProduct = await sqlDeleteProduct(productId);
			if (deleteProduct === 'there were no changes as product does not exist') {
				res.send('there were no changes as product does not exist');
			} else {
				res.send(`Product with ID${productId} deleted successfully`);
			}
		} catch (error) {
			res.send((error as Error).message);
			console.log((error as Error).message);
		}
	});

	app.get('/product/:id', async (req: Request, res: Response) => {
		const productId: number = parseInt(req.params.id);
		try {
			const fetchProduct = await sqlFetchProduct(productId);
			if (fetchProduct.length < 1) {
				res.send(`Product with ID${productId} was not found in the database`);
			} else {
				res.send(fetchProduct);
			}
		} catch (error) {
			res.send((error as Error).message);
			console.log((error as Error).message);
		}
	});

	app.get('/products/random', async (req: Request, res: Response) => {
		//'There were no products in the database'
		try {
			const randomProducts = await sqlRandomProducts();
			if (randomProducts.length < 1) {
				res.send('There were no products in the database');
			} else {
				res.send(randomProducts);
			}
		} catch (error) {
			res.send((error as Error).message);
			console.log((error as Error).message);
		}
	});

	app.get('/products', async (req: Request, res: Response) => {
		//const searchQuery = req.body;
		try {
			const queryProducts = await sqlQueryProducts(['iphone']);
			if (queryProducts.length < 1) {
				res.send(`There were no products in the database`);
			} else {
				res.send(queryProducts);
			}
		} catch (error) {
			res.send((error as Error).message);
			console.log((error as Error).message);
		}
	});
}

export default Products;
