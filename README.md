# Dashboard Usuarios

Aplicación web de panel de control (dashboard) que muestra y filtra usuarios obtenidos desde una API REST. Desarrollada con React 19, TypeScript y Bootstrap 5.

## Características

- Listado de usuarios consumiendo la API de [JSONPlaceholder](https://jsonplaceholder.typicode.com/users)
- Búsqueda en tiempo real por nombre (filtrado con `useMemo`)
- Estado de carga con spinner de Bootstrap
- Manejo de errores en el fetch
- Tabla responsive con ID, usuario, email, dirección y teléfono
- Interfaz en español

## Stack tecnológico

| Herramienta | Versión | Rol |
|---|---|---|
| React | 19.x | UI library |
| TypeScript | 6.x | Tipado estático |
| Vite | 8.x | Build tool y dev server |
| Bootstrap | 5.3.x | Estilos y componentes UI |
| react-bootstrap | 2.10.x | Componentes Bootstrap para React |

## Requisitos previos

- Node.js 18 o superior
- npm 9 o superior

## Instalación y uso

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd dashboard-react-app

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`.

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo con HMR |
| `npm run build` | Compila TypeScript y genera el build de producción en `dist/` |
| `npm run preview` | Sirve el build de producción localmente |
| `npm run lint` | Ejecuta ESLint sobre los archivos `.ts` y `.tsx` |

## Estructura del proyecto

```
dashboard-react-app/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/          # Imágenes y SVGs estáticos
│   ├── App.tsx          # Componente principal con toda la lógica del dashboard
│   ├── App.css          # Estilos del componente
│   ├── main.tsx         # Punto de entrada de React
│   └── index.css        # Estilos globales
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
└── package.json
```

## Funcionamiento

Al montar el componente `App`, se realiza un `fetch` a `https://jsonplaceholder.typicode.com/users`. Los usuarios se almacenan en estado y se filtran reactivamente según el texto ingresado en el campo de búsqueda usando `useMemo`.

```
Montaje → useEffect → fetch API → setUsers → useMemo filtra → tabla renderizada
```
