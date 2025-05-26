# Droguería SaludPlus

Proyecto web para la gestión de inventario y registro de productos en una droguería.

## Estructura del Proyecto

- **index.html**: Página principal con información de la droguería y guía de uso.
- **registro.html**: Formulario para registrar nuevos productos.
- **productos.html**: Visualización del inventario de productos con paginación y acciones de edición/eliminación.
- **buscador.html**: Búsqueda y filtrado de productos.
- **css/styles.css**: Estilos personalizados para todo el sitio.
- **js/productos.js**: Lógica de manejo de productos, almacenamiento y eventos.
- **img/**: Carpeta con imágenes de productos y logotipos.

## Funcionalidades

- **Registro de productos**: Permite agregar productos con nombre, categoría, imagen (seleccionable), código, precio, laboratorio, stock y fecha de vencimiento.
- **Inventario**: Muestra todos los productos registrados, con paginación y opciones para editar o eliminar.
- **Buscador**: Permite buscar productos por nombre, categoría y precio máximo.
- **Persistencia**: Todos los productos se almacenan en `localStorage` del navegador.
- **Edición y eliminación**: Se pueden editar o eliminar productos desde la vista de inventario.
- **Imágenes**: Las imágenes de productos se seleccionan desde un menú desplegable con las opciones disponibles en la carpeta `/img`.

## Instalación y uso

1. Descarga o clona el repositorio en tu equipo.
2. Abre el archivo `index.html` en tu navegador.
3. Navega entre las páginas usando la barra de navegación.
4. Para registrar productos, utiliza el formulario en `registro.html`.
5. Visualiza y gestiona el inventario en `productos.html`.
6. Utiliza el buscador en `buscador.html` para filtrar productos.

## Estructura de carpetas recomendada

```
ProyectoFinal/
├── css/
│   └── styles.css
├── img/
│   └── rutas de todas las imagenes .jpg
├── js/
│   └── productos.js
├── index.html
├── registro.html
├── productos.html
├── buscador.html
└── README.md
```

## Notas

- Si no se muestran productos al inicio, limpia el `localStorage` del navegador y recarga la página.
- Las imágenes deben estar en la carpeta `/img` y coincidir con los nombres usados en el menú desplegable del formulario de registro.
- El proyecto está diseñado para funcionar en navegadores modernos y no requiere backend.

---
Desarrollado para Droguería SaludPlus.
