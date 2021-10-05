import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import bcryptjs from 'bcryptjs';
import mongoose, { ObjectId } from 'mongoose';
import User from '../models/user';
import signJWT from '../functions/signJWT';

const NAMESPACE = 'USER';
export class UserController {
	public static validateToken(req: Request, res: Response, next: NextFunction) {
		logging.info(NAMESPACE, 'Token validated!');
		return res.status(200).json({
			message: 'Token validated!',
		});
	}

	public static register(req: Request, res: Response, next: NextFunction) {
		const { username, password } = req.body;

		bcryptjs.hash(password, 10, (hashError, hash) => {
			if (hashError) {
				return res.status(500).json({
					message: hashError.message,
					error: hashError,
				});
			}
			// Insert DB
			const user = new User({
				username,
				password: hash,
			});

			return user
				.save()
				.then((user) => {
					return res.status(201).json({
						user,
					});
				})
				.catch((error) => {
					return res.status(500).json({
						message: error.message,
						error: error,
					});
				});
		});
	}

	public static login(req: Request, res: Response, next: NextFunction) {
		const { username, password } = req.body;
		User.findOne({ username: username })
			.exec()
			.then((users) => {
				if (!users) {
					return res.status(401).json({
						message: 'User not found',
					});
				}

				bcryptjs.compare(password, users.password, (error, result) => {
					logging.debug(NAMESPACE, 'user', { error, result });
					if (error || !result) {
						return res.status(401).json({
							message: 'Password not found match',
						});
					} else if (result) {
						signJWT(users, (errorJWT, token) => {
							logging.debug(NAMESPACE, 'user', { errorJWT, token });
							if (errorJWT) {
								return res.status(401).json({
									message: 'Unauthorized',
									error: errorJWT,
								});
							} else if (token) {
								return res.status(200).json({
									message: 'Auth successfully',
									token,
									user: users,
								});
							}
						});
					}
				});
			})
			.catch((error) => {
				return res.status(500).json({
					message: error.message,
					error: error,
				});
			});
	}

	public static logout(req: Request, res: Response, next: NextFunction) {}

	public static getAllUser(req: Request, res: Response, next: NextFunction) {
		User.find()
			.select('-password')
			.exec()
			.then((users) => {
				return res.status(200).json({
					items: users,
					total: users.length,
				});
			})
			.catch((error) => {
				return res.status(500).json({
					message: error.message,
					error: error,
				});
			});
	}
}
