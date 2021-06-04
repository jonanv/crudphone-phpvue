<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD PHONE - PHP VUE</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="./public/libs/bootstrap/css/bootstrap.min.css">
    <!-- FontAwesome -->
    <link rel="stylesheet" href="./public/libs/fontawesome/css/all.min.css">
    <!-- SweetAlert2 CSS -->
    <link rel="stylesheet" href="./public/libs/sweetalert2/css/sweetalert2.min.css">
    <!-- Style CSS -->
    <link rel="stylesheet" href="./public/css/style.css">
</head>
<body>
    <header>
        <h2 class="text-center text-dark">
            <span class="badge badge-success">CRUD con VUE.JS</span>
        </h2>
    </header>

    <div id="app">
        <div class="container">
            <div class="row">
                <div class="col">
                    <button type="" @click="btnCreate();" class="btn btn btn-success" title="Crear">
                        <i class="fas fa-plus-circle fa-2x"></i>
                    </button>
                </div>
                <div class="col text-right">
                    <h5>Stock total: <span class="badge badge-success">{{ totalStock }}</span></h5>
                </div>
            </div>

            <div class="row mt-5">
                <div class="col-lg-12">
                    <table class="table table-striped">
                        <thead>
                            <tr class="bg-primary text-light">
                                <th>ID</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(phone, indice) in phones">
                                <td>{{ phone.id }}</td>
                                <td>{{ phone.brand }}</td>
                                <td>{{ phone.model }}</td>
                                <td>
                                    <div class="col-md-8">
                                        <input type="number" 
                                            v-model.number="phone.stock" 
                                            class="form-control text-right" 
                                            disabled>
                                    </div>
                                </td>
                                <td>
                                    <div class="btn-group" role="group">
                                        <button class="btn btn-secondary"
                                            title="Editar"
                                            @click="btnUpdate(phone.id, phone.marca, phone.modelo, phone.stock)">
                                            <i class="fas fa-pencil-alt"></i>    
                                        </button>
                                        <button class="btn btn-danger"
                                            title="Eliminar"
                                            @click="btnDelete(phone.id)">
                                            <i class="fas fa-trash-alt"></i>    
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- jQuery, Popper JS, Bootstrap JS -->
    <script src="./public/libs/jquery/jquery-3.6.0.min.js"></script>
    <script src="./public/libs/popperjs/popper.min.js"></script>
    <script src="./public/libs/bootstrap/js/bootstrap.min.js"></script>
    <!-- SweetAlert2 JS -->
    <script src="./public/libs/sweetalert2/js/sweetalert2.all.min.js"></script>
    <!-- Vue JS -->
    <script src="./public/libs/vue/vue.min.js"></script>
    <!-- Axios JS -->
    <script src="./public/libs/axios/axios.min.js"></script>
    <!-- Main -->
    <script src="./public/js/main.js"></script>
</body>
</html>