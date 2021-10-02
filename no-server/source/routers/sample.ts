import express from 'express';
import { sampleHealthCheckController } from '../controllers/sample';

const sampleRouter = express.Router();
console.log('SampleRouter initialed');
sampleRouter.get('/ping', sampleHealthCheckController);

export = sampleRouter;
