import SwaggerJsDoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";
import express from "express";

const PORT = process.env.PORT || 4000;

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Free Lunch App",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: `"http://localhost:+${PORT}`,
      },
      {
        url: `https://jaguars-food-backend.vercel.app/`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = SwaggerJsDoc(options);

export const docRouter = express.Router();

docRouter.use(`/`, SwaggerUi.serve, SwaggerUi.setup(specs));
docRouter.get(`/`, SwaggerUi.serve, SwaggerUi.setup(specs));
