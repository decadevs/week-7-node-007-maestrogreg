"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUser = exports.deleteUser = exports.getAllUsers = exports.createUser = void 0;
var fs_1 = __importDefault(require("fs"));
var data = require("./database/database.json");
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var incoming, user, num, currentID, user;
        return __generator(this, function (_a) {
            data = data;
            incoming = req.body;
            if (data.length === 0) {
                user = {
                    organization: incoming.organization,
                    createdAt: new Date(),
                    products: incoming.products,
                    marketValue: incoming.marketValue,
                    address: incoming.address,
                    ceo: incoming.ceo,
                    country: incoming.country,
                    id: 1,
                    noOfEmployees: incoming.noOfEmployees,
                    employees: incoming.employees
                };
                data.push(user);
                fs_1.default.writeFile(__dirname + "/database/database.json", JSON.stringify(data, null, 3), (function (error) {
                    if (error) {
                        console.log("error writing file");
                        res.status(400).send("error creating user");
                    }
                }));
                res.status(201).send(user);
            }
            else if (data.length > 0) {
                num = 1;
                currentID = data[data.length - 1].id;
                num += currentID;
                user = {
                    organization: incoming.organization,
                    createdAt: new Date(),
                    products: incoming.products,
                    marketValue: incoming.marketValue,
                    address: incoming.address,
                    ceo: incoming.ceo,
                    country: incoming.country,
                    id: num,
                    noOfEmployees: incoming.noOfEmployees,
                    employees: incoming.employees
                };
                data.push(user);
                fs_1.default.writeFile(__dirname + "/database/database.json", JSON.stringify(data, null, 3), function (error) {
                    if (error) {
                        console.log("error writing file");
                        res.status(400).send("error creating user");
                    }
                });
                res.status(201).send(user);
            }
            return [2 /*return*/];
        });
    });
}
exports.createUser = createUser;
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.status(200).json(data);
            return [2 /*return*/];
        });
    });
}
exports.getAllUsers = getAllUsers;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var item, index;
        return __generator(this, function (_a) {
            item = data.find(function (item) { return item.id === parseInt(req.params.id); });
            index = data.indexOf(item);
            data.splice(index, 1);
            fs_1.default.writeFile(__dirname + "/database/database.json", JSON.stringify(data, null, 3), function (error) {
                if (error)
                    console.log("error writing file");
            });
            res.status(200).send("User detail with ID number " + req.params.id + " deleted");
            return [2 /*return*/];
        });
    });
}
exports.deleteUser = deleteUser;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            user = data.find(function (item) { return item.id === parseInt(req.params.id); });
            if (!user) {
                return [2 /*return*/, res.status(404).json("Data with that id does not exist")];
            }
            res.status(200).send(user);
            return [2 /*return*/];
        });
    });
}
exports.getUser = getUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, incoming, index, currentProfile, current;
        return __generator(this, function (_a) {
            user = data.find(function (item) { return item.id === parseInt(req.params.id); });
            incoming = req.body;
            if (!user) {
                return [2 /*return*/, res.status(400).send("Data with that id does not exist")];
            }
            index = data.indexOf(user);
            currentProfile = data[index];
            current = {
                createdAt: currentProfile.createdAt,
                updatedAt: new Date(),
                organization: incoming.organization || currentProfile.organization,
                products: incoming.products || currentProfile.products,
                marketValue: incoming.marketValue || currentProfile.marketValue,
                address: incoming.address || currentProfile.address,
                ceo: incoming.ceo || currentProfile.ceo,
                country: incoming.country || currentProfile.country,
                noOfEmployees: incoming.noOfEmployees || currentProfile.noOfEmployees,
                employees: incoming.employees || currentProfile.employees
            };
            data[index] = __assign(__assign({}, current), { "id": user.id });
            fs_1.default.writeFile(__dirname + "/database/database.json", JSON.stringify(data, null, 3), function (error) {
                if (error) {
                    res.status(400).send("Error updating user");
                    console.log("error writing file");
                }
            });
            res.status(200).send(data[index]);
            return [2 /*return*/];
        });
    });
}
exports.updateUser = updateUser;
