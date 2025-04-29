// ==============================================
// 1. VARIABLES GLOBALES (Array y localStorage)
// ==============================================
let productos = JSON.parse(localStorage.getItem('productos')) || [];

// ==============================================
// 2. FUNCIONES PRINCIPALES
// ==============================================

// Función para guardar productos en localStorage
function guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(productos));
}

// Función para mostrar productos en productos.html (con paginación)
function mostrarProductos(pagina = 1) {
    const productosPorPagina = 15;
    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productos.slice(inicio, fin);

    let html = '';
    productosPagina.forEach(producto => {
        html += `
            <div class="product-card" data-id="${producto.codigo}">
                <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='img/default.png'">
                <div class="product-info">
                    <h3>${producto.nombre}</h3>
                    <p>Código: ${producto.codigo}</p>
                    <p>Precio: $${producto.precio.toLocaleString('es-CO')}</p>
                    <p>Categoría: ${producto.categoria}</p>
                    <div class="product-actions">
                        <button class="btn-edit">✏️ Editar</button>
                        <button class="btn-delete">🗑️ Eliminar</button>
                    </div>
                </div>
            </div>
        `;
    });

    const listaProductos = document.getElementById('listaProductos');
    if (listaProductos) {
        listaProductos.innerHTML = html;

        // Actualizar controles de paginación
        const totalPaginas = Math.ceil(productos.length / productosPorPagina);
        document.getElementById('currentPage').textContent = `Página ${pagina} de ${totalPaginas}`;
        document.getElementById('nextPage').disabled = pagina >= totalPaginas;
        document.getElementById('prevPage').disabled = pagina <= 1;
    }
}

// Función para mostrar resultados de búsqueda en buscador.html
function mostrarResultados(resultados) {
    let html = '<table><tr><th>Imagen</th><th>Nombre</th><th>Precio</th><th>Stock</th></tr>';
    resultados.slice(0, 10).forEach(producto => {
        html += `
            <tr>
                <td><img src="${producto.imagen}" width="50"></td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio} COP</td>
                <td>${producto.stock}</td>
            </tr>
        `;
    });
    html += '</table>';
    document.getElementById('resultados').innerHTML = html;
}

// ==============================================
// 3. EVENT LISTENERS (Formularios y Botones)
// ==============================================

// Registro de nuevo producto (registro.html)
document.getElementById('formRegistro')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const codigo = document.getElementById('codigo').value;

    // Validación del código (ejemplo: 3 letras + 4 números)
    if (!/^(?=(?:.*\d){2,})(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(codigo)) {
        alert("Código inválido. Debe tener mínimo 8 caracteres, al menos una letra minúscula, una mayúscula y dos números.");
        window.location.href = "index.html#codigo-invalido";
        return;
    }

    // Formatear el precio con puntos de miles
    const precioInput = document.getElementById('precio').value;
    const precioFormateado = parseFloat(precioInput).toLocaleString('es-CO');

    // Resto del código para crear el producto...
    const nuevoProducto = {
        codigo: codigo,
        nombre: document.getElementById('nombre').value,
        categoria: document.getElementById('categoria').value,
        imagen: document.getElementById('imagen').value || 'img/default.png',
        precio: precioFormateado,
        laboratorio: document.getElementById('laboratorio').value,
        stock: parseInt(document.getElementById('stock').value) || 0,
        vencimiento: document.getElementById('vencimiento').value
    };

    productos.push(nuevoProducto);
    guardarProductos();
    alert('Producto registrado con éxito!');
    this.reset();
});

// Búsqueda de productos (buscador.html)
document.getElementById('btnBuscar')?.addEventListener('click', function () {
    const nombre = document.getElementById('buscarNombre').value.toLowerCase();
    const categoria = document.getElementById('filtroCategoria').value;
    const precioMax = parseFloat(document.getElementById('precioMax').value);

    const resultados = productos.filter(producto => {
        return (
            (nombre === '' || producto.nombre.toLowerCase().includes(nombre)) &&
            (categoria === '' || producto.categoria === categoria) &&
            (isNaN(precioMax) || producto.precio <= precioMax)
        );
    });

    mostrarResultados(resultados);
});

// Limpiar filtros (buscador.html)
document.getElementById('btnLimpiar')?.addEventListener('click', function () {
    document.getElementById('buscarNombre').value = '';
    document.getElementById('filtroCategoria').value = '';
    document.getElementById('precioMax').value = '';
    mostrarResultados([]);
});

// Paginación (productos.html)
document.getElementById('nextPage')?.addEventListener('click', () => {
    const paginaActual = parseInt(document.getElementById('currentPage').textContent.split(' ')[1]);
    mostrarProductos(paginaActual + 1);
});

document.getElementById('prevPage')?.addEventListener('click', () => {
    const paginaActual = parseInt(document.getElementById('currentPage').textContent.split(' ')[1]);
    if (paginaActual > 1) mostrarProductos(paginaActual - 1);
});

// ==============================================
// 4. INICIALIZACIÓN (Cargar datos al abrir la página)
// ==============================================

function inicializarProductos() {
    // Verificar si ya existen productos en localStorage
    if (!localStorage.getItem('productos')) {
        const productosIniciales = [
            {
                "codigo": "ABcd1234",
                "nombre": "Crema Lubriderm",
                "categoria": "Cuidado Personal",
                "imagen": "img/cremaLubriderm.jpg",
                "precio": 25000,
                "vencimiento": "2025-06-15",
                "laboratorio": "Lubriderm",
                "stock": 100
            },
            {
                "codigo": "XYef5678",
                "nombre": "Crema Lubriderm",
                "categoria": "Cuidado Personal",
                "imagen": "img/cremaLubriderm.jpg",
                "precio": 26000,
                "vencimiento": "2025-12-20",
                "laboratorio": "Lubriderm",
                "stock": 120
            },
            {
                "codigo": "GHij9101",
                "nombre": "Crema Dental",
                "categoria": "Higiene Bucal",
                "imagen": "img/cremaDental.jpg",
                "precio": 8000,
                "vencimiento": "2024-08-10",
                "laboratorio": "Colgate",
                "stock": 300
            },
            {
                "codigo": "KLmn2345",
                "nombre": "Crema Dental",
                "categoria": "Higiene Bucal",
                "imagen": "img/cremaDental.jpg",
                "precio": 8500,
                "vencimiento": "2024-12-31",
                "laboratorio": "Colgate",
                "stock": 250
            },
            {
                "codigo": "OPqr6789",
                "nombre": "Jarabe para la Tos",
                "categoria": "Medicamento",
                "imagen": "img/jarabeParaLaTos.jpg",
                "precio": 15000,
                "vencimiento": "2025-03-15",
                "laboratorio": "Vick",
                "stock": 200
            },
            {
                "codigo": "STuv3456",
                "nombre": "Jarabe para la Tos",
                "categoria": "Medicamento",
                "imagen": "img/jarabeParaLaTos.jpg",
                "precio": 16000,
                "vencimiento": "2025-09-10",
                "laboratorio": "Vick",
                "stock": 180
            },
            {
                "codigo": "WXyz7890",
                "nombre": "Labial",
                "categoria": "Cosmético",
                "imagen": "img/labial.jpg",
                "precio": 12000,
                "vencimiento": "2026-01-01",
                "laboratorio": "Maybelline",
                "stock": 150
            },
            {
                "codigo": "UVwx1234",
                "nombre": "Labial",
                "categoria": "Cosmético",
                "imagen": "img/labial.jpg",
                "precio": 13000,
                "vencimiento": "2026-06-15",
                "laboratorio": "Maybelline",
                "stock": 140
            },
            {
                "codigo": "YZab5678",
                "nombre": "Losartan",
                "categoria": "Medicamento",
                "imagen": "img/losartan.jpg",
                "precio": 12000,
                "vencimiento": "2024-12-31",
                "laboratorio": "MK",
                "stock": 500
            },
            {
                "codigo": "CDef9101",
                "nombre": "Losartan",
                "categoria": "Medicamento",
                "imagen": "img/losartan.jpg",
                "precio": 12500,
                "vencimiento": "2025-06-30",
                "laboratorio": "MK",
                "stock": 450
            },
            {
                "codigo": "DEfg1234",
                "nombre": "Pañales",
                "categoria": "Cuidado Infantil",
                "imagen": "img/pañales.jpg",
                "precio": 45000,
                "vencimiento": "2025-12-15",
                "laboratorio": "Huggies",
                "stock": 300
            },
            {
                "codigo": "HIjk5678",
                "nombre": "Pañales",
                "categoria": "Cuidado Infantil",
                "imagen": "img/pañales.jpg",
                "precio": 46000,
                "vencimiento": "2026-03-20",
                "laboratorio": "Huggies",
                "stock": 280
            },
            {
                "codigo": "LMno9101",
                "nombre": "Preservativos",
                "categoria": "Cuidado Sexual",
                "imagen": "img/preservativos.jpg",
                "precio": 15000,
                "vencimiento": "2027-01-01",
                "laboratorio": "Durex",
                "stock": 400
            },
            {
                "codigo": "PQrs2345",
                "nombre": "Preservativos",
                "categoria": "Cuidado Sexual",
                "imagen": "img/preservativos.jpg",
                "precio": 16000,
                "vencimiento": "2027-06-15",
                "laboratorio": "Durex",
                "stock": 350
            },
            {
                "codigo": "TUvw6789",
                "nombre": "Shampoo",
                "categoria": "Cuidado Personal",
                "imagen": "img/shampoo.jpg",
                "precio": 18000,
                "vencimiento": "2025-09-05",
                "laboratorio": "Head & Shoulders",
                "stock": 200
            },
            {
                "codigo": "XYza3456",
                "nombre": "Shampoo",
                "categoria": "Cuidado Personal",
                "imagen": "img/shampoo.jpg",
                "precio": 19000,
                "vencimiento": "2026-01-10",
                "laboratorio": "Head & Shoulders",
                "stock": 180
            },
            {
                "codigo": "BCde7890",
                "nombre": "Termómetro",
                "categoria": "Equipos Médicos",
                "imagen": "img/termometro.jpg",
                "precio": 40000,
                "vencimiento": "2028-12-31",
                "laboratorio": "Omron",
                "stock": 50
            },
            {
                "codigo": "FGhi1234",
                "nombre": "Termómetro",
                "categoria": "Equipos Médicos",
                "imagen": "img/termometro.jpg",
                "precio": 42000,
                "vencimiento": "2029-06-30",
                "laboratorio": "Omron",
                "stock": 45
            },
            {
                "codigo": "JKlm5678",
                "nombre": "Vitamina C",
                "categoria": "Suplemento",
                "imagen": "img/vitaminaC.jpg",
                "precio": 15000,
                "vencimiento": "2026-01-10",
                "laboratorio": "Bayer",
                "stock": 300
            },
            {
                "codigo": "NOpq9101",
                "nombre": "Vitamina C",
                "categoria": "Suplemento",
                "imagen": "img/vitaminaC.jpg",
                "precio": 16000,
                "vencimiento": "2026-07-15",
                "laboratorio": "Bayer",
                "stock": 280
            },
            // ... Agregar más productos siguiendo la misma estructura ...
        ];
        // Guardar los productos iniciales en localStorage
        localStorage.setItem('productos', JSON.stringify(productosIniciales));
    }
}

// Inicializar productos y cargar datos al abrir la página
document.addEventListener('DOMContentLoaded', () => {
    inicializarProductos(); // Inicializar productos en localStorage si no existen
    if (window.location.pathname.includes('productos.html')) {
        mostrarProductos(); // Mostrar productos al cargar la página
    }
});

// Cargar productos en buscador.html (opcional: mostrar todos al inicio)
if (window.location.pathname.includes('buscador.html')) {
    mostrarResultados(productos);
}

// ===== FUNCIONALIDAD DE ELIMINACIÓN =====
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-delete')) {
        const productCard = e.target.closest('.product-card');
        const codigo = productCard.dataset.id;

        if (confirm('¿Estás seguro de eliminar este producto?')) {
            productos = productos.filter(p => p.codigo !== codigo);
            guardarProductos();
            mostrarProductos();
        }
    }
});

// ===== FUNCIONALIDAD DE EDICIÓN =====
let productoEditando = null;

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-edit')) {
        const productCard = e.target.closest('.product-card');
        const codigo = productCard.dataset.id;
        productoEditando = productos.find(p => p.codigo === codigo);

        if (productoEditando) {
            abrirModalEdicion();
        }
    }
});

function abrirModalEdicion() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Editar Producto</h2>
            <form id="formEditar">
                <input type="hidden" id="edit-codigo" value="${productoEditando.codigo}">
                
                <label for="edit-nombre">Nombre:</label>
                <input type="text" id="edit-nombre" value="${productoEditando.nombre}" required>
                
                <label for="edit-categoria">Categoría:</label>
                <select id="edit-categoria" required>
                    <option value="medicamento" ${productoEditando.categoria === 'medicamento' ? 'selected' : ''}>Medicamento</option>
                    <option value="cosmetico" ${productoEditando.categoria === 'cosmetico' ? 'selected' : ''}>Cosmético</option>
                    <option value="suplemento" ${productoEditando.categoria === 'suplemento' ? 'selected' : ''}>Suplemento</option>
                    <option value="Cuidado Personal" ${productoEditando.categoria === 'Cuidado Personal' ? 'selected' : ''}>Cuidado Personal</option>
                    <option value="Equipos Medicos Basicos" ${productoEditando.categoria === 'Equipos Medicos Basicos' ? 'selected' : ''}>Equipos Medicos Basicos</option>
                    
                </select>
                
                <label for="edit-imagen">Imagen (URL):</label>
                <input type="text" id="edit-imagen" value="${productoEditando.imagen}">
                
                <label for="edit-precio">Precio:</label>
                <input type="text" id="edit-precio" value="${productoEditando.precio}" required>
                
                <label for="edit-laboratorio">Laboratorio:</label>
                <input type="text" id="edit-laboratorio" value="${productoEditando.laboratorio}">
                
                <label for="edit-stock">Stock:</label>
                <input type="number" id="edit-stock" value="${productoEditando.stock}">
                
                <label for="edit-vencimiento">Fecha de Vencimiento:</label>
                <input type="date" id="edit-vencimiento" value="${productoEditando.vencimiento}">
                
                <div class="buttons">
                    <button type="submit" class="btn-primary">Guardar Cambios</button>
                    <button type="button" id="btn-cancelar" class="btn-secondary">Cancelar</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'flex';

    // Evento para guardar cambios
    document.getElementById('formEditar').addEventListener('submit', function (e) {
        e.preventDefault();

        productoEditando.nombre = document.getElementById('edit-nombre').value;
        productoEditando.categoria = document.getElementById('edit-categoria').value;
        productoEditando.imagen = document.getElementById('edit-imagen').value;
        productoEditando.precio = document.getElementById('edit-precio').value;
        productoEditando.laboratorio = document.getElementById('edit-laboratorio').value;
        productoEditando.stock = parseInt(document.getElementById('edit-stock').value) || 0;
        productoEditando.vencimiento = document.getElementById('edit-vencimiento').value;

        guardarProductos();
        mostrarProductos();
        modal.remove();
    });

    // Evento para cancelar
    document.getElementById('btn-cancelar').addEventListener('click', function () {
        modal.remove();
    });

    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}