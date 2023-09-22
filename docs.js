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
    "/api/auth/user/signup": {
      post: {
        summary: "User Signup",
        description: "Register a new user.",
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
                  first_name: {
                    type: "string",
                    example: "John",
                  },
                  last_name: {
                    type: "string",
                    example: "Doe",
                  },
                  phone_number: {
                    type: "string",
                    example: "123-456-7890",
                  },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "User successfully registered",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "User registered successfully",
                    },
                    statusCode: {
                      type: "integer",
                      example: 200,
                    },
                    data: {
                      type: "object",
                      properties: {
                        user_id: {
                          type: "string",
                          example: "123456789",
                        },
                      },
                    },
                  },
                  required: ["message", "statusCode", "data"],
                },
                example: {
                  message: "User registered successfully",
                  statusCode: 200,
                  data: {
                    user_id: "123456789",
                  },
                },
              },
            },
          },
          400: {
            description: "Bad Request: Invalid input data",
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
          // Add more response codes and descriptions as needed
        },
      },
    },
    "/api/organization/create": {
      put: {
        summary: "Create Organization",
        description: "Create an organization and assign a lunch prize. The user will be logged in automatically using the access token returned in the response. The access token is used to update the organization name and lunch price on the table.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  organization_name: {
                    type: "string",
                    example: "My Organization",
                  },
                  lunch_price: {
                    type: "string",
                    example: "#1000",
                  },
                },
                required: ["organization_name"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Organization created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Organization created successfully",
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
                        organization_id: {
                          type: "string",
                          example: "org123",
                        },
                      },
                    },
                  },
                  required: ["message", "statusCode", "data"],
                },
                example: {
                  message: "Organization created successfully",
                  statusCode: 200,
                  data: {
                    access_token: "your-auth-token-here",
                    organization_id: "org123",
                  },
                },
              },
            },
          },
          400: {
            description: "Bad Request: Invalid input data",
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
            BearerAuth: [], // Use Bearer Token Authentication for this endpoint
          },
        ],
      },
    },
    "/api/organization/staff/signup": {
      post: {
        summary: "Staff Signup",
        description: "Register a staff member. An OTP code will be sent to the user's email, and the token sent in the response should be used in the `otp_token` field.",
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
                  otp_token: {
                    type: "string",
                    example: "123456", // 6-digit token sent to inbox
                  },
                  first_name: {
                    type: "string",
                    example: "John",
                  },
                  last_name: {
                    type: "string",
                    example: "Doe",
                  },
                  phone_number: {
                    type: "string",
                    example: "123-456-7890",
                  },
                },
                required: ["email", "password", "otp_token"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Staff member registered successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Staff member registered successfully",
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
                        staff_id: {
                          type: "string",
                          example: "staff123",
                        },
                      },
                    },
                  },
                  required: ["message", "statusCode", "data"],
                },
                example: {
                  message: "Staff member registered successfully",
                  statusCode: 200,
                  data: {
                    access_token: "your-auth-token-here",
                    staff_id: "staff123",
                  },
                },
              },
            },
          },
          400: {
            description: "Bad Request: Invalid input data",
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
      },
    },
    "/api/organization/invite": {
      post: {
        summary: "Create Organization Invite (Admin Only)",
        description: "Allows an admin user to send an invitation to join the organization.",
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
                    example: "jane@example.com",
                  },
                },
                required: ["email"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Invitation sent successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "success",
                    },
                    statusCode: {
                      type: "integer",
                      example: 200,
                    },
                    data: {
                      type: "null",
                      example: null,
                    },
                  },
                  required: ["message", "statusCode", "data"],
                },
              },
            },
          },
        },
        security: [
          {
            BearerAuth: [], 
          },
        ],
      },
    },
    "/api/organization/wallet/update": {
      patch: {
        summary: "Update Organization Wallet Balance (Admin Only)",
        description: "Allows an admin user to update wallet balance.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  amount: {
                    type: "string",
                    example: "<balance>",
                  },
                },
                required: ["amount"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Wallet balance updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "success",
                    },
                    statusCode: {
                      type: "integer",
                      example: 200,
                    },
                    data: {
                      type: "null",
                      example: null,
                    },
                  },
                  required: ["message", "statusCode", "data"],
                },
              },
            },
          },
        },
        security: [
          {
            BearerAuth: [], 
          },
        ],
      },
    },
    "/api/user/profile": {
      get: {
        summary: "Get User Profile",
        description: "Fetches user profile data.",
        responses: {
          200: {
            description: "User data fetched successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "User data fetched successfully",
                    },
                    statusCode: {
                      type: "integer",
                      example: 200,
                    },
                    data: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                          example: "sdcsdc",
                        },
                        name: {
                          type: "string",
                          example: "John Doe",
                        },
                        email: {
                          type: "string",
                          example: "john@mail.com",
                        },
                        profile_picture: {
                          type: "string",
                          example: "user-profile-picture-url",
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
              },
            },
          },
        },
        security: [
          {
            BearerAuth: [], // Use Bearer Token Authentication for this endpoint
          },
        ],
      },
    },
  },
};

const specs = SwaggerJsDoc(options);

export const docRouter = express.Router();

docRouter.use(`/`, SwaggerUi.serve, SwaggerUi.setup(specs));
docRouter.get(`/`, SwaggerUi.serve, SwaggerUi.setup(specs));
