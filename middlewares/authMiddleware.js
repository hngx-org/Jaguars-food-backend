import asyncHandler from "express-async-handler";
import { verifyToken } from "../utils/tokens";

const authMiddleware = asyncHandler(async (req, res, next) => {
  try {
    if (req.headers.authorization.startsWith("Bearer")) {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) throw new Error("Unauthorized");

      const data = await verifyToken(token);
      req.user = data;
      next();
    } else {
      throw new Error("Unauthorized! no token in header");
    }
  } catch (error) {
    throw new Error(error);
  }
});
export default authMiddleware;
