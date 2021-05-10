"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var data = require("../database/database.json");
/* GET users listing. */
router.get('/fetchRecords', function (req, res, next) {
    res.status(200).json(data);
});
router.get('/fetchData/:id', function (req, res, next) {
    //let file = data.find((item) => item.id === req.params.id)
    res.send('respond with a resource');
});
exports.default = router;
