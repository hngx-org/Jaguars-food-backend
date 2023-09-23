const errHandler = (err, req, res, next) => {
	const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
	res.status(statuscode).json({
		status: 'error',
		message: err?.message,
	});
};

module.exports = errHandler;
