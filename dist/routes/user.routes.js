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
exports.Users = Users;
const sqlStatements_1 = require("../sqlStatements/sqlStatements");
function Users(app) {
    //
    app.delete('/user/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const userId = parseInt(req.params.id);
        try {
            const deleteUser = yield (0, sqlStatements_1.sqlDeleteUser)(userId);
            if (deleteUser === 'there were no changes as user does not exist') {
                res.send('there were no changes as user does not exist');
            }
            else {
                res.send(`User with ID ${userId} deleted successfully`);
            }
        }
        catch (error) {
            res.send(error.message);
            console.log(error.message);
        }
    }));
    //
    app.get('/user/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const userId = parseInt(req.params.id);
        try {
            const fetchUser = yield (0, sqlStatements_1.sqlFetchUser)(userId);
            if (fetchUser.length < 1) {
                res.send(`User with ID ${userId} was not found in the database`);
            }
            else {
                res.send(fetchUser);
            }
        }
        catch (error) {
            res.send(error.message);
            console.log(error.message);
        }
    }));
    //
    app.put('/user/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const userId = parseInt(req.params.id);
        const newContent = req.body.content;
        try {
            const updateUser = yield (0, sqlStatements_1.sqlUpdateUser)(userId, newContent);
            if (updateUser.length < 1) {
                res.send(`User with ID ${userId} was not found in the database`);
            }
            else {
                res.send(updateUser);
            }
        }
        catch (error) {
            res.send(error.message);
            console.log(error.message);
        }
    }));
    //
    app.post('/user', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { name, username, password, address, imagePath, email } = req.body;
        try {
            // Create the user in the DB
            const newUser = yield (0, sqlStatements_1.sqlCreateUser)(name, username, password, address, imagePath, email);
            res.status(201).send(newUser);
        }
        catch (error) {
            res.send(error.message);
            console.log(error.message);
        }
    }));
}
