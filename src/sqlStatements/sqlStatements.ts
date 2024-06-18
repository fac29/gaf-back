const db = require('../../database/db.js');

//section for product statements
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

export async function sqlFetchReviews(productId: number) {
	try {
		const fetchReview = await db
			.prepare(
				`
                SELECT * FROM reviews
                WHERE product_id =?
                `,
			)
			.all(productId);
		return fetchReview;
	} catch (error) {
		console.log((error as Error).message);
		return [];
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

//section for Use SQL statements
export async function sqlDeleteUser(userId: number) {
	try {
		const deleteUser = await db
			.prepare(
				`
            DELETE FROM users
            WHERE id = ?
            `,
			)
			.run(userId);
		if (deleteUser.changes === 0) {
			return 'there were no changes as user does not exist';
		} else {
			return deleteUser;
		}
	} catch (error) {
		console.log((error as Error).message);
		return (error as Error).message;
	}
}

export async function sqlFetchUser(userId: number) {
	try {
		const fetchUser = await db
			.prepare(
				`
                SELECT * FROM users
                WHERE id = ?
                `,
			)
			.all(userId);
		if (fetchUser.length === 0) {
			return `User was not found in the database`;
		} else {
			return fetchUser;
		}
	} catch (error) {
		console.log((error as Error).message);
		return (error as Error).message;
	}
}

export async function sqlFetchUserByEmail(email: string) {
	try {
		const fetchUserByEmail = await db
			.prepare(
				`
                SELECT * FROM users
                WHERE email = ?
                `,
			)
			.all(email);
		if (fetchUserByEmail.length === 0) {
			return `User was not found in the database`;
		} else {
			return fetchUserByEmail;
		}
	} catch (error) {
		console.log((error as Error).message);
		return (error as Error).message;
	}
}

export async function sqlUpdateUser(userId: number, newContent: any) {
	try {
		const updateUser = await db
			.prepare(
				`
                UPDATE users
                SET content = ?
                WHERE id = ?
                `,
			)
			.run(newContent, userId);

		if (updateUser.changes === 0) {
			return `User was not found in the database`;
		} else {
			return `User with id ${userId} was successfully updated`;
		}
	} catch (error) {
		console.log((error as Error).message);
		return (error as Error).message;
	}
}

// Create User
export async function sqlCreateUser(
	name: string,
	username: string,
	password: string,
	address: string,
	imagePath: string,
	email: string,
) {
	try {
		const insertUser = await db
			.prepare(
				`
                INSERT INTO users (name, username, password, address, image_path, email)
                VALUES (?, ?, ?, ?, ?, ?)
                `,
			)
			.run(name, username, password, address, imagePath, email);

		if (insertUser.changes === 0) {
			return `Failed to create a new user`;
		} else {
			return `New user with id ${insertUser.lastInsertRowid} was successfully created`;
		}
	} catch (error) {
		if (error instanceof Error) {
			if (error.message.includes('UNIQUE constraint failed')) {
				return `Error: Email already exists`;
			} else {
				console.log(error.message);
				return error.message;
			}
		} else {
			console.log('Unknown error occurred');
			return 'Unknown error occurred';
		}
	}
}

// Create session
export async function sqlCreateSession(userId: number, expires_at: string) {
	try {
		const insertSession = await db.prepare(
			`
		INSERT INTO sessions ( user_id, expires_at)
		VALUES ( ?, ?)
		`,
		);
		const result = insertSession.run(userId, expires_at);
		if (result.changes === 0) {
			return `Failed to create a new session`;
		} else {
			return result.lastInsertRowid;
		}
	} catch (error) {
		console.log((error as Error).message);
		return (error as Error).message;
	}
}

// Delete session
export async function sqlDeleteSession(sessionId: number) {
	try {
		const deleteSession = await db.prepare(
			`
		DELETE FROM sessions WHERE id = ?
		`,
		);
		const result = deleteSession.run(sessionId);
		if (result.changes === 0) {
			return `Failed to delete session`;
		} else {
			return `Deleted session with id ${result.lastInsertRowid}`;
		}
	} catch (error) {
		console.log((error as Error).message);
		return (error as Error).message;
	}
}
