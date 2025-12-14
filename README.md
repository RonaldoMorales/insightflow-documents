# InsightFlow - Documents Service

Servicio de gestión de documentos para la plataforma InsightFlow.

## Arquitectura y Patrón de Diseño

**Patrón**: MVC (Modelo-Vista-Controlador) adaptado para APIs REST

- **Modelo**: Datos en memoria (`src/data/seedData.js`)
- **Controlador**: Lógica de negocio (`src/controllers/documentsController.js`)
- **Vista**: Respuestas JSON

**Arquitectura**: Microservicio independiente con datos en memoria, containerizado con Docker.

## Tecnologías

- Node.js 18
- Express.js
- UUID v4
- Docker
- GitHub Actions
- Render

## Estructura del Proyecto

```
insightflow-documents/
├── .github/workflows/deploy.yml    # Pipeline CI/CD
├── src/
│   ├── index.js                    # Servidor principal
│   ├── routes/documents.js         # Rutas HTTP
│   ├── controllers/documentsController.js  # Lógica CRUD
│   └── data/seedData.js           # Datos iniciales
├── Dockerfile
└── package.json
```

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/health` | Verificar estado del servicio |
| GET | `/` | Información del servicio |
| POST | `/documents` | Crear documento |
| GET | `/documents` | Listar documentos activos |
| GET | `/documents/:id` | Obtener documento por ID |
| PATCH | `/documents/:id` | Actualizar documento |
| DELETE | `/documents/:id` | Eliminar documento (soft delete) |

### Ejemplos de Uso

**Crear documento:**
```bash
POST /documents
Content-Type: application/json

{
  "workspace_id": "workspace-123",
  "title": "Mi Documento",
  "icon": "document",
  "content": { "blocks": [] },
  "created_by": "user-001"
}
```

**Actualizar documento:**
```bash
PATCH /documents/{id}
Content-Type: application/json

{
  "title": "Nuevo título",
  "icon": "new-icon"
}
```

## Ejecutar Localmente

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Ejecutar en producción
npm start
```

Servidor disponible en: `http://localhost:3002`

## Ejecutar con Docker

```bash
# Construir imagen
docker build -t insightflow-documents .

# Ejecutar contenedor
docker run -p 3002:3002 insightflow-documents
```

## Pipeline CI/CD

El pipeline se activa automáticamente al hacer push a `main`:

1. **Build**: Construye imagen Docker
2. **Push**: Publica en Docker Hub
3. **Deploy**: Llama webhook de Render para redesplegar

### Secrets requeridos en GitHub:
- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`
- `RENDER_DEPLOY_HOOK_URL`

## URL en Producción

**Servicio**: https://insightflow-documents-drw9.onrender.com

## Datos de Ejemplo

El servicio incluye 2 documentos de prueba que se reinician en cada despliegue.
