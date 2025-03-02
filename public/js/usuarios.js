document.addEventListener("DOMContentLoaded", function () {
    let isEditing = false;
    let editingRow = null;

    document.getElementById("addEditUserModalLabel").textContent = "Añadir Usuario";
    document.getElementById("saveUser").textContent = "Añadir Usuario";

    document.querySelector(".btn-primary").addEventListener("click", function () {
        document.getElementById("addEditUserForm").reset();
        isEditing = false;
        editingRow = null;
        document.getElementById("addEditUserModalLabel").textContent = "Añadir Usuario";
        document.getElementById("saveUser").textContent = "Añadir Usuario";
    });

    document.getElementById("saveUser").addEventListener("click", function () {
        let nombre = document.getElementById("userName").value;
        let apellidos = document.getElementById("userLastName").value;
        let email = document.getElementById("userEmail").value;
        let dob = document.getElementById("userDob").value;
        let country = document.getElementById("userCountry").value;
        let city = document.getElementById("userCity").value;
        let password = document.getElementById("userPassword").value;
        let confirmPassword = document.getElementById("userConfirmPassword").value;

        if (!nombre || !apellidos || !email || !dob || !country || !city || !password || !confirmPassword) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        let table = document.getElementById("datatablesSimple").getElementsByTagName("tbody")[0];

        if (isEditing) {
            editingRow.cells[0].textContent = nombre;
            editingRow.cells[1].textContent = apellidos;
            editingRow.cells[2].textContent = email;
            editingRow.cells[3].textContent = dob;
            editingRow.cells[4].textContent = country;
            editingRow.cells[5].textContent = city;
        } else {
            let newRow = table.insertRow();
            newRow.insertCell(0).textContent = nombre;
            newRow.insertCell(1).textContent = apellidos;
            newRow.insertCell(2).textContent = email;
            newRow.insertCell(3).textContent = dob;
            newRow.insertCell(4).textContent = country;
            newRow.insertCell(5).textContent = city;

            let estadoCell = newRow.insertCell(6);
            estadoCell.textContent = "Activo";
            estadoCell.classList.add("estado");

            let accionesCell = newRow.insertCell(7);
            accionesCell.innerHTML = `
                <button class="btn btn-warning btn-sm" onclick="confirmAction('bloquear', this)">
                    <i class="fas fa-lock"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="confirmAction('eliminar', this)">
                    <i class="fas fa-trash"></i>
                </button>
                <a href="usuario1.html">
                    <button class="btn btn-info btn-sm" title="Visualizar usuario">
                        <i class="fas fa-eye"></i>
                    </button>
                </a>
                <button class="btn btn-warning btn-sm" onclick="editUser(this.closest('tr'))">
                    <i class="fas fa-edit"></i>
                </button>`;
        }

        let modalElement = document.getElementById('addEditUserModal');
        let modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        }
    });

    // Función para editar usuario
    window.editUser = function(row) {
        document.getElementById("userName").value = row.cells[0].textContent;
        document.getElementById("userLastName").value = row.cells[1].textContent;
        document.getElementById("userEmail").value = row.cells[2].textContent;
        document.getElementById("userDob").value = row.cells[3].textContent;
        document.getElementById("userCountry").value = row.cells[4].textContent;
        document.getElementById("userCity").value = row.cells[5].textContent;
        
        document.getElementById("userPassword").value = "";
        document.getElementById("userConfirmPassword").value = "";

        document.getElementById("addEditUserModalLabel").textContent = "Editar Usuario";
        document.getElementById("saveUser").textContent = "Actualizar Usuario";

        isEditing = true;
        editingRow = row;

        let modal = new bootstrap.Modal(document.getElementById('addEditUserModal'), { backdrop: 'static', keyboard: false });
        modal.show();
    };

    // Función para gestionar bloqueos y acciones
    function initializeRowStates() {
        let rows = document.querySelectorAll('tr');
        rows.forEach(function(row) {
            let statusCell = row.querySelector('.estado');
            if (statusCell) {
                if (statusCell.textContent.trim() === 'Bloqueado') {
                    row.classList.add('usuario-bloqueado');
                } else {
                    row.classList.remove('usuario-bloqueado');
                }
            }
        });
    }

    // Acción de bloqueo/desbloqueo
    function confirmAction(action, button) {
        let row = button.closest('tr'); 
        let statusCell = row.querySelector('.estado'); 
        let message = `¿Estás seguro de que quieres ${action} este usuario?`;

        if (confirm(message)) {
            if (action === 'bloquear') {
                row.classList.add('usuario-bloqueado');
                statusCell.textContent = 'Bloqueado'; 
                button.innerHTML = '<i class="fas fa-unlock"></i>';
                button.setAttribute('onclick', 'confirmAction("desbloquear", this)');
            } else if (action === 'desbloquear') {
                row.classList.remove('usuario-bloqueado');
                statusCell.textContent = 'Activo';
                button.innerHTML = '<i class="fas fa-lock"></i>';
                button.setAttribute('onclick', 'confirmAction("bloquear", this)');
            } else if (action === 'eliminar') {
                row.remove();
            }
        }
    }

    // Inicialización del DataTable para #tablaPublicaciones
    if (document.getElementById("tablaPublicaciones")) {
        const dataTable = new simpleDatatables.DataTable("#tablaPublicaciones", {
            searchable: false,
            perPage: 5,
            sortable: true,
            columns: [
                null, // Columna 0 (Publicación)
                null, // Columna 1 (Nombre)
                { type: "date" }, // Columna 2 (Fecha de publicación)
                null, // Columna 3 (Acciones)
            ],
            order: [[2, 'asc']], // Orden ascendente por fecha
        });
    }

    
    initializeRowStates();
});



function initializeRowStates() {
    let rows = document.querySelectorAll('tr');
    console.log("Filas encontradas al cargar la página:", rows);

    rows.forEach(function(row) {
        let statusCell = row.querySelector('.estado'); 

        if (statusCell) {
            console.log("Estado de la fila:", statusCell.textContent.trim());

            if (statusCell.textContent.trim() === 'Bloqueado') {
                row.classList.add('usuario-bloqueado');
                console.log("Fila bloqueada procesada:", row);
            } else {
                row.classList.remove('usuario-bloqueado');
                console.log("Fila activa procesada:", row);
            }

           
            console.log("Clase aplicada:", row.classList);
        }
        
    });
}

// Función de acción de bloquear/desbloquear
function confirmAction(action, button) {
    let row = button.closest('tr'); 
    let statusCell = row.querySelector('.estado');
    let message = `¿Estás seguro de que quieres ${action} este usuario?`;

    if (confirm(message)) {
        // Acción de bloqueo
        if (action === 'bloquear') {
            row.classList.add('usuario-bloqueado');
            statusCell.textContent = 'Bloqueado'; 
           
            button.innerHTML = '<i class="fas fa-unlock"></i>'; 
            button.setAttribute('onclick', 'confirmAction("desbloquear", this)'); 
        }
        
        else if (action === 'desbloquear') {
            row.classList.remove('usuario-bloqueado');
            statusCell.textContent = 'Activo'; 
            
            button.innerHTML = '<i class="fas fa-lock"></i>'; 
            button.setAttribute('onclick', 'confirmAction("bloquear", this)'); 
        }
        // Acción de eliminar
        else if (action === 'eliminar') {
            row.remove(); 
        }
    }
}




//Script para usuario detallado
function listasPublicaciones(action, button) {
    let row = button.closest('li'); 
    let statusCell = row.querySelector('.estado'); 
    let message = `¿Estás seguro de que quieres ${action} esta publicación?`;

    if (confirm(message)) {
        // Acción de bloqueo
        if (action === 'bloquear') {
            row.classList.add('publicacion-bloqueada'); 
            
            button.innerHTML = '<i class="fas fa-unlock"></i>'; 
            button.setAttribute('onclick', 'confirmAction("desbloquear", this)'); 
        }
        // Acción de desbloqueo
        else if (action === 'desbloquear') {
            row.classList.remove('publicacion-bloqueada'); 
            
            button.innerHTML = '<i class="fas fa-lock"></i>'; 
            button.setAttribute('onclick', 'confirmAction("bloquear", this)'); 
        }
        // Acción de eliminar
        else if (action === 'eliminar') {
            row.remove(); 
        }
    }
}