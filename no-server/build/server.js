"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const logging_1 = __importDefault(require("./config/logging"));
const config_1 = __importDefault(require("./config/config"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const path_1 = __importDefault(require("path"));
const product_router_1 = __importDefault(require("./routers/product-router"));
const category_router_1 = __importDefault(require("./routers/category-router"));
const user_router_1 = __importDefault(require("./routers/user-router"));
const uploadfile_router_1 = __importDefault(require("./routers/uploadfile-router"));
const NAMESPACE = 'Server No';
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(body_parser_1.default.json());
        this.connectDB();
        this.middleWare();
        this.setRuleOfApi();
        this.routerApp();
        this.startApp();
    }
    startApp() {
        const httpServer = http_1.default.createServer(this.app);
        httpServer.listen(config_1.default.server.port, () => logging_1.default.info(NAMESPACE, `Server running on [${config_1.default.server.hostname}:${config_1.default.server.port}]`));
    }
    connectDB() {
        mongoose_1.default
            .connect(config_1.default.mongo.url, config_1.default.mongo.options)
            .then((res) => {
            logging_1.default.info(NAMESPACE, 'Connected to Database');
        })
            .catch((err) => {
            logging_1.default.error(NAMESPACE, err.message, err);
        });
    }
    middleWare() {
        this.app.use((req, res, next) => {
            res.on('finish', () => {
                logging_1.default.info(NAMESPACE, `METHOD - [${req.method}] , URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
            });
            next();
        });
    }
    setRuleOfApi() {
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', '*');
            res.header('Access-Control-Allow-Methods', '*');
            if (req.method == 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'GET PUT POST DELETE OPTIONS');
                return res.status(200).json({});
            }
            // res.end();
            next();
        });
    }
    routerApp() {
        /** Upload File */
        this.app.use((0, express_fileupload_1.default)());
        this.app.use('/assets', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
        /** Routers */
        this.app.use('/api/file', uploadfile_router_1.default);
        /** Product Routers*/
        this.app.use('/api/category', category_router_1.default);
        /** Product Routers*/
        this.app.use('/api/product', product_router_1.default);
        this.app.use('/api/user', user_router_1.default);
        /** Error handle */
        this.app.use((req, res, next) => {
            const error = new Error('Not Found');
            return res.status(404).json({
                message: error.message,
            });
        });
    }
}
exports.default = Server;
/** Create the server */
const server = new Server();
