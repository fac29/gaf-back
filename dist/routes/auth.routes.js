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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = Auth;
const sqlStatements_1 = require("../sqlStatements/sqlStatements");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function Auth(app) {
    app.post('/login', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const users = yield (0, sqlStatements_1.sqlFetchUserByEmail)(email);
            if (Array.isArray(users) && users.length > 0) {
                const user = users[0]; // Assuming email is unique and we get an array with a single user
                if (bcryptjs_1.default.compareSync(password, user.password)) {
                    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days from now
                    const sessionId = yield (0, sqlStatements_1.sqlCreateSession)(user.id, expiresAt);
                    console.log(`Created SessionID: ${sessionId}`);
                    if (typeof sessionId !== 'number') {
                        throw new Error('Failed to create session');
                    }
                    res.cookie('sid', sessionId, {
                        signed: true,
                        httpOnly: true,
                        maxAge: 604800000, // 7 days
                        sameSite: 'lax',
                    });
                    res.status(200).json({ message: 'Login successful' });
                }
                else {
                    res.status(401).json({ message: 'Invalid email or password' });
                }
            }
            else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        }
        catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({
                message: error instanceof Error ? error.message : 'An unknown error occurred',
            });
        }
    }));
    app.post('/logout', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const sessionId = req.signedCookies.sid;
            if (!sessionId) {
                return res
                    .status(400)
                    .json({ message: 'No session ID found in cookies' });
            }
            const result = yield (0, sqlStatements_1.sqlDeleteSession)(sessionId);
            res.clearCookie('sid');
            res.status(200).json({ message: 'Logout successful', result });
        }
        catch (error) {
            console.error('Error during logout:', error);
            res.status(500).json({
                message: error instanceof Error ? error.message : 'An unknown error occurred',
            });
        }
    }));
    app.post('/signup', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            // Retrieve values from the body setting defaults
            const { name, username = '', password, address = '', imagePath = '', email, } = req.body;
            if (!name || !password || !email) {
                return res.status(400).send('Bad input');
            }
            // Hash the password
            const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
            // Create the user in the DB
            const userResult = yield (0, sqlStatements_1.sqlCreateUser)(name, username, hashedPassword, address, imagePath, email);
            // Catch sql error if not unique
            if (userResult instanceof Error) {
                console.log(`Error caught as instance of Error. It is returning: ${userResult}`);
                return res
                    .status(400)
                    .json({ message: 'Error signing up, email already exists' });
            }
            console.log(userResult);
            console.log(`Created User: ${JSON.stringify(userResult)}`);
            //Check if we get a wrong answer
            if (typeof userResult !== 'string') {
                return res.status(500).send(userResult);
            }
            // Fetch the created user to get their ID
            const users = yield (0, sqlStatements_1.sqlFetchUserByEmail)(email);
            if (!Array.isArray(users) || users.length === 0) {
                return res.status(500).send('User creation failed');
            }
            const user = users[0];
            // Create the session with the new user's ID
            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days from now
            const sessionId = yield (0, sqlStatements_1.sqlCreateSession)(user.id, expiresAt);
            console.log(`Created SessionID: ${sessionId}`);
            if (typeof sessionId !== 'number') {
                return res.status(500).send('Failed to create session');
            }
            // Set a cookie with the session ID
            res.cookie('sid', sessionId, {
                signed: true,
                httpOnly: true,
                maxAge: 604800000, // 7 days from now
                sameSite: 'lax',
            });
            // Send a success response
            res.status(200).json({ message: 'Signup successful' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }));
}
