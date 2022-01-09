"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const connect_1 = __importDefault(require("./db/connect"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const port = config_1.default.get("port");
const host = config_1.default.get("host");
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`);
    (0, connect_1.default)().then(() => {
        console.log('connected successfully');
    }).catch((err) => {
        console.log(err);
    });
    //connect()
});
//# sourceMappingURL=app.js.map