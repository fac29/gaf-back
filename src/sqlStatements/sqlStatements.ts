const db = require('../../database/db.js');

export async function sqlDeleteProduct(productID: number) {
	try {
		const deleteProduct = await db
			.prepare(
				`
            DELETE FROM products
            WHERE id = ?
            `,
			)
			.run(productID);
		if (deleteProduct.changes === 0) {
			return 'there were no changes as product does not exist';
		} else {
			return deleteProduct;
		}
	} catch (error) {
		console.log((error as Error).message);
		return (error as Error).message;
	}
}

export async function sqlFetchProduct(productID: number) {
	try {
		const fetchProduct = await db
			.prepare(
				`
            * FROM products
            WHERE id = ?
            `,
			)
			.all(productID);
		if (fetchProduct.changes === 0) {
			return `Product was not found in the database`;
		} else {
			return fetchProduct;
		}
	} catch (error) {
		console.log((error as Error).message);
		return (error as Error).message;
	}
}
