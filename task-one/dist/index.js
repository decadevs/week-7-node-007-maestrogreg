"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importStar(require("express"));
var controller_1 = require("./controller");
var app = express_1.default();
var router = express_1.Router();
app.use(express_1.json());
router
    .route('/')
    .get(controller_1.getAllUsers)
    .post(controller_1.createUser);
// /api/item/:id
router
    .route('/:id')
    .get(controller_1.getUser)
    .put(controller_1.updateUser)
    .delete(controller_1.deleteUser);
app.use("/api/data", router);
var PORT = process.env.PORT || 4444;
var server = app.listen(PORT, function () { return console.log("server is live on " + PORT); });
module.exports = server;
