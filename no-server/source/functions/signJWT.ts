import jwt from 'jsonwebtoken';
import config from '../config/config';
import logging from '../config/logging';
import IUser from '../interfaces/user';

const NAMESPACE = 'Auth';

const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void) => {
	const timeSignIn = new Date().getTime();
	const expiredTime = timeSignIn + Number(config.server.token.expiredTime) * 1000;
	logging.info(NAMESPACE, `Attempting to sign token for username: ${user.username}`);
	try {
		jwt.sign(
			{
				username: user.username,
			},
			config.server.token.secretKey,
			{
				issuer: config.server.token.issuer,
				algorithm: 'HS256',
				expiresIn: expiredTime,
			},
			(error, token) => {
				if (error) {
					callback(error, null);
				} else if (token) {
					callback(null, token);
				}
			}
		);
	} catch (error: any) {
		logging.error(NAMESPACE, error.message, error);
		callback(error, null);
	}
};

export default signJWT;
