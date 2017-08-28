/**
 * Classe construtora do componente de planos
 */
namespace APPWZ{
    
    var objComp = {
        bindings: {
            list: "=",
            use: "@"
        },
        templateUrl: "../components/products.html",
        controller: _controller
    };

    _controller.$inject = ["$state", "PlatformsModel"];
    function _controller($state, PM){
        var vm = this,
            model = PM.model();

        /**
         * Ação usada na seleção do plano para popular a model
         * @param item {Objeto} - Plano selecionado
         */
        vm.selectItem = function(item){
            if(vm.use === "Platform"){
                model.Plataforma = item;
                $state.go("plans", {idPlan: item.sku});
            }else{
                model.Plano = item;
                $state.go("register");
            }
            
        }

        vm.$postLink = function(){
            if(vm.use === "Platform"){
                vm.itemEscolhido = model.Plataforma.sku;
            }else{
                vm.itemEscolhido = model.Plano.sku;                
            }
        }


    }   

    angular.module("AppWooza")  
            .component("products", objComp);
}