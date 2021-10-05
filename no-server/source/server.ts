import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import mongoose from 'mongoose';
import upload from 'express-fileupload';
import path from 'path';

import UploadFileRouter from './routers/uploadfile-router';
import productRouter from './routers/product-router';
import categoryRouter from './routers/category-router';
import userRouter from './routers/user-router';
import uploadFileRouter from './routers/uploadfile-router';
const NAMESPACE = 'Server No';

export default class Server {
	app: express.Application;

	constructor() {
		this.app = express();
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.app.use(bodyParser.json());

		this.connectDB();
		this.middleWare();
		this.setRuleOfApi();
		this.routerApp();
		this.startApp();
	}

	public startApp() {
		const httpServer = http.createServer(this.app);
		httpServer.listen(config.server.port, () =>
			logging.info(NAMESPACE, `Server running on [${config.server.hostname}:${config.server.port}]`)
		);
	}

	private connectDB() {
		mongoose
			.connect(config.mongo.url, config.mongo.options)
			.then((res) => {
				logging.info(NAMESPACE, 'Connected to Database');
			})
			.catch((err) => {
				logging.error(NAMESPACE, err.message, err);
			});
	}

	private middleWare() {
		this.app.use((req, res, next) => {
			res.on('finish', () => {
				logging.info(
					NAMESPACE,
					`METHOD - [${req.method}] , URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
				);
			});
			next();
		});
	}

	private setRuleOfApi() {
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

	private routerApp() {
		/** Upload File */
		this.app.use(upload());
		this.app.use('/assets', express.static(path.join(__dirname, '../uploads')));
		/** Routers */
		this.app.use('/api/file', uploadFileRouter);
		/** Product Routers*/
		this.app.use('/api/category', categoryRouter);
		/** Product Routers*/
		this.app.use('/api/product', productRouter);
		this.app.use('/api/user', userRouter);

		/** Error handle */
		this.app.use((req, res, next) => {
			const error = new Error('Not Found');
			return res.status(404).json({
				message: error.message,
			});
		});
	}
}

/** Create the server */
const server = new Server();
