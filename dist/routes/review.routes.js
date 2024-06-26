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
exports.Reviews = Reviews;
const sqlStatements_1 = require("../sqlStatements/sqlStatements");
function Reviews(app) {
    //
    app.delete('/review/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const reviewId = parseInt(req.params.id);
        try {
            const deleteReview = yield (0, sqlStatements_1.sqlDeleteReview)(reviewId);
            if (deleteReview === 'there were no changes as product does not exist') {
                res.send('there were no changes as cart does not exist');
            }
            else {
                res.send(`Review with ID ${reviewId} deleted successfully`);
            }
        }
        catch (error) {
            res.send(error.message);
            console.log(error.message);
        }
    }));
    //
    app.get('/review/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const reviewId = parseInt(req.params.id);
        try {
            const fetchReview = yield (0, sqlStatements_1.sqlFetchReviews)(reviewId);
            if (fetchReview.length < 1) {
                res
                    .status(404)
                    .json({
                    message: `Review with ID ${reviewId} was not found in the database`,
                });
            }
            else {
                res.status(200).json(fetchReview);
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
            console.log(error.message);
        }
    }));
    //
    app.put('/review/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const reviewId = parseInt(req.params.id);
        const newContent = req.body.content;
        try {
            const updateReview = yield (0, sqlStatements_1.sqlUpdateReview)(reviewId, newContent);
            if (updateReview.length < 1) {
                res.send(`Review with ID ${reviewId} was not found in the database`);
            }
            else {
                res.send(updateReview);
            }
        }
        catch (error) {
            res.send(error.message);
            console.log(error.message);
        }
    }));
    //
    app.post('/review', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const newContent = req.body.content;
        try {
            const newReview = yield (0, sqlStatements_1.sqlCreateReview)(newContent);
            res.send(newReview);
        }
        catch (error) {
            res.send(error.message);
            console.log(error.message);
        }
    }));
}
