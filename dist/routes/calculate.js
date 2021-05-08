"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var joi_1 = __importDefault(require("joi"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
//import data from '../database/database.json';
var data = require("../database/database.json");
var router = express_1.default.Router();
/* GET home page. */
function triangleArea(a, b, c) {
    a = Number(a);
    b = Number(b);
    c = Number(c);
    var perimeter = (a + b + c) / 2;
    var area = (Math.sqrt(perimeter)) * (perimeter - a) * (perimeter - b) * (perimeter - c);
    area = Number(area.toFixed(2));
    return area;
}
function circleArea(radius) {
    radius = Number(radius);
    var area = (Math.PI) * (Math.pow(radius, 2));
    area = Number(area.toFixed(2));
    return area;
}
function rectangleArea(length, breadth) {
    length = Number(length);
    var area = length * breadth;
    area = Number(area.toFixed(2));
    return area;
}
function squareArea(side) {
    side = Number(side);
    var area = Math.pow(side, 2);
    area = Number(area.toFixed(2));
    return area;
}
router.post('/calculate', function (req, res, next) {
    var itemName = req.body.shape;
    var dimension = req.body.dimension;
    itemName = itemName.toLowerCase();
    var array = ["square", "rectangle", "triangle", "circle"];
    if (!array.includes(itemName)) {
        res.status(400).send("Enter a valid shape");
    }
    else {
        if (itemName === "square") {
            var schema = joi_1.default.object({
                shape: joi_1.default.string().required(),
                dimension: joi_1.default.number().required()
            });
            var result = schema.validate(req.body);
            if (result.error) {
                res.status(400).send(result.error.details[0].message);
            }
            else {
                var area = squareArea(dimension);
                var newID = data[data.length - 1].id + 1;
                var valueObject = {
                    "shape": itemName,
                    "dimension": dimension,
                    "area": area,
                    "createdAt": new Date(),
                    "id": newID
                };
                data.push(valueObject);
                fs_1.default.writeFileSync(path_1.default.join(__dirname, '../', 'database/database.json'), JSON.stringify(data, null, 3));
                res.status(201).send(valueObject);
            }
        }
        else if (itemName === "circle") {
            var schema = joi_1.default.object({
                shape: joi_1.default.string().required(),
                dimension: joi_1.default.number().required()
            });
            var result = schema.validate(req.body);
            if (result.error) {
                res.status(400).send(result.error.details[0].message);
            }
            else {
                var area = circleArea(dimension);
                var newID = data[data.length - 1].id + 1;
                var valueObject = {
                    "shape": itemName,
                    "dimension": dimension,
                    "area": area,
                    "createdAt": new Date(),
                    "id": newID
                };
                data.push(valueObject);
                fs_1.default.writeFileSync(path_1.default.join(__dirname, '../', 'database/database.json'), JSON.stringify(data, null, 3));
                res.status(201).send(valueObject);
            }
        }
        else if (itemName === "rectangle") {
            var schema = joi_1.default.object({
                shape: joi_1.default.string().required(),
                dimension: joi_1.default.object({
                    a: joi_1.default.number().required(),
                    b: joi_1.default.number().required()
                }).length(2).required()
            });
            var result = schema.validate(req.body);
            if (result.error) {
                res.status(400).send(result.error.details[0].message);
            }
            else {
                var area = rectangleArea(dimension.a, dimension.b);
                var newID = data[data.length - 1].id + 1;
                var valueObject = {
                    "shape": itemName,
                    "dimension": dimension,
                    "area": area,
                    "createdAt": new Date(),
                    "id": newID
                };
                data.push(valueObject);
                fs_1.default.writeFileSync(path_1.default.join(__dirname, '../', 'database/database.json'), JSON.stringify(data, null, 3));
                res.status(201).send(valueObject);
            }
        }
        else if (itemName === "triangle") {
            var schema = joi_1.default.object({
                shape: joi_1.default.string().required(),
                dimension: joi_1.default.object({
                    a: joi_1.default.number().required(),
                    b: joi_1.default.number().required(),
                    c: joi_1.default.number().required()
                }).length(3).required()
            });
            var result = schema.validate(req.body);
            if (result.error) {
                res.status(400).send(result.error.details[0].message);
            }
            else {
                var area = triangleArea(dimension.a, dimension.b, dimension.c);
                var newID = data[data.length - 1].id + 1;
                var valueObject = {
                    "shape": itemName,
                    "dimension": dimension,
                    "area": area,
                    "createdAt": new Date(),
                    "id": newID
                };
                data.push(valueObject);
                fs_1.default.writeFileSync(path_1.default.join(__dirname, '../', 'database/database.json'), JSON.stringify(data, null, 3));
                res.status(201).send(valueObject);
            }
        }
    }
});
exports.default = router;
