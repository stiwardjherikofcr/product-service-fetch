/**
 * url de la api
 */
const API_URL = "http://" + window.location.hostname + ":8091/products/";


/**
 * funcion asincrona para leer un json
 * @param {*} url 
 * @returns 
 */
async function leerJSON(url) {
    try {
        let response = await fetch(url);
        let user = await response.json();
        return user;
    } catch (err) {
        alert(err);
    }
}


/**
 * funcion para los options de fetch 
 * @param {*} methods 
 * @param {*} product 
 * @returns 
 */
function options(methods, product) {
    return option = {
        method: methods,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product),
    };
}


/**
 * Lista los productos
 */
function listProduct() {
    let url = API_URL;
    let table = "";
    leerJSON(url).then((products) => {
        products.forEach(product => {
            if (product.status !== 'DELETED') {
                table += /*html*/ `<tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.description}</td>
                        <td>${product.price}</td>
                        <td>${product.stock}</td>
                        <td>${product.category.name}</td>
                        <td>
                            <div class="form-button-action">
                                <button class="btn btn-warning mr-2" data-toggle="modal" data-target="#addRowModal" onclick="getProduct(${product.id})">Editar</button>
                                <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Eliminar</button>
                            </div>
                        </td>
                    </tr>`;
                document.getElementById("products").innerHTML = table;
            }
        });
    });
}


/**
 * Busca un producto por id
 * @param {*} id 
 */
function getProduct(id) {
    $("#addRowButton").attr("onclick", "updateProduct()");
    let url = API_URL + id;
    leerJSON(url).then((product) => {
            document.getElementById("id").value = product.id;
            document.getElementById("name").value = product.name;
            document.getElementById("description").value = product.description;
            document.getElementById("stock").value = product.stock;
            document.getElementById("price").value = product.price;
            document.getElementById("category").value = product.category.id;
        }).then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
}


/**
 * Lista las categorias 
 */
function getCategories() {
    let url = "http://" + window.location.hostname + ":8091/category";
    leerJSON(url).then((categories) => {
        let select = "";
        categories.forEach(category => {
            select += /*html*/ `<option value="${category.id}">${category.name}</option>`;
        });
        document.getElementById("category").innerHTML = select;
    });
}


/**
 * Crea un producto
 */
function createProduct() {
    let url = API_URL;
    let product = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value,
        category: {
            id: document.getElementById("category").value,
            name: document.getElementById("category").options[document.getElementById("category").selectedIndex].text
        }
    };
    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Registrado',
                showConfirmButton: false,
                timer: 1500
            })
            listProduct();
        })
        .catch(error => console.error('Error:', error));
}


/**
 * Actualiza un producto
 */
function updateProduct() {
    let url = API_URL + document.getElementById("id").value;
    let product = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value,
        category: {
            id: document.getElementById("category").value,
            name: $("#category option").filter(':selected').val()
        }
    };
    fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product),
        })
        .then(response => {
            if (response.status == 200) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Modificado',
                    showConfirmButton: false,
                    timer: 1500
                })
                listProduct();
                return response.json();
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
        .then(data => console.log(data))
        .catch(error => console.error(error));
}


/**
 * Elimina un producto de la lista por id
 * @param {*} id 
 */
function deleteProduct(id) {
    let url = "http://" + window.location.hostname + ":8091/products/" + id;
    Swal.fire({
        title: 'Estas seguro?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, bórralo!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(url, {
                    method: 'DELETE',
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data)
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado!',
                        text: 'Su archivo ha sido eliminado.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    listProduct();
                })
                .catch(error => console.error('Error:', error));
        }
    })
}


/**
 * Cambia atributo onclick de boton createProduct segun sea necesario
 */
function btnCreateProduct() {
    clearInput();
    getCategories();
    document.getElementById("addRowButton").setAttribute("onclick", "createProduct()")
}


/**
 * Limpia los campos de texto del modal
 */
function clearInput() {
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";
}


/**
 * Carga al inicio de la pagina la lista de productos y lista de categorias
 */
$(document).ready(function () {
    listProduct();
    getCategories();

    $('#lista-productos').DataTable({
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json'
        }
    });

    $('#addRowButton').click(function () {
        $('#addRowModal').modal('hide');
    });

    setInterval(function () {
        listProduct();
    }, 3000);
});