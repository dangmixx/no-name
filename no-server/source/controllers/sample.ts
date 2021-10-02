import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

const NAMESPACE = 'Sample Controller';
console.log('Sample Call')
const sampleHealthCheckController = (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, `Sample health check call`);
	return res.status(200).json({
		message: 'pong',
	});
};

export { sampleHealthCheckController };
