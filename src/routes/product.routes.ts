import { Express, Request, Response } from 'express';
import {
	sqlDeleteProduct,
	sqlFetchProduct,
} from '../sqlStatements/sqlStatements';

export function Products(app: Express) {
	app.get('/products', (req, res) => {
		res.send('Get request to the product page all products listed here');
	});

	app.get('/products/category/:category', (req, res) => {
		const productCategory = req.params.category as string;
		// function to get product with category
		res.send(
			`Get request to the product search page with category of: ${productCategory}`,
		);
	});

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
			if (!fetchProduct.id) {
				res.send(`Product with ID${productId} was not found in the database`);
			} else {
				res.send(fetchProduct);
			}
		} catch (error) {
			res.send((error as Error).message);
			console.log((error as Error).message);
		}
	});
}

export default Products;
