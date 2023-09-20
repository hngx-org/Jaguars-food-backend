const errHandler = (err, req, res, next)=>{
    const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statuscode).json({
      status : "fail",
      message: err?.message,
      // stack: err?.stack,
    });
}

export default errHandler