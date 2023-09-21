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
        url: `http://localhost:${PORT}`,
      },
      {
        url: "https://jaguars-food-backend.vercel.app/",
      },
    ],
  },
  components: {
    securitySchemes: {
      BasicAuth: {
        type: "http",
        scheme: "basic",
        description: "Basic Authentication",
      },
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        description: "Bearer Token Authentication",
      },
    },
  },
  apis: ["./routes/*.js"],
  paths: {
    "/api/auth/login": {
      post: {
        summary: "Login",
        description: "Login to the application with email and password.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                    example: "user@example.com",
                  },
                  password: {
                    type: "string",
                    example: "password123",
                  },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Successful login",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "User authenticated successfully",
                    },
                    statusCode: {
                      type: "integer",
                      example: 200,
                    },
                    data: {
                      type: "object",
                      properties: {
                        access_token: {
                          type: "string",
                          example: "your-auth-token-here",
                        },
                        email: {
                          type: "string",
                          example: "email@mail.com",
                        },
                        id: {
                          type: "string",
                          example: "random_id",
                        },
                        isAdmin: {
                          type: "boolean",
                          example: true,
                        },
                      },
                    },
                  },
                  required: ["message", "statusCode", "data"],
                },
                example: {
                  message: "User authenticated successfully",
                  statusCode: 200,
                  data: {
                    access_token: "your-auth-token-here",
                    email: "email@mail.com",
                    id: "random_id",
                    isAdmin: true,
                  },
                },
              },
            },
          },
          400: {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Bad Request: Invalid input data",
                    },
                    statusCode: {
                      type: "integer",
                      example: 400,
                    },
                  },
                },
                example: {
                  message: "Bad Request: Invalid input data",
                  statusCode: 400,
                },
              },
            },
          },
        },
        security: [
          {
            BasicAuth: [], 
          },
          {
            BearerAuth: [],
          },
        ],
      },
    },
    // Add more API paths here
  },
};

const specs = SwaggerJsDoc(options);

export const docRouter = express.Router();

docRouter.use(`/`, SwaggerUi.serve, SwaggerUi.setup(specs));
docRouter.get(`/`, SwaggerUi.serve, SwaggerUi.setup(specs));
