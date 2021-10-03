import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

const NAMESPACE = 'Sample Controller';
const sampleHealthCheckController = (req: Request, res: Response, next: NextFunction) => {
	res.sendFile(__dirname + '/index.html')
};

export { sampleHealthCheckController };
