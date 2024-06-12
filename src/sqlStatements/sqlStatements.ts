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
		/* ['sticky', 'pink', 'shoes'] */
		const statementPrep = await db.prepare(
			`
            SELECT * FROM products WHERE name LIKE ? OR description LIKE ?
            `,
		);
		const searchedQueryProducts = searchQuery.map((el) =>
			statementPrep.all(`${el}`),
		);

		return searchedQueryProducts;
	} catch (error) {
		console.log((error as Error).message);
		return (error as Error).message;
	}
}

// type Filters = {
// 	category?: string;
// 	size?: string;
// 	color?: string;
// 	description?: string;
// };
// const search_products = db.prepare(/*sql*/ `
//   SELECT
//     id,
//     name
//   FROM products
//   WHERE name LIKE ?
// AND category = ?
// AND size =?
// `);

// if (name)
//     search_products += AND category = category

// if (category)
//     search_products += AND category = category

// if (size)
//     search_products += AND size = size

// {gategory: shoes, size: S }
