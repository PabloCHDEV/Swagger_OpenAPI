const app = require("./src/app");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log("============================================");
  console.log("Swagger UI iniciado correctamente");
  console.log(`Servidor local: http://localhost:${PORT}`);
  console.log(`Documentación: http://localhost:${PORT}/api-docs`);
  console.log(`OpenAPI JSON: http://localhost:${PORT}/openapi.json`);
  console.log("============================================");
});