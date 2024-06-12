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
		if (fetchProduct.length === 0) {
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
		const searchTerms = await searchQuery
			.map((term) => `(name LIKE '%${term}%' OR description LIKE '%${term}%')`)
			.join(' OR ');

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

//section for cart table
export async function sqlDeleteCart(cartId: number) {
	try {
		const deleteCart = await db
			.prepare(
				`
            DELETE FROM carts
            WHERE id = ?
            `,
			)
			.run(cartId);
		if (deleteCart.changes === 0) {
			return 'there were no changes as cart does not exist';
		} else {
			return deleteCart;
		}
	} catch (error) {
		console.log((error as Error).message);
		return (error as Error).message;
	}
}

export async function sqlFetchCart(cartId: number) {
	try {
		const fetchCart = await db
			.prepare(
				`
                    SELECT * FROM carts
                    WHERE id =?
                    `,
			)
			.all(cartId);
		if (fetchCart.length === 0) {
			return `Cart was not found in the database`;
		} else {
			return fetchCart;
		}
	} catch (error) {
		console.log((error as Error).message);
		return (error as Error).message;
	}
}

export async function sqlUpdateCart(cartId: number, newContent: any) {
	try {
		const updateCart = await db
			.prepare(
				`
                UPDATE carts
                SET content = ?
                WHERE id = ?
                `,
			)
			.run(newContent, cartId);

		if (updateCart.changes === 0) {
			return `Cart was not found in the database`;
		} else {
			return `Cart with id ${cartId} was successfully updated`;
		}
	} catch (error) {
		console.log((error as Error).message);
		return (error as Error).message;
	}
}

export async function sqlCreateCart(newContent: any) {
	try {
		const insertCart = await db
			.prepare(
				`
                INSERT INTO carts (content)
                VALUES (?)
                `,
			)
			.run(newContent);

		if (insertCart.changes === 0) {
			return `Failed to create a new cart`;
		} else {
			return `New cart with id ${insertCart.lastInsertRowid} was successfully created`;
		}
	} catch (error) {
		console.log((error as Error).message);
		return (error as Error).message;
	}
}

//section for review statements
export async function sqlDeleteReview(reviewId: number) {
	try {
		const deleteReview = await db
			.prepare(
				`
            DELETE FROM reviews
            WHERE id = ?
            `,
			)
			.run(reviewId);
		if (deleteReview.changes === 0) {
			return 'there were no changes as review does not exist';
		} else {
			return deleteReview;
		}
	} catch (error) {
		console.log((error as Error).message);
		return (error as Error).message;
	}
}

export async function sqlFetchReview(reviewId: number) {
	try {
		const fetchReview = await db
			.prepare(
				`
                SELECT * FROM reviews
                WHERE id =?
                `,
			)
			.all(reviewId);
		if (fetchReview.length === 0) {
			return `Review was not found in the database`;
		} else {
			return fetchReview;
		}
	} catch (error) {
		console.log((error as Error).message);
		return (error as Error).message;
	}
}

export async function sqlUpdateReview(reviewId: number, newContent: any) {
	try {
		const updateReview = await db
			.prepare(
				`
                UPDATE reviews
                SET content = ?
                WHERE id = ?
                `,
			)
			.run(newContent, reviewId);

		if (updateReview.changes === 0) {
			return `Review was not found in the database`;
		} else {
			return `Review with id ${reviewId} was successfully updated`;
		}
	} catch (error) {
		console.log((error as Error).message);
		return (error as Error).message;
	}
}

export async function sqlCreateReview(newContent: any) {
	try {
		const insertReview = await db
			.prepare(
				`
                INSERT INTO reviews (content)
                VALUES (?)
                `,
			)
			.run(newContent);

		if (insertReview.changes === 0) {
			return `Failed to create a new review`;
		} else {
			return `New review with id ${insertReview.lastInsertRowid} was successfully created`;
		}
	} catch (error) {
		console.log((error as Error).message);
		return (error as Error).message;
	}
}
