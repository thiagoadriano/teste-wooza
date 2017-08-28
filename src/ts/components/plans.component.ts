/**
 * Classe construtora do componente de planos
 */
namespace APPWZ{
    
    var objComp = {
        bindings: {
            list: "="
        },
        templateUrl: "../components/plans.html",
        controller: _controller
    };

    _controller.$inject = ["$state", "PlatformsModel"];
    function _controller($state, PM){
        var vm = this;
        
        /**
         * Ação usada na seleção do plano para popular a model
         * @param item {Objeto} - Plano selecionado
         */
        vm.selectPlan = function(item){
            PM.model.Plano = item;
            $state.go("register");
        }


    }   

    angular.module("AppWooza") 
            .component("plans", objComp);
}