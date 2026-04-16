# Portfolio Moderno Full-Stack

Este proyecto es un portfolio profesional construido con el stack MERN (para este caso, React, Node.js y Express con Tailwind CSS).

## 🚀 Tecnologías Utilizadas

- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Node.js, Express, CORS.
- **Iconos**: Lucide React.
- **Animaciones**: Framer Motion y Transiciones CSS.

## 🛠️ Estructura del Proyecto

```
/
├── client/          # Frontend (React + Vite)
├── server/          # Backend (Node.js + Express)
└── package.json    # Scripts de automatización
```

## 💻 Instalación y Ejecución

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

### 1. Clonar el repositorio (si aplica)
```bash
git clone <url-del-repositorio>
cd PortFolio
```

### 2. Instalar dependencias
Puedes instalar todas las dependencias (frontend y backend) desde la raíz:
```bash
npm run install-all
```
O manualmente:
```bash
cd client && npm install
cd ../server && npm install
```

### 3. Ejecutar el proyecto
Para ejecutar el frontend y el backend simultáneamente:
```bash
npm run dev
```

El servidor backend correrá en `http://localhost:5000` y el cliente en `http://localhost:5173`.

## 📁 Endpoints del API

- `GET /api/projects`: Obtiene la lista de proyectos mockeados.
- `POST /api/contact`: Recibe los datos del formulario de contacto.

## ✨ Características Especiales

- **Modo Oscuro/Claro**: Persistente mediante `localStorage`.
- **Diseño Responsive**: Mobile-first utilizando Tailwind CSS.
- **Animaciones Suaves**: Scroll suave y transiciones con Framer Motion.
- **Formulario de Contacto**: Integración con el backend y estados de carga/éxito.
