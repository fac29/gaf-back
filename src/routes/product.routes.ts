import { Express } from 'express';
// import data from ??
require('dotenv').config();

export function Products(app: Express) {
	app.get('/products', (req, res) => {
		res.send('Get request to the product page all products listed here');
	});

	app.get('/products/:id', (req, res) => {
		const productId: number = parseInt(req.params.id);
		// function to get product with matching ID
		res.send(`Get request to the product page with ID of: ${productId}`);
	});

	app.get('/products/category/:category', (req, res) => {
		const productCategory = req.params.category as string;
		// function to get product with category
		res.send(
			`Get request to the product search page with category of: ${productCategory}`,
		);
	});
}

export default Products;
