# Dashboard Usuarios

Panel de administración de usuarios desarrollado con React 19, TypeScript y Bootstrap 5. Consume una API REST pública como fuente inicial de datos y persiste los cambios en `localStorage` entre sesiones.

## Características

- Listado de usuarios consumiendo la API de [JSONPlaceholder](https://jsonplaceholder.typicode.com/users)
- Persistencia en `localStorage`: los cambios se conservan al recargar la página
- Alta de usuarios mediante formulario modal con validación
- Eliminación de usuarios con actualización inmediata de la tabla
- Búsqueda en tiempo real por nombre (filtrado con `useMemo`)
- Estado de carga con spinner y manejo de errores en el fetch
- Botón de recarga para re-sincronizar desde la API
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
cd dashboard-react

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
dashboard-react/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/              # Imágenes y SVGs estáticos
│   ├── components/
│   │   ├── AddUserModal.tsx # Modal de alta de usuarios con validación
│   │   ├── Sidebar.tsx      # Barra lateral de navegación
│   │   ├── TopBar.tsx       # Encabezado con breadcrumb y estado de sesión
│   │   └── UserTable.tsx    # Tabla con búsqueda, carga, error y estado vacío
│   ├── App.tsx              # Componente raíz: estado global y layout principal
│   ├── main.tsx             # Punto de entrada de React
│   ├── types.ts             # Tipos TypeScript y constantes compartidas
│   └── index.css            # Estilos globales
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Funcionamiento

Al montar el componente `App` se ejecuta `fetchData`:

1. Busca usuarios en `localStorage`.
2. Si no hay datos guardados, hace fetch a la API de JSONPlaceholder.
3. Cualquier cambio (alta o baja) se persiste automáticamente en `localStorage`.
4. `UserTable` filtra el listado en tiempo real usando `useMemo` sobre el término de búsqueda.

```
Montaje → useEffect → localStorage ──(vacío)──→ fetch API → setUsers
                                  └─(con datos)─→ setUsers
setUsers → useEffect → localStorage.setItem (persiste cambios)
setUsers → useMemo filtra → tabla renderizada
```
