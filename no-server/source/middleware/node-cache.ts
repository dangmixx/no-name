import { Request, Response, NextFunction } from "express";
import NodeCache from "node-cache";
import config from "../config/config";
import logging from "../config/logging";

let myCache = new NodeCache({
	stdTTL: config.server.durationCache,
	checkperiod: config.server.checkPeriodCache
});

export default class CacheProvider {
	public static cacheRequest(req: Request, res: any, next: NextFunction) {
		if (req.method !== 'GET') {
			logging.warn('CACHE', 'Cannot caching non-GET method!');
			return next();
		}
		const key = req.originalUrl;
		const cachedResponse = myCache.get(key);
		logging.warn('CACHE', 'Called');
		if (cachedResponse) {
			res.send(cachedResponse);
			logging.warn('CACHE', 'Send');
		} else {
			res.sendResponse = res.send;
			res.send = (body: any) => {
				logging.warn('CACHE', 'Set');
				myCache.set(key, body, config.server.durationCache);
				res.sendResponse(body)
			}
			next();
		}
	}

	public static clearCache() {
		myCache = new NodeCache({
			stdTTL: config.server.durationCache,
			checkperiod: config.server.checkPeriodCache
		});
	}
}
