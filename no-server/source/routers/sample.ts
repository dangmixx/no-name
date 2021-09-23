import express from 'express';
import { sampleHealthCheckController } from '../controllers/sample';

const sampleRouter = express.Router();

sampleRouter.get('/ping', sampleHealthCheckController);

export = sampleRouter;
