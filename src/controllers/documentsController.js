const { v4: uuidv4 } = require('uuid');
const seedDocuments = require('../data/seedData');

// Base de datos en memoria
let documents = [...seedDocuments];

// Crear documento
const createDocument = (req, res) => {
  try {
    const { workspace_id, title, icon, content, created_by } = req.body;

    // Validar campos requeridos
    if (!workspace_id || !title || !created_by) {
      return res.status(400).json({ 
        error: 'Campos requeridos: workspace_id, title, created_by' 
      });
    }

    // Crear nuevo documento
    const newDocument = {
      id: uuidv4(),
      workspace_id,
      title,
      icon: icon || 'doc',
      content: content || { blocks: [] },
      created_by,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted: false
    };

    documents.push(newDocument);

    res.status(201).json({
      message: 'Documento creado exitosamente',
      document: newDocument
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al crear documento',
      details: error.message 
    });
  }
};

// Obtener documento por ID
const getDocumentById = (req, res) => {
  try {
    const { id } = req.params;
    const document = documents.find(doc => doc.id === id && !doc.deleted);

    if (!document) {
      return res.status(404).json({ 
        error: 'Documento no encontrado' 
      });
    }

    res.status(200).json({ document });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al obtener documento',
      details: error.message 
    });
  }
};

// Actualizar documento
const updateDocument = (req, res) => {
  try {
    const { id } = req.params;
    const { title, icon, content } = req.body;

    const documentIndex = documents.findIndex(doc => doc.id === id && !doc.deleted);

    if (documentIndex === -1) {
      return res.status(404).json({ 
        error: 'Documento no encontrado' 
      });
    }

    // Actualizar campos
    if (title !== undefined) documents[documentIndex].title = title;
    if (icon !== undefined) documents[documentIndex].icon = icon;
    if (content !== undefined) documents[documentIndex].content = content;
    
    documents[documentIndex].updated_at = new Date().toISOString();

    res.status(200).json({
      message: 'Documento actualizado',
      document: documents[documentIndex]
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al actualizar documento',
      details: error.message 
    });
  }
};

// Eliminar documento (Soft Delete)
const deleteDocument = (req, res) => {
  try {
    const { id } = req.params;

    const documentIndex = documents.findIndex(doc => doc.id === id && !doc.deleted);

    if (documentIndex === -1) {
      return res.status(404).json({ 
        error: 'Documento no encontrado' 
      });
    }

    // Soft delete
    documents[documentIndex].deleted = true;
    documents[documentIndex].deleted_at = new Date().toISOString();

    res.status(200).json({
      message: 'Documento eliminado',
      document: {
        id: documents[documentIndex].id,
        title: documents[documentIndex].title,
        deleted: true
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al eliminar documento',
      details: error.message 
    });
  }
};

module.exports = {
  createDocument,
  getDocumentById,
  updateDocument,
  deleteDocument
};