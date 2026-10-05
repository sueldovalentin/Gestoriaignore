function ObtenerCargaAuto() {
    fetch('http://localhost:5252/api/CargaAuto')
        .then((respuesta) => respuesta.json())
        .then((data) => {
            console.log(data);
            mostrarCargaAuto(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function mostrarCargaAuto(data) {
    const tbody = document.getElementById("tablaCargaAuto");

    tbody.innerHTML = "";

    data.forEach((element) => {
        console.log(element);

        let tr = tbody.insertRow();

        tr.insertCell(0).innerHTML = element.marca;
        
        let tdModelo = tr.insertCell(1);
        tdModelo.innerHTML = element.modelo;
        tdModelo.classList.add("ocultar");

        let tdAnio = tr.insertCell(2);
        tdAnio.innerHTML = element.anio;
        tdAnio.classList.add("ocultar");

        tr.insertCell(3).innerHTML = element.patente;

        let tdKm = tr.insertCell(4);
        tdKm.innerHTML = element.km;
        tdKm.classList.add("ocultar");

        let tdFecha = tr.insertCell(5);
        tdFecha.innerHTML = element.fechaIngreso;
        tdFecha.classList.add("ocultar");

        tr.insertCell(6).innerHTML = element.disponible === 0 ? "Disponible" : "No Disponible";;


        let editar = document.createElement("button");

        editar.innerHTML = "Editar";
        editar.classList.add("btn", "btn-primary");

        editar.setAttribute(
            "onclick",
            `BuscarValoresCargaAuto(${element.cargaAutoId})`
        );

        let tdEditar = tr.insertCell(7);
        tdEditar.appendChild(editar);

        let eliminar = document.createElement("button");

        eliminar.innerHTML = "Eliminar";
        eliminar.classList.add("btn", "btn-danger");

        eliminar.onclick = function () {
            if (element.disponible == 1){
                
                let validacion = confirm(
                    "¿Está seguro de que desea eliminar este auto?"
                );

                if (validacion) {
                    EliminarCargaAuto(element.cargaAutoId);
                }
            }
            else {
                alert("No se puede eliminar un auto que está disponible.");
            }
        };

        let tdEliminar = tr.insertCell(8);
        tdEliminar.appendChild(eliminar);
    });
}

function AgregarCargaAuto() {
    let nuevoAuto = {
        marca: document.getElementById("marca").value.toUpperCase(),
        modelo: document.getElementById("modelo").value.toUpperCase(),
        anio: parseInt(document.getElementById("anio").value),
        patente: document.getElementById("patente").value.toUpperCase(),
        km: parseInt(document.getElementById("km").value),
        fechaIngreso: document.getElementById("fechaIngreso").value,
        disponible: parseInt(document.getElementById("disponibilidad").value)
    };

    if (!nuevoAuto.marca.trim()) {
        alert("El campo 'Marca' es obligatorio.");
        return;
    }

    if (!nuevoAuto.modelo.trim()) {
        alert("El campo 'Modelo' es obligatorio.");
        return;
    }

    if (nuevoAuto.anio === null || isNaN(nuevoAuto.anio)) {
        alert("El campo 'Año' es obligatorio.");
        return;
    }

    if (nuevoAuto.anio < 2000 || nuevoAuto.anio > 2026) {
        alert("El campo 'Año' no puede ser menor que 2000 ni mayor a 2026.");
        return;
    }

    if (!nuevoAuto.patente.trim()) {
        alert("El campo 'Patente' es obligatorio.");
        return;
    }

    if (nuevoAuto.patente.length < 6 || nuevoAuto.patente.length > 7) {
        alert("La patente debe tener 6 o 7 caracteres.");
        return;
    }

    if (nuevoAuto.km === null || isNaN(nuevoAuto.km)) {
        alert("El campo 'KM' no puede estar vacio.");
        return;
    }

    if (nuevoAuto.km < 0) {
        alert("El campo 'KM' no puede ser menor que 0.");
        return;
    }

    if (!nuevoAuto.fechaIngreso) {
        alert("Debe seleccionar una fecha de ingreso.");
        return;
    }

    fetch('http://localhost:5252/api/CargaAuto', {
        method: "POST",

        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },

        body: JSON.stringify(nuevoAuto)
    })
        .then(async (respuesta) => {
            const texto = await respuesta.text();

            if (!respuesta.ok) {
                console.log("Respuesta del servidor:", texto);
                throw new Error(`Error HTTP: ${respuesta.status} - ${texto}`);
            }

            return texto ? JSON.parse(texto) : null;
        })
        .then(() => {
            alert("Auto agregado correctamente.");

            document.getElementById("marca").value = "";
            document.getElementById("modelo").value = "";
            document.getElementById("anio").value = "";
            document.getElementById("patente").value = "";
            document.getElementById("km").value = "";
            document.getElementById("fechaIngreso").value = "";
            document.getElementById("disponibilidad").value = "";

            ObtenerCargaAuto();
        })
        .catch((error) => {
            console.error("No se pudo agregar el producto:", error);
        });
}

function BuscarValoresCargaAuto(cargaAutoId) {
    fetch(`http://localhost:5252/api/CargaAuto/${cargaAutoId}`)
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error("Error HTTP: ${respuesta.status}");
            }

            return respuesta.json();
        })
        .then((data) => {

            document.getElementById("idEditar").value = data.cargaAutoId;
            document.getElementById("marcaEditar").value = data.marca;
            document.getElementById("modeloEditar").value = data.modelo;
            document.getElementById("anioEditar").value = data.anio;
            document.getElementById("patenteEditar").value = data.patente;
            document.getElementById("kmEditar").value = data.km;
            document.getElementById("fechaIngresoEditar").value = data.fechaIngreso;
            document.getElementById("disponibilidadEditar").value = data.disponible;

            let modal = new bootstrap.Modal(
                document.getElementById("editarAutoModal")
            );

            modal.show();
        })
        .catch((error) => {
            console.error("No se pudo acceder a la API:", error);
        });
}

function EditarCargaAuto() {
    let id = document.getElementById("idEditar").value;

    console.log("id", id);

    let editarAuto = {
        cargaAutoId: parseInt(id),
        marca: document.getElementById("marcaEditar").value.toUpperCase(),
        modelo: document.getElementById("modeloEditar").value.toUpperCase(),
        anio: parseInt(document.getElementById("anioEditar").value),
        patente: document.getElementById("patenteEditar").value.toUpperCase(),
        km: parseInt(document.getElementById("kmEditar").value),
        fechaIngreso: document.getElementById("fechaIngresoEditar").value,
        disponible: parseInt(document.getElementById("disponibilidadEditar").value)
    };

    if (!editarAuto.marca.trim()) {
        alert("El campo 'Marca' es obligatorio.");
        return;
    }

    if (!editarAuto.modelo.trim()) {
        alert("El campo 'Modelo' es obligatorio.");
        return;
    }

    if (editarAuto.anio === null || isNaN(editarAuto.anio)) {
        alert("El campo 'Año' es obligatorio.");
        return;
    }

    if (editarAuto.anio < 2000 || editarAuto.anio > 2026) {
        alert("El campo 'Año' no puede ser menor que 2000 ni mayor a 2026.");
        return;
    }

    if (!editarAuto.patente.trim()) {
        alert("El campo 'Patente' es obligatorio.");
        return;
    }

    if (editarAuto.patente.length < 6 || editarAuto.patente.length > 7) {
        alert("La patente debe tener 6 o 7 caracteres.");
        return;
    }

    if (editarAuto.km === null || isNaN(editarAuto.km)) {
        alert("El campo 'KM' no puede estar vacio.");
        return;
    }

    if (editarAuto.km < 0) {
        alert("El campo 'KM' no puede ser menor que 0.");
        return;
    }

    if (!editarAuto.fechaIngreso) {
        alert("Debe seleccionar una fecha de ingreso.");
        return;
    }

    fetch(`http://localhost:5252/api/CargaAuto/${id}`, {
        method: "PUT",

        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },

        body: JSON.stringify(editarAuto)
    })
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }

            if (respuesta.status === 204) {
                return null;
            }

            return respuesta.json();
        })
        .then(() => {
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }

            alert("Auto editado correctamente.");

            document.getElementById("marcaEditar").value = "";
            document.getElementById("modeloEditar").value = "";
            document.getElementById("anioEditar").value = "";
            document.getElementById("patenteEditar").value = "";
            document.getElementById("kmEditar").value = "";
            document.getElementById("fechaIngresoEditar").value = "";
            document.getElementById("disponibilidadEditar").value = "";

            let modal = bootstrap.Modal.getOrCreateInstance(
                document.getElementById("editarAutoModal")
            );

            modal.hide();

            ObtenerCargaAuto();
        })
        .catch((error) => {
            console.error("No se pudo editar el Auto.", error);
        });
}

function EliminarCargaAuto(cargaAutoId) {
    fetch(`http://localhost:5252/api/CargaAuto/${cargaAutoId}`, {
        method: "DELETE",

        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }

            if (respuesta.status === 204) {
                return null;
            }

            return respuesta.json();
        })
        .then(() => {
            alert("Auto eliminado correctamente.");
            ObtenerCargaAuto();
        })
        .catch((error) => {
            console.error("No se pudo eliminar el auto.", error);
        });
}

ObtenerCargaAuto();