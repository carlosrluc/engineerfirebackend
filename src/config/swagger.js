import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// 🔹 Configuración básica de Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Backend - Documentación",
      version: "1.0.0",
      description: "Documentación generada automáticamente con Swagger",
    },
    servers: [
      {
        url: "http://localhost:3307", // cambia si usas otro puerto o dominio
      },
    ],
  },
  // Rutas donde Swagger buscará documentación en los comentarios JSDoc
  apis: ["./src/routes/userRoutes.js"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
export { swaggerUi };
