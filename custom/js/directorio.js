(function(window){
    var _self;
    var directorio ={
        vars:{
            ajax           : '/URL/',
            constante      : null,
        },
        init: function() {
            //inicializar variable de acceso 
            _self                           = this;
            
            //HTML


            //ejecutar eventos al cargar la pagina 
            _self.setEvents();

        },
        setEvents: function(){

          //eventos 

        },
        actions:{

            metodosAjax: function(){
               
                $.ajax({
                    cache:      false,
                    url:        _self.vars.ajax,
                    dataType:   'json',
                    type:       'POST',
                    data:       {
                        'datos'  : 'en formato json',
                    },
                    beforeSend: function() {
                        //esperando respuesta del servidor 
                    },
                    success: function(data) {
                        //respuesta exitosa del servidor 
                    },
                    error: function() {
                        //respuesta de error del servidor
                    },
                    complete: function() {
                        //al completar la solicitud 
                    },
                });
            },

            
        },
        helper:{

            //para redirigir pagina sin actualizar y cargar 
            post_to_url: function (path, method, params) {
                method = method || "post";
                var form = document.createElement("form");
                form.setAttribute("method", method);
                form.setAttribute("action", path);
                for(var key in params) {
                    if(params.hasOwnProperty(key)) {
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
            sleep: function(ms) {
                return new Promise((resolve) => setTimeout(resolve, ms));
            },
         

            isEmpty : function (obj) {
                for(var key in obj) {
                    if(obj.hasOwnProperty(key))
                        return false;
                }
                return true;
            },
        },
    }
    window.directorio = directorio;
})(window);


$(document).ready(function() {
    directorio.init();
});