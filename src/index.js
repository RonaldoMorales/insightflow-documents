const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const documentsRoutes = require('./routes/documents');

const app = express();
const PORT = process.env.PORT || 3002;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.json({ 
    message: 'InsightFlow - Documents Service',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      createDocument: 'POST /documents',
      getDocument: 'GET /documents/:id',
      updateDocument: 'PATCH /documents/:id',
      deleteDocument: 'DELETE /documents/:id'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Documents Service' });
});

// Montar rutas de documentos
app.use('/documents', documentsRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint no encontrado',
    path: req.path 
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Documents Service en puerto ${PORT}`);
});