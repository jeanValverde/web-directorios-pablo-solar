//(function(window){
var _self;
var directorio = {
    vars: {
        ajax: '/URL/',
        constante: null,
    },
    init: function () {
        //inicializar variable de acceso 
        _self = this;

        //HTML


        //lista sucursal 
        _self.lista_sucursal = $('#lista_sucursal');
        _self.helper.margin_top_automatico_lista_sucursal();


        //tabla cuentas
        _self.tabla_principal_cuentas = $('#tabla_principal_cuentas');
        _self.template_cuentas = $('#row_template').html();


        //modal cargando
        _self.modal_cargando = $('#modal_cargando');

        //modal error 
        _self.modal_error =$("#modal_error");
        _self.modal_error_titulo = $("#modal_error_titulo");
        _self.modal_error_tipo_peligro = $("#modal_error_tipo_peligro");
        _self.modal_error_tipo_alerta =$("#modal_error_tipo_alerta");
        _self.modal_error_body =$("#modal_error_body");



        //ejecutar eventos al cargar la pagina 
        _self.setEvents();
    },



    setEvents: function () {

        //eventos 

    },
    actions: {

        getDirectorios: function () {

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


        getSucusales: function () {

        },


        getInicio: function () {

        },

        agregarSucursal: function () {

        },

        editarSucursal: function () {

        },

        agregarCuenta: function () {

        },

        agregarSubcuenta: function () {

        },

        agregarItem: function () {

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
                    SUBCUENTA: cuenta.nombre_subcuenta,
                    ITEM: cuenta.nombre_item,
                    IDSUBCUENTA: cuenta.id_subcuenta
                });
                _self.tabla_principal_cuentas.find('tbody:last').append(row);


            });

            _self.tabla_principal_cuentas.show();

            _self.helper.eliminarIconsCarpetas();

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

            console.log(cuentasFormato);

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

            if(activar){

                _self.modal_error_tipo_peligro.hide();
                _self.modal_error_tipo_alerta.hide();

                if(tipo == 'warning'){
                    _self.modal_error_tipo_alerta.show();
                }else{
                    _self.modal_error_tipo_peligro.show();
                }
                _self.modal_error_body.text(mensaje);
                _self.modal_error_titulo.text(titulo);
                _self.modal_error.modal('show');
            }else{
                _self.modal_error.modal('hide');
            }
        },


        habilitarDragula: function () {
            //dragula([document.querySelector('#SC10200401'), document.querySelector('#SC10200401')]);

            //var el = document.querySelector('.SC10200401');
            //var sortable = Sortable.create(el);

        }, 


        dragit: function (event) {
            shadow=event.target;
        }, 

        dragover: function (e) {
            let t_parent=e.target.parentNode;
            let t_shadow=shadow.parentNode;

            console.log(e);

            t_shadow.insertBefore(e.target,t_shadow.children[2]);
            t_parent.insertBefore(shadow,t_parent.children[2]);
        }






    },
}
window.directorio = directorio;
//})(window);


$(document).ready(function () {
    directorio.init();
});