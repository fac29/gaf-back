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
                SELECT * FROM products
                WHERE id =?
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

export async function sqlRandomProducts() {
	try {
		const randomProducts = await db
			.prepare(
				`
            SELECT * FROM products
            ORDER BY RANDOM()
            LIMIT 3
            `,
			)
			.all();
		return randomProducts;
	} catch (error) {
		console.log((error as Error).message);
		return (error as Error).message;
	}
}

export async function sqlQueryProducts(searchQuery: Array<string>) {
	try {
	
		const searchTerms = await searchQuery.map(
			(term) => `(name LIKE '%${term}%' OR description LIKE '%${term}%')`
		  ).join(' OR ');
	  
		  const query = `
			SELECT * FROM products
			WHERE ${searchTerms}
		  `;
		  const searchedQueryProducts = await db.prepare(query).all();

		return searchedQueryProducts;
	} catch (error) {
		console.log((error as Error).message);
		return (error as Error).message;
	}
}
