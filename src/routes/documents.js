const express = require('express');
const router = express.Router();

// Importar controladores
const {
  createDocument,
  getDocumentById,
  updateDocument,
  deleteDocument
} = require('../controllers/documentsController');

// Rutas
router.post('/', createDocument);
router.get('/:id', getDocumentById);
router.patch('/:id', updateDocument);
router.delete('/:id', deleteDocument);

module.exports = router;