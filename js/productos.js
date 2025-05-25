// ==============================================
// 1. VARIABLES GLOBALES (Array y localStorage)
// ==============================================
let productos = [];

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
        // Asegurarnos que el precio sea número
        const precio = typeof producto.precio === 'string' ?
            parseFloat(producto.precio.replace(/[^0-9.-]+/g, "")) :
            producto.precio;

        html += `
            <div class="product-card" data-id="${producto.codigo}">
                <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='img/default.png'">
                <div class="product-info">
                    <h3>${producto.nombre}</h3>
                    <p>Código: ${producto.codigo}</p>
                    <p>Precio: $${precio.toLocaleString('es-CO')}</p>
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
    const contenedor = document.getElementById('resultados');
    if (!contenedor) return;

    if (resultados.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron productos.</p>';
        return;
    }

    let html = '<table><tr><th>Imagen</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th></tr>';
    resultados.slice(0, 10).forEach(producto => {
        const precio = typeof producto.precio === 'string' ?
            parseFloat(producto.precio.replace(/[^0-9.-]+/g, "")) :
            producto.precio;

        html += `
            <tr>
                <td><img src="${producto.imagen}" width="50" onerror="this.src='img/default.png'"></td>
                <td>${producto.nombre}</td>
                <td>${producto.categoria}</td>
                <td>$${precio.toLocaleString('es-CO')}</td>
                <td>${producto.stock || 0}</td>
            </tr>
        `;
    });
    html += '</table>';
    contenedor.innerHTML = html;
}

// Función para inicializar los productos
function inicializarProductos() {
    // Verificar si es la primera carga
    if (!localStorage.getItem('productosInicializados')) {
        // Definir productos iniciales
        const productosIniciales = [
            {
        "codigo": "ACne1234",
        "nombre": "Gel limpiador para acné",
        "categoria": "Cuidado Personal",
        "imagen": "img/gelAcne.jpg",
        "precio": 18000,
        "vencimiento": "2025-11-30",
        "laboratorio": "Neutrogena",
        "stock": 150
    },
    {
        "codigo": "ALer5678",
        "nombre": "Antialérgico Loratadina 10mg",
        "categoria": "Medicamento",
        "imagen": "img/loratadina.jpg",
        "precio": 12000,
        "vencimiento": "2026-03-15",
        "laboratorio": "Genfar",
        "stock": 200
    },
    {
        "codigo": "BPro9101",
        "nombre": "Protector solar FPS 50",
        "categoria": "Cuidado Personal",
        "imagen": "img/protectorSolar.jpg",
        "precio": 35000,
        "vencimiento": "2025-12-31",
        "laboratorio": "Nivea",
        "stock": 120
    },
    {
        "codigo": "CCol2345",
        "nombre": "Colirio lubricante",
        "categoria": "Medicamento",
        "imagen": "img/colirio.jpg",
        "precio": 15000,
        "vencimiento": "2025-09-30",
        "laboratorio": "Alcon",
        "stock": 180
    },
    {
        "codigo": "DDol6789",
        "nombre": "Dolofin 500mg",
        "categoria": "Medicamento",
        "imagen": "img/dolofin.jpg",
        "precio": 8000,
        "vencimiento": "2026-01-20",
        "laboratorio": "MK",
        "stock": 300
    },
    {
        "codigo": "EHig3456",
        "nombre": "Enjuague bucal menta",
        "categoria": "Higiene Bucal",
        "imagen": "img/enjuagueBucal.jpg",
        "precio": 12500,
        "vencimiento": "2025-10-15",
        "laboratorio": "Listerine",
        "stock": 160
    },
    {
        "codigo": "FGas7890",
        "nombre": "Antiácido tabletas",
        "categoria": "Medicamento",
        "imagen": "img/antiacido.jpg",
        "precio": 9500,
        "vencimiento": "2026-02-28",
        "laboratorio": "Pepto-Bismol",
        "stock": 220
    },
    {
        "codigo": "GJab1234",
        "nombre": "Jabón antibacterial",
        "categoria": "Cuidado Personal",
        "imagen": "img/jabonAntibacterial.jpg",
        "precio": 6500,
        "vencimiento": "2026-06-30",
        "laboratorio": "Protex",
        "stock": 250
    },
    {
        "codigo": "HDes5678",
        "nombre": "Desodorante roll-on",
        "categoria": "Cuidado Personal",
        "imagen": "img/desodorante.jpg",
        "precio": 14000,
        "vencimiento": "2025-12-15",
        "laboratorio": "Rexona",
        "stock": 190
    },
    {
        "codigo": "ILax9101",
        "nombre": "Laxante natural",
        "categoria": "Medicamento",
        "imagen": "img/laxante.jpg",
        "precio": 11000,
        "vencimiento": "2025-11-20",
        "laboratorio": "Laxol",
        "stock": 130
    },
    {
        "codigo": "JMul2345",
        "nombre": "Multivitamínico adulto",
        "categoria": "Suplemento",
        "imagen": "img/multivitaminico.jpg",
        "precio": 28000,
        "vencimiento": "2026-04-30",
        "laboratorio": "Centrum",
        "stock": 170
    },
    {
        "codigo": "KCre6789",
        "nombre": "Crema para hemorroides",
        "categoria": "Medicamento",
        "imagen": "img/cremaHemorroides.jpg",
        "precio": 16500,
        "vencimiento": "2025-10-31",
        "laboratorio": "Preparation H",
        "stock": 90
    },
    {
        "codigo": "LMos3456",
        "nombre": "Mosquitero repelente",
        "categoria": "Cuidado Personal",
        "imagen": "img/repelente.jpg",
        "precio": 22000,
        "vencimiento": "2026-05-15",
        "laboratorio": "Off",
        "stock": 110
    },
    {
        "codigo": "NGas7890",
        "nombre": "Gasas estériles",
        "categoria": "Primeros Auxilios",
        "imagen": "img/gasas.jpg",
        "precio": 7500,
        "vencimiento": "2027-01-31",
        "laboratorio": "Curitas",
        "stock": 200
    },
    {
        "codigo": "OPar1234",
        "nombre": "Paracetamol 500mg",
        "categoria": "Medicamento",
        "imagen": "img/paracetamol.jpg",
        "precio": 6000,
        "vencimiento": "2026-03-10",
        "laboratorio": "Genfar",
        "stock": 350
    },
    {
        "codigo": "RAlg9101",
        "nombre": "Algodón estéril",
        "categoria": "Primeros Auxilios",
        "imagen": "img/algodon.jpg",
        "precio": 5000,
        "vencimiento": "2027-02-28",
        "laboratorio": "Johnson's",
        "stock": 180
    },
    {
        "codigo": "SGot2345",
        "nombre": "Gotas para los oídos",
        "categoria": "Medicamento",
        "imagen": "img/gotasOidos.jpg",
        "precio": 13500,
        "vencimiento": "2025-11-15",
        "laboratorio": "Otixal",
        "stock": 120
    },
    {
        "codigo": "TVit6789",
        "nombre": "Vitamina D3 1000UI",
        "categoria": "Suplemento",
        "imagen": "img/vitaminaD.jpg",
        "precio": 25000,
        "vencimiento": "2026-07-31",
        "laboratorio": "Nature's Bounty",
        "stock": 140
    },
    {
        "codigo": "UAnt3456",
        "nombre": "Antiséptico yodado",
        "categoria": "Primeros Auxilios",
        "imagen": "img/antiseptico.jpg",
        "precio": 9500,
        "vencimiento": "2026-04-15",
        "laboratorio": "Pervinox",
        "stock": 160
    },
    {
        "codigo": "VCre7890",
        "nombre": "Crema para rozaduras",
        "categoria": "Dermatológico",
        "imagen": "img/cremaRozaduras.jpg",
        "precio": 17500,
        "vencimiento": "2025-10-30",
        "laboratorio": "Bepanthen",
        "stock": 100
    },
    {
        "codigo": "WTij1234",
        "nombre": "Tijeras médicas",
        "categoria": "Equipos Médicos",
        "imagen": "img/tijeras.jpg",
        "precio": 12000,
        "vencimiento": "2028-12-31",
        "laboratorio": "Hersill",
        "stock": 60
    },
    {
        "codigo": "XTer5678",
        "nombre": "Tensiómetro digital",
        "categoria": "Equipos Médicos",
        "imagen": "img/tensiometro.jpg",
        "precio": 85000,
        "vencimiento": "2027-06-30",
        "laboratorio": "Omron",
        "stock": 40
    },
    {
        "codigo": "YMas9101",
        "nombre": "Mascarillas quirúrgicas",
        "categoria": "Primeros Auxilios",
        "imagen": "img/mascarillas.jpg",
        "precio": 15000,
        "vencimiento": "2026-08-15",
        "laboratorio": "3M",
        "stock": 300
    },
    {
        "codigo": "ZJar2345",
        "nombre": "Jarabe para la gripe",
        "categoria": "Medicamento",
        "imagen": "img/jarabeGripe.jpg",
        "precio": 19500,
        "vencimiento": "2025-12-10",
        "laboratorio": "Vick",
        "stock": 170
    },
    {
        "codigo": "AAci6789",
        "nombre": "Aciclovir crema 5%",
        "categoria": "Dermatológico",
        "imagen": "img/aciclovir.jpg",
        "precio": 22000,
        "vencimiento": "2026-01-31",
        "laboratorio": "Genfar",
        "stock": 90
    },
    {
        "codigo": "BBan3456",
        "nombre": "Banda elástica",
        "categoria": "Primeros Auxilios",
        "imagen": "img/bandaElastica.jpg",
        "precio": 8500,
        "vencimiento": "2027-03-15",
        "laboratorio": "Farmanova",
        "stock": 120
    },
    {
        "codigo": "CCur7890",
        "nombre": "Curitas variedad",
        "categoria": "Primeros Auxilios",
        "imagen": "img/curitas.jpg",
        "precio": 6500,
        "vencimiento": "2026-11-30",
        "laboratorio": "Band-Aid",
        "stock": 200
    },
    {
        "codigo": "DDig1234",
        "nombre": "Digestivo natural",
        "categoria": "Medicamento",
        "imagen": "img/digestivo.jpg",
        "precio": 12500,
        "vencimiento": "2025-11-25",
        "laboratorio": "Gaseodín",
        "stock": 150
    },
    {
        "codigo": "EEye5678",
        "nombre": "Gotas para ojos rojos",
        "categoria": "Medicamento",
        "imagen": "img/gotasOjos.jpg",
        "precio": 18500,
        "vencimiento": "2026-02-15",
        "laboratorio": "Systane",
        "stock": 110
    },
    {
        "codigo": "FFib9101",
        "nombre": "Fibra soluble",
        "categoria": "Suplemento",
        "imagen": "img/fibra.jpg",
        "precio": 21000,
        "vencimiento": "2026-05-31",
        "laboratorio": "Metamucil",
        "stock": 95
    },
    {
        "codigo": "GGlu2345",
        "nombre": "Glucómetro digital",
        "categoria": "Equipos Médicos",
        "imagen": "img/glucometro.jpg",
        "precio": 95000,
        "vencimiento": "2027-09-30",
        "laboratorio": "Accu-Chek",
        "stock": 35
    },
    {
        "codigo": "HHem6789",
        "nombre": "Hemostático en polvo",
        "categoria": "Primeros Auxilios",
        "imagen": "img/hemostatico.jpg",
        "precio": 28000,
        "vencimiento": "2026-07-15",
        "laboratorio": "QuickClot",
        "stock": 50
    },
    {
        "codigo": "IIbu3456",
        "nombre": "Ibuprofeno 400mg",
        "categoria": "Medicamento",
        "imagen": "img/ibuprofeno.jpg",
        "precio": 7500,
        "vencimiento": "2026-04-20",
        "laboratorio": "Genfar",
        "stock": 280
    },
    {
        "codigo": "JJar7890",
        "nombre": "Jarabe para la tos nocturna",
        "categoria": "Medicamento",
        "imagen": "img/jarabeTos.jpg",
        "precio": 21000,
        "vencimiento": "2025-12-05",
        "laboratorio": "Robitussin",
        "stock": 130
    },
    {
        "codigo": "KKit1234",
        "nombre": "Kit de primeros auxilios",
        "categoria": "Primeros Auxilios",
        "imagen": "img/kitPrimerosAuxilios.jpg",
        "precio": 45000,
        "vencimiento": "2027-01-15",
        "laboratorio": "Red Cross",
        "stock": 60
    },
    {
        "codigo": "LLen5678",
        "nombre": "Lentes de descanso",
        "categoria": "Equipos Médicos",
        "imagen": "img/lentes.jpg",
        "precio": 38000,
        "vencimiento": "2026-10-31",
        "laboratorio": "Optix",
        "stock": 75
    },
    {
        "codigo": "MMel9101",
        "nombre": "Melatonina 5mg",
        "categoria": "Suplemento",
        "imagen": "img/melatonina.jpg",
        "precio": 32000,
        "vencimiento": "2026-08-20",
        "laboratorio": "Natrol",
        "stock": 110
    },
    {
        "codigo": "NNeb2345",
        "nombre": "Nebulizador portátil",
        "categoria": "Equipos Médicos",
        "imagen": "img/nebulizador.jpg",
        "precio": 120000,
        "vencimiento": "2027-12-31",
        "laboratorio": "Omron",
        "stock": 25
    },
    {
        "codigo": "OOxi6789",
        "nombre": "Oxímetro de pulso",
        "categoria": "Equipos Médicos",
        "imagen": "img/oximetro.jpg",
        "precio": 65000,
        "vencimiento": "2027-05-15",
        "laboratorio": "Beurer",
        "stock": 40
    },
    {
        "codigo": "PPro3456",
        "nombre": "Probiótico intestinal",
        "categoria": "Suplemento",
        "imagen": "img/probiotico.jpg",
        "precio": 28000,
        "vencimiento": "2026-03-31",
        "laboratorio": "Align",
        "stock": 90
    },
    {
        "codigo": "QQue7890",
        "nombre": "Quercetina con vitamina C",
        "categoria": "Suplemento",
        "imagen": "img/quercetina.jpg",
        "precio": 35000,
        "vencimiento": "2026-06-15",
        "laboratorio": "Now Foods",
        "stock": 70
    },
    {
        "codigo": "RRes1234",
        "nombre": "Resveratrol 500mg",
        "categoria": "Suplemento",
        "imagen": "img/resveratrol.jpg",
        "precio": 42000,
        "vencimiento": "2026-09-30",
        "laboratorio": "Pure Encapsulations",
        "stock": 60
    },
    {
        "codigo": "SSen5678",
        "nombre": "Sensodyne pasta dental",
        "categoria": "Higiene Bucal",
        "imagen": "img/sensodyne.jpg",
        "precio": 16500,
        "vencimiento": "2025-12-20",
        "laboratorio": "Sensodyne",
        "stock": 180
    },
    {
        "codigo": "TTin9101",
        "nombre": "Tintura de yodo",
        "categoria": "Primeros Auxilios",
        "imagen": "img/tinturaYodo.jpg",
        "precio": 9500,
        "vencimiento": "2026-05-31",
        "laboratorio": "Pervinox",
        "stock": 85
    },
    {
        "codigo": "UUlt2345",
        "nombre": "Ultra levura probiótico",
        "categoria": "Suplemento",
        "imagen": "img/ultralevura.jpg",
        "precio": 32000,
        "vencimiento": "2026-04-15",
        "laboratorio": "Biocodex",
        "stock": 75
    },
    {
        "codigo": "VVit6789",
        "nombre": "Vitamina B12 sublingual",
        "categoria": "Suplemento",
        "imagen": "img/vitaminaB12.jpg",
        "precio": 28000,
        "vencimiento": "2026-07-20",
        "laboratorio": "Nature Made",
        "stock": 95
    },
    {
        "codigo": "WWel3456",
        "nombre": "Wellness pack multivitamínico",
        "categoria": "Suplemento",
        "imagen": "img/wellnessPack.jpg",
        "precio": 55000,
        "vencimiento": "2026-08-31",
        "laboratorio": "GNC",
        "stock": 60
    },
    {
        "codigo": "XXan7890",
        "nombre": "Xanax 0.5mg",
        "categoria": "Medicamento",
        "imagen": "img/xanax.jpg",
        "precio": 45000,
        "vencimiento": "2025-11-30",
        "laboratorio": "Pfizer",
        "stock": 40
    },
    {
        "codigo": "YYog1234",
        "nombre": "Yogurt probiótico en cápsulas",
        "categoria": "Suplemento",
        "imagen": "img/yogurtProbiotico.jpg",
        "precio": 38000,
        "vencimiento": "2026-03-15",
        "laboratorio": "Culturelle",
        "stock": 70
    },
    {
        "codigo": "ZZin5678",
        "nombre": "Zinc 50mg",
        "categoria": "Suplemento",
        "imagen": "img/zinc.jpg",
        "precio": 22000,
        "vencimiento": "2026-06-30",
        "laboratorio": "Solaray",
        "stock": 85
    }
];

        // Guardar en localStorage
        localStorage.setItem('productos', JSON.stringify(productosIniciales));
        localStorage.setItem('productosInicializados', 'true');
    }

    // Cargar productos (iniciales o modificados)
    productos = JSON.parse(localStorage.getItem('productos'));
}

// Luego en tu evento DOMContentLoaded:
document.addEventListener('DOMContentLoaded', function () {
    inicializarProductos();

    if (window.location.pathname.endsWith('productos.html')) {
        mostrarProductos();
    } else if (window.location.pathname.endsWith('buscador.html')) {
        mostrarResultados(productos);
    }
});

// ==============================================
// 3. EVENT LISTENERS (Formularios y Botones)
// ==============================================

// Registro de nuevo producto (registro.html)
document.getElementById('formRegistro')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const codigo = document.getElementById('codigo').value;

    // Validación del código
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(codigo)) {
        alert("Código inválido. Debe tener mínimo 8 caracteres, al menos una letra minúscula, una mayúscula y un número.");
        window.location.href = "index.html#codigo-invalido";
        return;
    }

    // Verificar si el código ya existe
    if (productos.some(p => p.codigo === codigo)) {
        alert("Este código de producto ya está registrado.");
        return;
    }

    const nuevoProducto = {
        codigo: codigo,
        nombre: document.getElementById('nombre').value,
        categoria: document.getElementById('categoria').value,
        imagen: document.getElementById('imagen').value || 'img/default.png',
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
document.getElementById('btnBuscar')?.addEventListener('click', function () {
    const nombre = document.getElementById('buscarNombre').value.toLowerCase();
    const categoria = document.getElementById('filtroCategoria').value;
    const precioMax = parseFloat(document.getElementById('precioMax').value);

    const resultados = productos.filter(producto => {
        const precio = typeof producto.precio === 'string' ?
            parseFloat(producto.precio.replace(/[^0-9.-]+/g, "")) :
            producto.precio;

        return (
            (nombre === '' || producto.nombre.toLowerCase().includes(nombre)) &&
            (categoria === '' || producto.categoria === categoria) &&
            (isNaN(precioMax) || precio <= precioMax)
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
                <input type="number" id="edit-precio" value="${productoEditando.precio}" required step="0.01">
                
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
        productoEditando.precio = parseFloat(document.getElementById('edit-precio').value);
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

// ==============================================
// 4. INICIALIZACIÓN (Cargar datos al abrir la página)
// ==============================================
document.addEventListener('DOMContentLoaded', function () {
    // Primero inicializar los productos
    inicializarProductos();

    // Luego cargar la vista correspondiente
    if (window.location.pathname.endsWith('productos.html')) {
        mostrarProductos();
    } else if (window.location.pathname.endsWith('buscador.html')) {
        mostrarResultados(productos);
    }
});