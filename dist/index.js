"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const user_routes_1 = require("./routes/user.routes");
const auth_routes_1 = require("./routes/auth.routes");
const cart_routes_1 = require("./routes/cart.routes");
const review_routes_1 = require("./routes/review.routes");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET ||
    'jkasdfhjklsf789y34789yp3qihjsdf789uih3r9h7834qrfihupversuih345rtu'));
// Create a new SQLite database (or open an existing one)
// const db = new sqlite3.Database(':memory:');
(0, product_routes_1.default)(app);
(0, user_routes_1.Users)(app);
(0, auth_routes_1.Auth)(app);
(0, cart_routes_1.Cart)(app);
(0, review_routes_1.Reviews)(app);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
