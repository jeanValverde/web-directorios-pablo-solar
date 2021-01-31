
//(function(window){
var _self;
var directorio = {
    vars: {
        ajaxA: '/URL/',
        nombreFormularios: ['form_sucursal', 'form_cuenta', 'form_subcuenta_item', 'form_subcuenta', 'form_item'],
        datosDirectorio : null
    },
    init: function () {
        //inicializar variable de acceso 
        _self = this;

        //HTML


        //lista sucursal 
        _self.lista_sucursal    = $('#lista_sucursal');
        _self.sucursal_template = $("#sucursal_template").html();


        //tabla cuentas
        _self.tabla_principal_cuentas = $('#tabla_principal_cuentas');
        _self.template_cuentas = $('#row_template').html();


        //modal cargando
        _self.modal_cargando = $('#modal_cargando');

        //modal error 
        _self.modal_error = $("#modal_error");
        _self.modal_error_titulo = $("#modal_error_titulo");
        _self.modal_error_tipo_peligro = $("#modal_error_tipo_peligro");
        _self.modal_error_tipo_alerta = $("#modal_error_tipo_alerta");
        _self.modal_error_body = $("#modal_error_body");


        //modal susursal agregar y editar
        _self.modal_sucursal = $('#modal_sucursal');
        _self.modal_sucursal_titulo = $('#modal_sucursal_titulo');
        _self.tipo_sucursal = $('#tipo_sucursal');
        _self.nombre_sucursal = $('#nombre_sucursal');
        _self.id_sucursal = $("#id_sucursal");
        _self.btn_agregar_sucursal = $('#btn_agregar_sucursal');
        _self.guardar_sucursal = $('#guardar_sucursal');

        //modal cuenta  agregar y editar 
        _self.modal_cuenta = $('#modal_cuenta');
        _self.modal_cuenta_titulo = $('#modal_cuenta_titulo');
        _self.tipo_cuenta = $('#tipo_cuenta');
        _self.nombre_cuenta = $('#nombre_cuenta');
        _self.id_cuenta = $("#id_cuenta");
        _self.btn_agregar_cuenta = $("#btn_agregar_cuenta");
        _self.guardar_cuenta = $('#guardar_cuenta');
      

        //directorio actual 
        _self.directoio_actual = $("#directoio_actual");

        //nombre usuario sesion 
        _self.nombre_usuario =$("#nombre_usuario");


        //modal editar subcuenta e item 
        _self.modal_edit_subcuenta_item =$("#modal_edit_subcuenta_item");
        _self.form_subcuenta_item    =$("#form_subcuenta_item");
        _self.modal_subcuenta_item_titulo =$("#modal_subcuenta_item_titulo");
        _self.tipo_subcuenta_item =$("#tipo_subcuenta_item");
        _self.id_subcuenta_item =$("#id_subcuenta_item");
        _self.nombre_subcuenta_item =$("#nombre_subcuenta_item");
        _self.guardar_subcuenta_item = $("#guardar_subcuenta_item");

        
        //modal agregar subcuenta 
        _self.modal_subcuenta =$("#modal_subcuenta");
        _self.form_subcuenta = $("#form_subcuenta");
        _self.select_subcuenta =$("#select_subcuenta");
        _self.nombre_subcuenta = $("#nombre_subcuenta");
        _self.guardar_subcuenta = $("#guardar_subcuenta");
        _self.btn_agregar_subcuenta = $("#btn_agregar_subcuenta");

      
        //modal agregar item 
        _self.modal_agregar_item =$("#modal_agregar_item");
        _self.form_item = $('#form_item');
        _self.select_cuenta_item = $("#select_cuenta_item");
        _self.select_subcuenta_item = $("#select_subcuenta_item");
        _self.nombre_item = $("#nombre_item");
        _self.guardar_item = $("#guardar_item");
        _self.btn_agregar_item = $("#btn_agregar_item");




        //ejecutar eventos al cargar la pagina 
        _self.setEvents();
        _self.helper.validarFormularios();
    },
    setEvents: function () {

        //eventos 

        _self.btn_agregar_sucursal.click(() => {
            _self.helper.modalSucursal();
        });

        //sucursal editar 
        $(".item-btn-sucursal").click(function (e) {
            
            //Obtengo el id desde nuestro boton.
            var id = $(this).attr('id');

            var sucursal = $(this).attr('sucursal');

            _self.helper.modalSucursal(true, 'editar', sucursal, id);

        });

        //guardar form sucursal 
        _self.guardar_sucursal.click((e) => {

            _self.actions.editarAgregarSucursal();
        });

        //cuenta modal 
        _self.btn_agregar_cuenta.click((e) => {
            _self.helper.modalCuenta();
        });

        //guardar cuenta 
        _self.guardar_cuenta.click(() => {
            _self.actions.editarAgregarCuenta();
        });


        $(".editar-directorio").change(function (e1) {

            

            let nombre = $(e1.target).find(":selected").attr("data-nombre");
            let id = $(e1.target).find(":selected").attr("data-id");

            switch ($(e1.target).val()) {
                case "1":
                    //editar la cuenta 
                    _self.helper.modalCuenta(true, 'editar', nombre, id);
                    break;
                case "2":
                    //editar la sub cuenta 
                    _self.helper.modalEditarSubcuentaItem('subcuenta', nombre, id);
                    break;
                case "3":
                    //editar item 
                    _self.helper.modalEditarSubcuentaItem('item', nombre, id);
                    break;
                default:
                    break;
            }

        });

        _self.guardar_subcuenta_item.click((e)=>{
            _self.actions.editarSubcuentaItem();
        });


        _self.guardar_subcuenta.click((e)=>{
            _self.actions.agregarSubCuenta();
        });

        _self.guardar_item.click(()=>{
            _self.actions.agregarItem();
        });


        //cargar select de sub cuenta 
        _self.select_cuenta_item.change(function (e1){
             console.log($(e1.target).val());
            _self.helper.cargarSelectAgregarItem($(e1.target).val());
        });

        //btn agregar subcuenta 
        _self.btn_agregar_subcuenta.click(()=>{
            _self.helper.modalAgregarSubCuenta();
        });

        //btn agregar subcuenta 
        _self.btn_agregar_item.click(()=>{
            _self.helper.modalAgregarItem();
        });


    },
    actions: {

        //Se debe cargar el nombre sesion y  directorio inicial (Solo el nombre y el ID)
        getInicio: function () {
            $.ajax({
                cache: false,
                url: _self.vars.ajax,
                dataType: 'json',
                type: 'POST',
                data: {
                    'datos': 'en formato json',
                },
                beforeSend: function () {
                    //esperando respuesta del servidor 
                    _self.modal_cargando.modal('show');
                },
                success: function (data) {
                    //respuesta exitosa del servidor 


                    _self.nombre_usuario.val(data.respuesta.nombre);
                    _self.helper.initDirectorioActual(data);
                    
                    //una ves que el directorio y el nombre este cargado se debe cargar las sucursales y tabla de directorios 
                    _self.actions.getSucursales();
                    _self.actions.getDirectorios();

                },
                error: function () {
                    //respuesta de error del servidor
                    _self.modal_cargando.modal('hide');

                },
                complete: function () {
                    //al completar la solicitud 
                    _self.modal_cargando.modal('hide');
                },
            });
        },


        getDirectorios: function (idDirectorio = "") {

            $.ajax({
                cache: false,
                url: _self.vars.ajax,
                dataType: 'json',
                type: 'POST',
                data: {
                    'id': idDirectorio,
                },
                beforeSend: function () {
                    //esperando respuesta del servidor 
                    _self.modal_cargando.modal('show');
                },
                success: function (data) {
                    //respuesta exitosa del servidor 
                    _self.helper.initTablaCuentas(data);
                },
                error: function () {
                    //respuesta de error del servidor
                    _self.modal_cargando.modal('hide');

                },
                complete: function () {
                    //al completar la solicitud 
                    _self.modal_cargando.modal('hide');
                },
            });
        },

        getSucursales: function () {
            $.ajax({
                cache: false,
                url: _self.vars.ajax,
                dataType: 'json',
                type: 'POST',
                data: {
                    'dato': '',
                },
                beforeSend: function () {
                    //esperando respuesta del servidor 
                    _self.modal_cargando.modal('show');
                },
                success: function (data) {
                    //respuesta exitosa del servidor 
                    _self.helper.initListaSucursales(data);
                },
                error: function () {
                    //respuesta de error del servidor
                    _self.modal_cargando.modal('hide');
                },
                complete: function () {
                    //al completar la solicitud 
                    _self.modal_cargando.modal('hide');
                },
            });
        }, 

        editarAgregarSucursal: function () {

            let tipo = _self.tipo_sucursal.val();
            let id = _self.id_sucursal.val();
            let nombre = _self.nombre_sucursal.val();

            if (nombre == '' || tipo == '') {
                return false;
            }

            $.ajax({
                cache: false,
                url: _self.vars.ajax,
                dataType: 'json',
                type: 'POST',
                data: {
                    'tipo': tipo,
                    'id': id,
                    'nombre': nombre,
                },
                beforeSend: function () {
                    //esperando respuesta del servidor 
                    _self.modal_cargando.modal('show');
                    _self.helper.modalSucursal(false);

                },
                success: function (data) {
                    //respuesta exitosa del servidor 

                },
                error: function () {
                    //respuesta de error del servidor
                    _self.modal_cargando.modal('hide');

                },
                complete: function () {
                    //al completar la solicitud 
                    _self.modal_cargando.modal('hide');
                },
            });

        },

        editarAgregarCuenta: function () {

            let tipo = _self.tipo_cuenta.val();
            let id = _self.id_cuenta.val();
            let nombre = _self.nombre_cuenta.val();

            if (nombre == '' || tipo == '') {
                return false;
            }

            $.ajax({
                cache: false,
                url: _self.vars.ajax,
                dataType: 'json',
                type: 'POST',
                data: {
                    'tipo': tipo,
                    'id': id,
                    'nombre': nombre,
                },
                beforeSend: function () {
                    //esperando respuesta del servidor 
                    _self.modal_cargando.modal('show');
                    _self.helper.modalCuenta(false);

                },
                success: function (data) {
                    //respuesta exitosa del servidor 

                },
                error: function () {
                    //respuesta de error del servidor
                    _self.modal_cargando.modal('hide');

                },
                complete: function () {
                    //al completar la solicitud 
                    _self.modal_cargando.modal('hide');
                },
            });
        },

        editarSubcuentaItem: function () {
            let tipo = _self.tipo_subcuenta_item.val();
            let id = _self.id_subcuenta_item.val();
            let nombre = _self.nombre_subcuenta_item.val();

            if (nombre == '' || tipo == '') {
                return false;
            }

            $.ajax({
                cache: false,
                url: _self.vars.ajax,
                dataType: 'json',
                type: 'POST',
                data: {
                    'tipo': tipo,
                    'id': id,
                    'nombre': nombre,
                },
                beforeSend: function () {
                    //esperando respuesta del servidor 
                    _self.helper.modalEditarSubcuentaItem();
                    _self.modal_cargando.modal('show');
                },
                success: function (data) {
                    //respuesta exitosa del servidor 

                },
                error: function () {
                    //respuesta de error del servidor
                    _self.modal_cargando.modal('hide');

                },
                complete: function () {
                    //al completar la solicitud 
                    _self.modal_cargando.modal('hide');
                },
            });
        },

        agregarSubCuenta: function () {

            let id = _self.select_subcuenta.val();
            let nombre = _self.nombre_subcuenta.val();

            if (nombre == '' || id == '') {
                return false;
            }

            $.ajax({
                cache: false,
                url: _self.vars.ajax,
                dataType: 'json',
                type: 'POST',
                data: {
                    'id': id,
                    'nombre': nombre,
                },
                beforeSend: function () {
                    //esperando respuesta del servidor 
                    _self.helper.modalAgregarSubCuenta(false);
                    _self.modal_cargando.modal('show');
                },
                success: function (data) {
                    //respuesta exitosa del servidor 

                },
                error: function () {
                    //respuesta de error del servidor
                    _self.modal_cargando.modal('hide');

                },
                complete: function () {
                    //al completar la solicitud 
                    _self.modal_cargando.modal('hide');
                },
            });
        }, 


        agregarItem: function () {

            let idCuenta = _self.select_cuenta_item.val();
            let idSubCuenta = _self.select_subcuenta_item.val();
            let nombre = _self.nombre_item.val();

            if (nombre == '' || idCuenta == '' || idSubCuenta == '') {
                return false;
            }

            $.ajax({
                cache: false,
                url: _self.vars.ajax,
                dataType: 'json',
                type: 'POST',
                data: {
                    'idCuenta': idCuenta,
                    'idSubCuenta': idSubCuenta,
                    'nombre': nombre,
                },
                beforeSend: function () {
                    //esperando respuesta del servidor 
                    _self.helper.modalAgregarItem(false);
                    _self.modal_cargando.modal('show');
                },
                success: function (data) {
                    //respuesta exitosa del servidor 

                },
                error: function () {
                    //respuesta de error del servidor
                    _self.modal_cargando.modal('hide');

                },
                complete: function () {
                    //al completar la solicitud 
                    _self.modal_cargando.modal('hide');
                },
            });

        }



    },
    helper: {

        //para redirigir pagina sin actualizar y cargar 
        post_to_url: function (path, method, params) {
            method = method || "post";
            var form = document.createElement("form");
            form.setAttribute("method", method);
            form.setAttribute("action", path);
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    var hiddenField = document.createElement("input");
                    hiddenField.setAttribute("type", "hidden");
                    hiddenField.setAttribute("name", key);
                    hiddenField.setAttribute("value", params[key]);
                    form.appendChild(hiddenField);
                }
            }
            document.body.appendChild(form);
            form.submit();
        },

        // Sleep con promesas
        sleep: function (ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },


        isEmpty: function (obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        },

        //metodo para dar un borde automatico definido por requerimiento
        margin_top_automatico_lista_sucursal: function () {
            let listaSucusales = _self.lista_sucursal.find('li');
            let contador = 0;
            listaSucusales.each(function () {
                if (contador >= 1) {
                    $(this).addClass("mt-2");
                }
                contador = contador + 1;
            });
        },


        initTablaCuentas: function (cuentas) {
            let cuentask = { "respuesta": [["C01210224", "Finanzas", "2", "", "", "", "", "", "", 0], ["C10200220", "Recursos Humanos", "1", "SC10200400", "Casa Matriz", "1.1", "It10200702", "Gerencia", "1.1.1", 11001], ["C10200220", "Recursos Humanos", "1", "SC10200401", "Sede Vi\u00f1a del Mar", "1.2", "It10200703", "Profesores", "1.2.1", 12001], ["C10200220", "Recursos Humanos", "1", "SC10200401", "Sede Vi\u00f1a del Mar", "1.2", "It10200703", "Alumnos", "1.2.1", 12001], ["C10200220", "Recursos Humanos", "1", "SC10200401", "Sede Vi\u00f1a del Mar", "1.2", "It10200703", "Inspectores", "1.2.1", 12001]] };

            _self.tabla_principal_cuentas.find('tbody:last').empty();

            //ordenar por orden de cuenta 
            cuentask.respuesta.sort(function (a, b) {
                return a[2] - b[2];
            });

            cuentaFormato = _self.helper.formatoCuentas(cuentask.respuesta);

            cuentaFormato.sort((a, b) => (a + b)).forEach(cuenta => {

                var row = _self.helper.replaceTemplate(_self.template_cuentas, {
                    CUENTA: cuenta.nombre_cuenta,
                    IDCUENTA: cuenta.id_cuenta,
                    ORDENCUENTA: cuenta.orden_cuenta,
                    SUBCUENTA: cuenta.nombre_subcuenta,
                    ITEM: cuenta.nombre_item,
                    IDSUBCUENTA: cuenta.id_subcuenta,
                    ORDENSUBCUENTA: cuenta.orden_subcuenta,
                    IDITEM: cuenta.id_item,
                    ORDENITEM: cuenta.orden_item
                });
                _self.tabla_principal_cuentas.find('tbody:last').append(row);

            });

            _self.tabla_principal_cuentas.show();
            _self.helper.eliminarIconsCarpetas();
            _self.setEvents();

        },


        initListaSucursales: function (sucursales) {
            let sucursaless = { "respuesta": [["Casa Matriz", "MA324342"], ["Valparaiso", "MA3243s42"], ["Casa Blanca", "MA3243423"], ["Forestal", "MA32434f2"]] };

            var idDirectorioActual = _self.directoio_actual.attr('idsucursal');

            const formatoSucursales = (() => {

                let sucursalesF = new Array();

                sucursaless.respuesta.forEach(sucursal => {
                    let formato = {
                        id_sucursal: sucursal[1],
                        nombre: sucursal[0]
                    }
                    sucursalesF.push(formato);
                });
                return sucursalesF;
            });

            _self.lista_sucursal.empty();

            formatoSucursales().forEach(sucursal => {
                let activo = 'bg-palid';
                if (idDirectorioActual == sucursal.id_sucursal) {
                    activo = 'bg-principal';
                }
                var row = _self.helper.replaceTemplate(_self.sucursal_template, {
                    IDSUCURSAL: sucursal.id_sucursal,
                    SUCURSAL: sucursal.nombre,
                    ACTIVE: activo
                });
                _self.lista_sucursal.append(row);
            });
            _self.helper.margin_top_automatico_lista_sucursal();
            _self.setEvents();
        },

        eliminarIconsCarpetas: function () {

            _self.tabla_principal_cuentas.find('td').each(function () {
                if ($(this).text().trim().length == 0) {
                    $(this).find('i').remove();
                }
            });


        },

        formatoCuentas: function (cuentas) {


            let cuentasFormato = new Array();

            cuentas.forEach(cuenta => {

                let formato = {
                    id_cuenta: cuenta[0],
                    nombre_cuenta: cuenta[1],
                    orden_cuenta: cuenta[2],
                    id_subcuenta: cuenta[3],
                    nombre_subcuenta: cuenta[4],
                    orden_subcuenta: cuenta[5],
                    id_item: cuenta[6],
                    nombre_item: cuenta[7],
                    orden_item: cuenta[8]
                }

                cuentasFormato.push(formato);
            });

            _self.vars.datosDirectorio = cuentasFormato;

            _self.helper.eliminarRepetidos(cuentasFormato);

            return cuentasFormato;

        },


        eliminarRepetidos: function (cuentas) {
            let arrayVista = new Array();


            cuentas.forEach(cuenta => {


                arrayVista.forEach(cuentaAgregada => {
                    if (arrayVista.length >= 1) {
                        if (cuenta.nombre_cuenta == cuentaAgregada.nombre_cuenta) {
                            cuenta.nombre_cuenta = '';
                        }

                        if (cuenta.nombre_subcuenta == cuentaAgregada.nombre_subcuenta) {
                            cuenta.nombre_subcuenta = '';
                        }
                    }


                });


                arrayVista.push(cuenta);
            });

        },

        // para reemplazar el templates (EON)
        replaceTemplate: function (template, params) {
            for (var k in params) {
                if (params.hasOwnProperty(k)) {
                    var rx = new RegExp('_' + k + '_', 'g');
                    if (template.search(rx) >= 0) {
                        template = template.replace(rx, params[k]);
                    }
                }
            }
            return template;
        },

        modalError: function (activar, tipo, titulo, mensaje) {

            if (activar) {

                _self.modal_error_tipo_peligro.hide();
                _self.modal_error_tipo_alerta.hide();

                if (tipo == 'warning') {
                    _self.modal_error_tipo_alerta.show();
                } else {
                    _self.modal_error_tipo_peligro.show();
                }
                _self.modal_error_body.text(mensaje);
                _self.modal_error_titulo.text(titulo);
                _self.modal_error.modal('show');
            } else {
                _self.modal_error.modal('hide');
            }
        },


        habilitarDragula: function () {
            //dragula([document.querySelector('#SC10200401'), document.querySelector('#SC10200401')]);

            //var el = document.querySelector('.SC10200401');
            //var sortable = Sortable.create(el);


        },


        dragit: function (event) {
            shadow = event.target;
        },

        dragover: function (e) {
            let t_parent = e.target.parentNode;
            let t_shadow = shadow.parentNode;

            console.log(e);

            t_shadow.insertBefore(e.target, t_shadow.children[2]);
            t_parent.insertBefore(shadow, t_parent.children[2]);
        },

        //validar formualrios por el nombre del form 
        validarFormularios: function () {
            _self.vars.nombreFormularios.forEach(name => {
                var nameForm = $("form[name=" + name + "]")[0];
                validatorForms(nameForm);
            });
        },

        initDirectorioActual:function (directorio) {
            let directorioss = {"respuesta":["MA3243423", "Casa Blanca"] };
            _self.directoio_actual.attr("idsucursal", directorioss.respuesta[0]);
            _self.directoio_actual.text(directorioss.respuesta[1]);
        }, 

        cargarSelectAgregarItem: function (id_cuenta='') {


            if(id_cuenta != ''){

                _self.select_subcuenta_item.empty();
                let filaInicial = '<option value="select">Seleccione</option>';
                _self.select_subcuenta_item.append(filaInicial);

                _self.vars.datosDirectorio.forEach(directorio => {
                    if(directorio.id_cuenta == id_cuenta ){
                        if(directorio.nombre_subcuenta != ''){
                            let row = '<option value="'+ directorio.id_subcuenta +'">'+ directorio.nombre_subcuenta +'</option>';
                            _self.select_subcuenta_item.append(row);
                        }
                    }
                });
            }
            
        }, 

        modalSucursal: function (acitvar = true, tipo = 'agregar', nombreSucursal = '', idSucursal = '') {

            if (acitvar) {

                if (tipo == 'agregar') {
                    _self.modal_sucursal_titulo.text("Agregar Sucursal");
                    _self.tipo_sucursal.val("agregar");
                } else {
                    _self.modal_sucursal_titulo.text("Editar Sucursal");
                    _self.tipo_sucursal.val("editar");
                }

                _self.id_sucursal.val(idSucursal);
                _self.nombre_sucursal.val(nombreSucursal);
                _self.modal_sucursal.modal('show');
            } else {
                _self.modal_sucursal.modal('hide');
            }

        },

        modalCuenta: function (acitvar = true, tipo = 'agregar', nombreCuenta = '', idCuenta = '') {

            if (acitvar) {

                if (tipo == 'agregar') {
                    _self.modal_cuenta_titulo.text("Agregar Cuenta");
                    _self.tipo_cuenta.val("agregar");
                } else {
                    _self.modal_cuenta_titulo.text("Editar Cuenta");
                    _self.tipo_cuenta.val("editar");
                }

                _self.id_cuenta.val(idCuenta);
                _self.nombre_cuenta.val(nombreCuenta);
                _self.modal_cuenta.modal('show');
            } else {
                _self.modal_cuenta.modal('hide');
            }

        },


        modalEditarSubcuentaItem: function (tipo="", nombre = '', id = '') {
            //subcuenta - cuenta 
            console.log('modal editar subcuenta item');

            var datos = {
                'tipo' : tipo, 
                'nombre' : nombre, 
                'id' : id
            }

            console.log(datos);
            if(tipo != '' & nombre != '' & id != ''){

                _self.tipo_subcuenta_item.val(tipo);
                _self.id_subcuenta_item.val(id);
                _self.nombre_subcuenta_item.val(nombre);

                if(tipo == 'subcuenta'){
                    _self.modal_subcuenta_item_titulo.text("Editar Subcuenta");
                }else{
                    _self.modal_subcuenta_item_titulo.text("Editar Item");
                }

                _self.modal_edit_subcuenta_item.modal('show');
            }else if (tipo == ''){
                _self.modal_edit_subcuenta_item.modal('hide');
            }else{
                _self.helper.modalError(true, 'warning', 'Error Editar', 'Debe seleccionar en la fila correspondiente');
            }
    
        }, 


        modalAgregarSubCuenta: function (activo= true) {

            if(activo){        

                _self.select_subcuenta.empty();
                let filaInicial = '<option value="select">Seleccione</option>';
                _self.select_subcuenta.append(filaInicial);
                //cargar las cuentas en el select 
                _self.vars.datosDirectorio.forEach(directorio => {
                    
                    if(directorio.nombre_cuenta != ''){
                        let row = '<option value="'+ directorio.id_cuenta +'">'+ directorio.nombre_cuenta +'</option>';
                        _self.select_subcuenta.append(row);
                    }

                });

                _self.modal_subcuenta.modal('show');
            }else{
                _self.modal_subcuenta.modal('hide');
            }

        }, 

        modalAgregarItem: function (activo = true) {


            if(activo){


                _self.select_cuenta_item.empty();
                let filaInicial = '<option value="select">Seleccione</option>';
                _self.select_cuenta_item.append(filaInicial);


                 //cargar las cuentas en el select 
                 _self.vars.datosDirectorio.forEach(directorio => {
                    
                    if(directorio.nombre_cuenta != ''){
                        let row = '<option value="'+ directorio.id_cuenta +'">'+ directorio.nombre_cuenta +'</option>';
                        _self.select_cuenta_item.append(row);
                    }

                });

                _self.modal_agregar_item.modal('show');
            }else{
                _self.modal_agregar_item.modal('hide');
            }

        }, 

        

    },
}
window.directorio = directorio;
//})(window);


$(document).ready(function () {
    directorio.init();
    //directorio.actions.getInicio();
});