var url = 'config/crud.php';
var app = new Vue({
    el: '#app',
    data: {
        phones: [],
        brand: '',
        model: '',
        stock: '',
        total: 0
    },
    methods: {
        // BOTONES
        btnCreate: async function() {
            const { value: formValues } = await Swal.fire({
                title: 'NUEVO',
                html:
                    '<div class="row">' +
                        '<label for="" class="col-sm-3 col-form-label">Marca</label>' +
                        '<div class="col-sm-7">' +
                            '<input type="text" id="brand" class="form-control">' +
                        '</div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<label for="" class="col-sm-3 col-form-label">Modelo</label>' +
                        '<div class="col-sm-7">' +
                            '<input type="text" id="model" class="form-control">' +
                        '</div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<label for="" class="col-sm-3 col-form-label">Stock</label>' +
                        '<div class="col-sm-7">' +
                            '<input type="number" id="stock" class="form-control" min="0">' +
                        '</div>' +
                    '</div>',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                confirmButtonColor: '#1cc88a',
                cancelButtonColor: '#3085d6',
                preConfirm: () => {
                  return [
                    this.brand = document.getElementById('brand').value,
                    this.model = document.getElementById('model').value,
                    this.stock = document.getElementById('stock').value
                  ]
                }
              });
              
              if (this.brand == '' || this.model == '' || this.stock == 0) {
                Swal.fire({
                    title: 'Datos incompletos',
                    icon: 'info',
                    confirmButtonColor: '#3085d6'
                });
              }
              else {
                  this.createPhone();
                  const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000
                  });
                  Toast.fire({
                      title: 'Producto agregado!',
                      icon: 'success'
                  });
              }
        },
        btnUpdate: async function(id, brand, model, stock) {
            await Swal.fire({
                title: 'EDITAR',
                html:
                    '<div class="row">' +
                        '<label for="" class="col-sm-3 col-form-label">Marca</label>' +
                        '<div class="col-sm-7">' +
                            '<input type="text" id="brand" class="form-control" value="'+brand+'">' +
                        '</div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<label for="" class="col-sm-3 col-form-label">Modelo</label>' +
                        '<div class="col-sm-7">' +
                            '<input type="text" id="model" class="form-control" value="'+model+'">' +
                        '</div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<label for="" class="col-sm-3 col-form-label">Stock</label>' +
                        '<div class="col-sm-7">' +
                            '<input type="number" id="stock" class="form-control" min="0" value="'+stock+'">' +
                        '</div>' +
                    '</div>',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
            })
            .then((result) => {
                    if (result.value) {
                        brand = document.getElementById('brand').value,
                        model = document.getElementById('model').value,
                        stock = document.getElementById('stock').value,
                        
                        this.updatePhone(id, brand, model, stock);
                        Swal.fire({
                            title: '!Actualizado!',
                            text: '!El registro ha sido actualizado!',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                        });
                    }
                });
        },
        btnDelete: function(id) {
            Swal.fire({
                title: '¿Estas seguo de borrar el registro: ' + id + '?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Borrar'
            })
            .then((result) => {
                    if (result.value) {
                        this.deletePhone(id);
                        Swal.fire({
                            title: '!Eliminado!',
                            text: '!El registro ha sido borrado!',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                        });
                    }
                });
        },
        // PROCESIMIENTOS
        // Listar
        listPhones: function() {
            axios.post(url, {option: 4})
                .then(response => {
                    // console.log(response);
                    this.phones = response.data;
                });
        },
        // Crear
        createPhone: function() {
            axios.post(url, {option: 1, brand:this.brand, model:this.model, stock:this.stock})
                .then(response => {
                    // console.log(response);
                    this.listPhones();
                });
                this.brand = '';
                this.model = '';
                this.stock = 0;
        },
        // Editar
        updatePhone: function(id, brand, model, stock) {
            axios.post(url, {option: 2, id:id, brand:brand, model:model, stock:stock})
                .then(response => {
                    // console.log(response);
                    this.listPhones();
                });
        },
        // Eliminar
        deletePhone: function(id) {
            axios.post(url, {option: 3, id:id})
                .then(response => {
                    // console.log(response);
                    this.listPhones();
                });
        }
    },
    created: function() {
        this.listPhones();
    },
    computed: {
        totalStock() {
            this.total = 0;
            for(phone of this.phones) {
                this.total += parseInt(phone.stock);
            }
            return this.total;
        }
    }
});