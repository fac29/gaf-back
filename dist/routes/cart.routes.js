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
exports.Cart = Cart;
const sqlStatements_1 = require("../sqlStatements/sqlStatements");
function Cart(app) {
    //
    app.delete('/cart/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const cartId = parseInt(req.params.id);
        try {
            const deleteCart = yield (0, sqlStatements_1.sqlDeleteCart)(cartId);
            if (deleteCart === 'there were no changes as product does not exist') {
                res.send('there were no changes as cart does not exist');
            }
            else {
                res.send(`Cart with ID ${cartId} deleted successfully`);
            }
        }
        catch (error) {
            res.send(error.message);
            console.log(error.message);
        }
    }));
    //
    app.get('/cart/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const cartId = parseInt(req.params.id);
        try {
            const fetchCart = yield (0, sqlStatements_1.sqlFetchCart)(cartId);
            if (fetchCart.length < 1) {
                res.send(`Cart with ID ${cartId} was not found in the database`);
            }
            else {
                res.send(fetchCart);
            }
        }
        catch (error) {
            res.send(error.message);
            console.log(error.message);
        }
    }));
    //
    app.put('/cart/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const cartId = parseInt(req.params.id);
        //req.body should contain product id and quantitynumber
        const newContent = req.body.content;
        try {
            const updateCart = yield (0, sqlStatements_1.sqlUpdateCarts)(cartId, newContent);
            if (updateCart.length < 1) {
                res.send(`Cart with ID ${cartId} was not found in the database`);
            }
            else {
                res.send(updateCart);
            }
        }
        catch (error) {
            res.send(error.message);
            console.log(error.message);
        }
    }));
    //
    app.post('/cart', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const newContent = req.body.content;
        try {
            const newCart = yield (0, sqlStatements_1.sqlCreateCart)(newContent);
            res.send(newCart);
        }
        catch (error) {
            res.send(error.message);
            console.log(error.message);
        }
    }));
}
