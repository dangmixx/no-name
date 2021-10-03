import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import mongoose from 'mongoose';
import upload from 'express-fileupload'

import sampleRouters from './routers/sample';
import productRouter from './routers/product-router';
import categoryRouter from './routers/category-router';

const NAMESPACE = 'Server';
const app = express();


/** Connect to MongoDB */
mongoose.connect(config.mongo.url, config.mongo.options).then(res => {
	logging.info(NAMESPACE, 'Connected to Database');
}).catch(err => {
	logging.error(NAMESPACE, err.message, err)
});

/* Logging the request */

app.use((req, res, next) => {
	logging.info(NAMESPACE, `METHOD - [${req.method}] , URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

	res.on('finish', () => {
		logging.info(
			NAMESPACE,
			`METHOD - [${req.method}] , URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
		);
	});

	next();
});

/** Parse the request */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** Upload File */
app.use(upload())
/** Rule API*/

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Header', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');
	if (req.method == 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET PUT POST DELETE');
		return res.status(200).json({});
	}
	next();
});
/** Routers */
app.use('', sampleRouters);
/** Product Routers*/
app.use('/api/category', categoryRouter);
/** Product Routers*/
app.use('/api/product', productRouter);

/** Error handle */
app.use((req, res, next) => {
	const error = new Error('Not Found');
	return res.status(404).json({
		message: error.message,
	});
});

/** Create the server */

const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on [${config.server.hostname}:${config.server.port}]`));
