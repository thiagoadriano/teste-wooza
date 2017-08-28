/**
 * Classe construtora do componente de produtos
 */
namespace APPWZ{

    var objComp = {
        bindings: {
            list: "="
        },
        templateUrl: "../components/product.html",
        controller: _controller
    };

    _controller.$inject = ["$state", "PlatformsModel"];
    function _controller($state, PM){
        var vm = this;
        
        /**
         * Ação usada na seleção da plataforma para popular a model
         * @param item {Objeto} - Plataforma selecionada
         */
        vm.selecionaPlataforma = function(item){
            PM.model.Plataforma = item;
            $state.go("plans", {idPlan: item.sku});
        }

        vm.$postLink = function(){
            vm.plataforma = PM.model.Plataforma;
        }

    }   

    angular.module("AppWooza") 
            .component("products", objComp);
}