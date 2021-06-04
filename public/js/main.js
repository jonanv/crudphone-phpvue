var app = new Vue({
    el: '#app',
    data: {
        phones: [],
        marca: '',
        model: '',
        stock: '',
        total: 0,
        totalStock: 0
    },
    methods: {
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
        btnUpdate: async function(id, marca, modelo, stock) {
            const { value: formValues } = await Swal.fire({
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
                }).then((result) => {
                    if (result) {
                        brand = document.getElementById('brand').value,
                        model = document.getElementById('model').value,
                        stock = document.getElementById('stock').value,
                        
                        this.updatePhone(id, marca, modelo, stock);
                        Swal.fire({
                            title: '!Actualizado!',
                            text: '!El registro ha sido actualizado!',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                        });
                    }
                });
        },
        btnDelete: async function(id) {},
        
    },
    created: function() {},
    computed: {}
});