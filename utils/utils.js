const bcrypt = require('bcrypt');

const hashPassword = (password) => {
	return bcrypt.hashSync(password, 10);
};

const verifyPassword = (password, passwordHash) => {
	return bcrypt.compareSync(password, passwordHash);
};

module.exports = {
	hashPassword,
	verifyPassword,
};
