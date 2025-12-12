const { v4: uuidv4 } = require('uuid');

// Datos iniciales de ejemplo
const seedDocuments = [
  {
    id: uuidv4(),
    workspace_id: 'workspace-123',
    title: 'Documento de Bienvenida',
    icon: 'doc',
    content: {
      blocks: [
        {
          id: 'block-1',
          type: 'heading',
          content: 'Bienvenido a InsightFlow'
        },
        {
          id: 'block-2',
          type: 'paragraph',
          content: 'Este es un documento de ejemplo.'
        }
      ]
    },
    created_by: 'user-001',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted: false
  },
  {
    id: uuidv4(),
    workspace_id: 'workspace-123',
    title: 'Guia de Inicio',
    icon: 'guide',
    content: {
      blocks: [
        {
          id: 'block-1',
          type: 'heading',
          content: 'Primeros Pasos'
        }
      ]
    },
    created_by: 'user-001',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted: false
  }
];

module.exports = seedDocuments;