import dotenv from 'dotenv';

dotenv.config();

// CONFIG SERVER
const SERVER_PORT = process.env.SERVER_PORT || 5300;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_TOKEN_EXPIRE = process.env.SERVER_HOSTNAME || 60 * 60 * 24;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'noNameIssue';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'noNameSecretKey';

const SERVER = {
	hostname: SERVER_HOSTNAME,
	port: SERVER_PORT,
	token: {
		expiredTime: SERVER_TOKEN_EXPIRE,
		issuer: SERVER_TOKEN_ISSUER,
		secretKey: SERVER_TOKEN_SECRET,
	},
	durationCache: 900,
	checkPeriodCache: 1200
};

const MONGO_OPTIONS = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	socketTimeoutMS: 30000,
	keepAlive: true,
	autoIndex: true,
	retryWrites: false,
};

// CONFIG MONGOOSE DATABASE
const MONGO_USERNAME = process.env.MONGO_USERNAME || 'superuser_noname';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'superuser_password1';
const MONGO_URL = process.env.MONGO_URL || 'noname.7k7uf.mongodb.net/NoName';
const MONGO_HOST = process.env.MONGO_HOST || 'mongodb+srv';
const MONGO = {
	host: MONGO_URL,
	username: MONGO_USERNAME,
	password: MONGO_PASSWORD,
	options: MONGO_OPTIONS,
	url: `${MONGO_HOST}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URL}`,
};

// File Upload
const UPLOAD_FILE_SIZE_MB = process.env.UPLOAD_FILE_SIZE_MB || 3;
const UPLOAD_FILE_TYPE = process.env.UPLOAD_FILE_TYPE || 'image/png, image/jpeg';
const UPLOAD_FILE = {
	size: Number(UPLOAD_FILE_SIZE_MB) * 1024 * 1024,
	type: UPLOAD_FILE_TYPE
}

const config = {
	server: SERVER,
	mongo: MONGO,
	file: UPLOAD_FILE
};

export default config;
