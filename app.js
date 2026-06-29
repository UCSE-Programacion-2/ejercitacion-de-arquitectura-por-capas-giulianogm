const express = require('express');
const app = express();

app.use(express.json());

// TODO: Configurar la conexión a la base de datos (MongoDB)
const connectDB = require('./config/db');
// TODO: Importar y usar las rutas de partidos
const partidoRoutes = require('./routes/partidoRoutes');

connectDB();
app.use('/partidos', partidoRoutes);
const PORT = process.env.PORT || 3000;

// Exportamos 'app' para poder hacer testing
module.exports = { app };

// Iniciar el servidor solo si este archivo se ejecuta directamente
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}
