"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlDeleteProduct = sqlDeleteProduct;
exports.sqlFetchProduct = sqlFetchProduct;
exports.sqlRandomProducts = sqlRandomProducts;
exports.sqlQueryProducts = sqlQueryProducts;
exports.sqlDeleteCart = sqlDeleteCart;
exports.sqlFetchCart = sqlFetchCart;
exports.sqlUpdateCarts = sqlUpdateCarts;
exports.sqlCreateCart = sqlCreateCart;
exports.sqlDeleteReview = sqlDeleteReview;
exports.sqlFetchReviews = sqlFetchReviews;
exports.sqlUpdateReview = sqlUpdateReview;
exports.sqlCreateReview = sqlCreateReview;
exports.sqlDeleteUser = sqlDeleteUser;
exports.sqlFetchUser = sqlFetchUser;
exports.sqlFetchUserByEmail = sqlFetchUserByEmail;
exports.sqlUpdateUser = sqlUpdateUser;
exports.sqlCreateUser = sqlCreateUser;
exports.sqlCreateSession = sqlCreateSession;
exports.sqlDeleteSession = sqlDeleteSession;
exports.sqlAverageRating = sqlAverageRating;
const db = require('../../database/db.js');
//section for product statements
function sqlDeleteProduct(productID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deleteProduct = yield db
                .prepare(`
            DELETE FROM products
            WHERE id = ?
            `)
                .run(productID);
            if (deleteProduct.changes === 0) {
                return 'there were no changes as product does not exist';
            }
            else {
                return deleteProduct;
            }
        }
        catch (error) {
            console.log(error.message);
            return error.message;
        }
    });
}
function sqlFetchProduct(productID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fetchProduct = yield db
                .prepare(`
                SELECT * FROM products
                WHERE id =?
                `)
                .all(productID);
            if (fetchProduct.length === 0) {
                return `Product was not found in the database`;
            }
            else {
                return fetchProduct;
            }
        }
        catch (error) {
            console.log(error.message);
            return error.message;
        }
    });
}
function sqlRandomProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const randomProducts = yield db
                .prepare(`
            SELECT * FROM products
            ORDER BY RANDOM()
            LIMIT 3
            `)
                .all();
            return randomProducts;
        }
        catch (error) {
            console.log(error.message);
            return error.message;
        }
    });
}
function sqlQueryProducts(searchQuery) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const searchTerms = yield searchQuery
                .map((term) => `(name LIKE '%${term}%' OR description LIKE '%${term}%')`)
                .join(' OR ');
            const query = `
			SELECT * FROM products
			WHERE ${searchTerms}
		  `;
            const searchedQueryProducts = yield db.prepare(query).all();
            return searchedQueryProducts;
        }
        catch (error) {
            console.log(error.message);
            return error.message;
        }
    });
}
//section for cart table
function sqlDeleteCart(cartId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deleteCart = yield db
                .prepare(`
            DELETE FROM carts
            WHERE id = ?
            `)
                .run(cartId);
            if (deleteCart.changes === 0) {
                return 'there were no changes as cart does not exist';
            }
            else {
                return deleteCart;
            }
        }
        catch (error) {
            console.log(error.message);
            return error.message;
        }
    });
}
function sqlFetchCart(cartId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fetchCart = yield db
                .prepare(`
                    SELECT * FROM carts
                    WHERE id =?
                    `)
                .all(cartId);
            if (fetchCart.length === 0) {
                return `Cart was not found in the database`;
            }
            else {
                return fetchCart;
            }
        }
        catch (error) {
            console.log(error.message);
            return error.message;
        }
    });
}
function sqlUpdateCarts(cartId, newContent) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Update the carts table
            const updateCart = yield db
                .prepare(`
                UPDATE carts
                SET completed = ?, completed_at = ?
                WHERE id = ?
                `)
                .run(newContent.completed, newContent.completed_at, cartId);
            if (updateCart.changes === 0) {
                return `Cart was not found in the database`;
            }
            // Update the products_carts table
            const updateProductCart = yield db
                .prepare(`
                UPDATE products_carts
                SET quantity = ?
                WHERE cart_id = ? AND products_id = ?
                `)
                .run(newContent.quantity, cartId, newContent.products_id);
            if (updateProductCart.changes === 0) {
                return `Product in cart was not found in the database`;
            }
            return `Cart with id ${cartId} was successfully updated`;
        }
        catch (error) {
            console.log(error.message);
            return error.message;
        }
    });
}
function sqlCreateCart(newContent) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const insertCart = yield db
                .prepare(`
                INSERT INTO carts (content)
                VALUES (?)
                `)
                .run(newContent);
            if (insertCart.changes === 0) {
                return `Failed to create a new cart`;
            }
            else {
                return `New cart with id ${insertCart.lastInsertRowid} was successfully created`;
            }
        }
        catch (error) {
            console.log(error.message);
            return error.message;
        }
    });
}
//section for review statements
function sqlDeleteReview(reviewId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deleteReview = yield db
                .prepare(`
            DELETE FROM reviews
            WHERE id = ?
            `)
                .run(reviewId);
            if (deleteReview.changes === 0) {
                return 'there were no changes as review does not exist';
            }
            else {
                return deleteReview;
            }
        }
        catch (error) {
            console.log(error.message);
            return error.message;
        }
    });
}
function sqlFetchReviews(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fetchReview = yield db
                .prepare(`
                SELECT * FROM reviews
                WHERE product_id =?
                `)
                .all(productId);
            return fetchReview;
        }
        catch (error) {
            console.log(error.message);
            return [];
        }
    });
}
function sqlUpdateReview(reviewId, newContent) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updateReview = yield db
                .prepare(`
                UPDATE reviews
                SET content = ?
                WHERE id = ?
                `)
                .run(newContent, reviewId);
            if (updateReview.changes === 0) {
                return `Review was not found in the database`;
            }
            else {
                return `Review with id ${reviewId} was successfully updated`;
            }
        }
        catch (error) {
            console.log(error.message);
            return error.message;
        }
    });
}
function sqlCreateReview(newContent) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const insertReview = yield db
                .prepare(`
                INSERT INTO reviews (content)
                VALUES (?)
                `)
                .run(newContent);
            if (insertReview.changes === 0) {
                return `Failed to create a new review`;
            }
            else {
                return `New review with id ${insertReview.lastInsertRowid} was successfully created`;
            }
        }
        catch (error) {
            console.log(error.message);
            return error.message;
        }
    });
}
//section for Use SQL statements
function sqlDeleteUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deleteUser = yield db
                .prepare(`
            DELETE FROM users
            WHERE id = ?
            `)
                .run(userId);
            if (deleteUser.changes === 0) {
                return 'there were no changes as user does not exist';
            }
            else {
                return deleteUser;
            }
        }
        catch (error) {
            console.log(error.message);
            return error.message;
        }
    });
}
function sqlFetchUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fetchUser = yield db
                .prepare(`
                SELECT * FROM users
                WHERE id = ?
                `)
                .all(userId);
            if (fetchUser.length === 0) {
                return `User was not found in the database`;
            }
            else {
                return fetchUser;
            }
        }
        catch (error) {
            console.log(error.message);
            return error.message;
        }
    });
}
function sqlFetchUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(email);
        try {
            const fetchUserByEmail = yield db
                .prepare(`
                SELECT * FROM users
                WHERE email = ?
                `)
                .all(email);
            if (fetchUserByEmail.length === 0) {
                return `User was not found in the database. Email provided: ${fetchUserByEmail}`;
            }
            else {
                // console.log('sqlStatements fetchUserByEmail:', ...fetchUserByEmail);
                return fetchUserByEmail;
            }
        }
        catch (error) {
            return error;
        }
    });
}
function sqlUpdateUser(userId, newContent) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updateUser = yield db
                .prepare(`
                UPDATE users
                SET content = ?
                WHERE id = ?
                `)
                .run(newContent, userId);
            if (updateUser.changes === 0) {
                return `User was not found in the database`;
            }
            else {
                return `User with id ${userId} was successfully updated`;
            }
        }
        catch (error) {
            console.log(error.message);
            return error.message;
        }
    });
}
// Create User
function sqlCreateUser(name, username, password, address, imagePath, email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const insertUser = yield db
                .prepare(`
                INSERT INTO users (name, username, password, address, image_path, email)
                VALUES (?, ?, ?, ?, ?, ?)
                `)
                .run(name, username, password, address, imagePath, email);
            if (insertUser.changes === 0) {
                return `Failed to create a new user`;
            }
            else {
                return `New user with id ${insertUser.lastInsertRowid} was successfully created`;
            }
        }
        catch (error) {
            return error;
        }
    });
}
// Create session
function sqlCreateSession(userId, expires_at) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const insertSession = yield db.prepare(`
		INSERT INTO sessions ( user_id, expires_at)
		VALUES ( ?, ?)
		`);
            const result = insertSession.run(userId, expires_at);
            if (result.changes === 0) {
                return `Failed to create a new session`;
            }
            else {
                return result.lastInsertRowid;
            }
        }
        catch (error) {
            console.log(error.message);
            return error.message;
        }
    });
}
// Delete session
function sqlDeleteSession(sessionId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deleteSession = yield db.prepare(`
		DELETE FROM sessions WHERE id = ?
		`);
            const result = deleteSession.run(sessionId);
            if (result.changes === 0) {
                return `Failed to delete session`;
            }
            else {
                return `Deleted session with id ${result.lastInsertRowid}`;
            }
        }
        catch (error) {
            console.log(error.message);
            return error.message;
        }
    });
}
function sqlAverageRating(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const averageRating = yield db
                .prepare(`
                SELECT ROUND(AVG(reviews.score),1) AS average_score
				FROM products JOIN reviews ON products.id = reviews.product_id
                WHERE products.id = ?
                `)
                .all(productId);
            if (averageRating.length === 0) {
                console.log(`No rating was found`);
            }
            return averageRating;
        }
        catch (error) {
            console.log(error.message);
            return error.message;
        }
    });
}
