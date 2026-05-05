# Portfolio Moderno Full-Stack

Este proyecto es un portfolio profesional construido con el stack MERN (para este caso, React, Node.js y Express con Tailwind CSS).

## 🚀 Tecnologías Utilizadas

- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Node.js, Express, MongoDB, Cloudflare R2 (S3 API).
- **Almacenamiento**: Cloudflare R2 para imágenes de proyectos.
- **Iconos**: Lucide React.
- **Animaciones**: Framer Motion y Transiciones CSS.

## 🛠️ Estructura del Proyecto

```
/
├── client/          # Frontend (React + Vite)
│   └── src/components/admin/ImageUpload.jsx # Componente avanzado de carga
├── server/          # Backend (Node.js + Express)
│   ├── config/s3Config.js   # Configuración de Cloudflare R2
│   └── services/imageService.js # Lógica de gestión de imágenes
└── package.json    # Scripts de automatización
```

## 💻 Instalación y Ejecución

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

### 1. Variables de Entorno
Crea un archivo `.env` en la carpeta `server` con las siguientes variables:
```env
PORT=3000
MONGODB_URI=tu_uri_de_mongodb
JWT_SECRET=tu_secreto
S3_API=tu_endpoint_de_r2
CLOUD_API=tu_access_key
CLOUD_API_SECRET=tu_secret_key
R2_BUCKET_NAME=tu_nombre_de_bucket
```

### 2. Instalar dependencias
... (resto de pasos) ...

## ✨ Características Especiales

- **Modo Oscuro/Claro**: Persistente mediante `localStorage`.
- **Diseño Responsive**: Mobile-first utilizando Tailwind CSS.
- **Gestión de Imágenes Avanzada**: 
  - Soporte para **Drag & Drop**.
  - **Paste desde el portapapeles** (ideal para screenshots rápidos).
  - Integración directa con **Cloudflare R2** para almacenamiento persistente y eficiente.
- **Panel de Administración**: Gestión completa de proyectos, habilidades y mensajes.
