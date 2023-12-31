const jwt = require('jsonwebtoken');

let JWT_SECRET = process.env.JWT_SECRET || 'JAGUARJAGUARJAGUAR';

//GetToken
const getToken = (data, duration = '1d') => {
	return new Promise((accept, reject) => {
		jwt.sign(data, JWT_SECRET, { expiresIn: duration }, (err, token) => {
			if (err) {
				console.error(err);
				reject(err);
			} else {
				accept(token);
			}
		});
	});
};

//Verifytoken
const verifyToken = (token) => {
	return new Promise((accept, reject) => {
		jwt.verify(token, JWT_SECRET, (err, decoded) => {
			if (err) {
				reject(err);
			} else {
				// console.log("Data", decoded.email);
				accept(decoded);
			}
		});
	});
};

module.exports = { getToken, verifyToken };
