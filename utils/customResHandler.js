export const customResponseHandler = (
  res,
  isError = false,
  statusCode,
  data = {},
  error = ""
) => {
  if (!res) throw new Error("Include res params in argument");

  if (isError) {
    res.status(statusCode || 400);
    return res.send({ status: "error", code: statusCode, error:JSON.stringify(error) });
  }

  res.status(statusCode || 200);
  return res.send({ status: "success", data, code: statusCode });
};
