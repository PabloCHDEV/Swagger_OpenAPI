const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const app = express();

// Permite recibir información en formato JSON.
app.use(express.json());

// Permite recibir formularios application/x-www-form-urlencoded.
app.use(
  express.urlencoded({
    extended: true
  })
);

// Ruta absoluta del archivo openapi.yaml.
const openApiPath = path.join(
  __dirname,
  "..",
  "docs",
  "openapi.yaml"
);

// Cargar la especificación OpenAPI.
const openApiDocument = YAML.load(openApiPath);

// Ruta principal del prototipo.
app.get("/", (req, res) => {
  res.json({
    nombre: "Documentación de API de Interoperabilidad",
    estado: "activo",
    swagger: "/api-docs",
    openapi: "/openapi.json"
  });
});

// Publicar el documento OpenAPI en formato JSON.
app.get("/openapi.json", (req, res) => {
  res.status(200).json(openApiDocument);
});

// Configuración de Swagger UI.
const swaggerUiOptions = {
  explorer: true,
  customSiteTitle: "API de Interoperabilidad",
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    tryItOutEnabled: true
  }
};

// Publicar Swagger UI.
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(openApiDocument, swaggerUiOptions)
);

// Respuesta para rutas que no existen en este servidor.
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    ruta: req.originalUrl
  });
});

// Manejador general de errores.
app.use((error, req, res, next) => {
  console.error("Error interno:", error);

  res.status(500).json({
    error: "Error interno del servidor"
  });
});

module.exports = app;