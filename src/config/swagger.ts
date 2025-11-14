// src/config/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export const setupSwagger = (app: Express, port: number) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "AgriConnect API",
        version: "1.0.0",
        description: "API documentation for AgriConnect",
      },
      servers: [{ url: `http://localhost:${port}` }],
    },
    apis: ["./src/routes/*.ts"], // Swagger annotations in route files
  };

  const swaggerSpec = swaggerJsdoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
