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
exports.Products = Products;
const sqlStatements_1 = require("../sqlStatements/sqlStatements");
function Products(app) {
    app.delete('/product/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const productId = parseInt(req.params.id);
        try {
            const deleteProduct = yield (0, sqlStatements_1.sqlDeleteProduct)(productId);
            if (deleteProduct === 'there were no changes as product does not exist') {
                res.send('there were no changes as product does not exist');
            }
            else {
                res.send(`Product with ID${productId} deleted successfully`);
            }
        }
        catch (error) {
            res.send(error.message);
            console.log(error.message);
        }
    }));
    app.get('/product/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const productId = parseInt(req.params.id);
        try {
            const fetchProduct = yield (0, sqlStatements_1.sqlFetchProduct)(productId);
            if (fetchProduct.length < 1) {
                res.send(`Product with ID${productId} was not found in the database`);
            }
            else {
                res.send(fetchProduct);
            }
        }
        catch (error) {
            res.send(error.message);
            console.log(error.message);
        }
    }));
    app.get('/products/random', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const randomProducts = yield (0, sqlStatements_1.sqlRandomProducts)();
            if (randomProducts.length < 1) {
                res.send({ message: 'There were no products in the database' });
            }
            else {
                res.send(randomProducts);
            }
        }
        catch (error) {
            res.send(error.message);
            console.log(error.message);
        }
    }));
    app.get('/products', (req, res) => __awaiter(this, void 0, void 0, function* () {
        //const searchQuery = req.body;
        try {
            const queryProducts = yield (0, sqlStatements_1.sqlQueryProducts)(['iphone']);
            if (queryProducts.length < 1) {
                res.send(`There were no products in the database`);
            }
            else {
                res.send(queryProducts);
            }
        }
        catch (error) {
            res.send(error.message);
            console.log(error.message);
        }
    }));
    app.post('/products', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const searchQuery = req.body;
        try {
            const queryProducts = yield (0, sqlStatements_1.sqlQueryProducts)(searchQuery);
            if (queryProducts.length < 1) {
                res.send(`There were no products in the database`);
            }
            else {
                res.send(queryProducts);
            }
        }
        catch (error) {
            res.send(error.message);
            console.log(error.message);
        }
    }));
    app.get('/productscore/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const productId = parseInt(req.params.id);
        try {
            const fetchProduct = yield (0, sqlStatements_1.sqlAverageRating)(productId);
            if (fetchProduct.length < 1) {
                console.log(`No rating for ID${productId} was not found in the database`);
            }
            res.send(fetchProduct);
        }
        catch (error) {
            res.send(error.message);
            console.log(error.message);
        }
    }));
}
exports.default = Products;
