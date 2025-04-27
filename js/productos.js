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
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="product-info">
                    <h3>${producto.nombre}</h3>
                    <p>Código: ${producto.codigo}</p>
                    <p>Precio: $${producto.precio.toFixed(2)}</p>
                    <p>Categoría: ${producto.categoria}</p>
                    <div class="product-actions">
                        <button class="btn-edit">✏️ Editar</button>
                        <button class="btn-delete">🗑️ Eliminar</button>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById('listaProductos').innerHTML = html;
    document.getElementById('currentPage').textContent = `Página ${pagina}`;
}

// Función para mostrar resultados de búsqueda en buscador.html
function mostrarResultados(resultados) {
    let html = '<table><tr><th>Imagen</th><th>Nombre</th><th>Precio</th><th>Stock</th></tr>';
    resultados.slice(0, 10).forEach(producto => {
        html += `
            <tr>
                <td><img src="${producto.imagen}" width="50"></td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
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
document.getElementById('formRegistro')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const codigo = document.getElementById('codigo').value;
    
    // Validación del código (ejemplo: 3 letras + 4 números)
    if (!/^(?=(?:.*\d){2,})(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(codigo)) {
        alert("Código inválido. Debe tener mínimo 8 caracteres, al menos una letra minúscula, una mayúscula y dos números.");
        window.location.href = "index.html#codigo-invalido";
        return;
    }
    
    
    // Resto del código para crear el producto...
    const nuevoProducto = {
        codigo: codigo,
        nombre: document.getElementById('nombre').value,
        categoria: document.getElementById('categoria').value,
        imagen: document.getElementById('imagen').value || 'img/default.png',
        codigo: document.getElementById('codigo').value,
        precio: parseFloat(document.getElementById('precio').value),
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
document.getElementById('btnBuscar')?.addEventListener('click', function() {
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
document.getElementById('btnLimpiar')?.addEventListener('click', function() {
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

// Cargar productos en productos.html
if (window.location.pathname.includes('productos.html')) {
    mostrarProductos();
}

// Cargar productos en buscador.html (opcional: mostrar todos al inicio)
if (window.location.pathname.includes('buscador.html')) {
    mostrarResultados(productos);
}
// ===== FUNCIONALIDAD DE ELIMINACIÓN =====
document.addEventListener('click', function(e) {
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

document.addEventListener('click', function(e) {
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
                </select>
                
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
    document.getElementById('formEditar').addEventListener('submit', function(e) {
        e.preventDefault();
        
        productoEditando.nombre = document.getElementById('edit-nombre').value;
        productoEditando.categoria = document.getElementById('edit-categoria').value;
        // Añade más campos según necesites
        
        guardarProductos();
        mostrarProductos();
        modal.remove();
    });
    
    // Evento para cancelar
    document.getElementById('btn-cancelar').addEventListener('click', function() {
        modal.remove();
    });
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}