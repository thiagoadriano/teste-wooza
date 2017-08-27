namespace APPWZ{

    var objComp = {
        bindings: {
            list: "=",
            model: "="
        },
        templateUrl: "../components/product.html",
        controller: _controller
    };

    _controller.$inject = ["$state"];
    function _controller($state){
        var vm = this;
        /**
         * Ação usada na seleção da plataforma para popular a model
         * @param item {Objeto} - Plataforma selecionada
         */
        vm.selecionaPlataforma = function(item){
            vm.model = item;
            $state.go("plans", {idPlan: vm.model.sku});
        }
       

    }   

    angular.module("AppWooza") 
            .component("products", objComp);
}