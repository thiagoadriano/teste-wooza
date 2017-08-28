/**
 * Controle da aplicação para a rota Plans
 */
namespace APPWZ {
    PlansController.$inject = ["PlansService", "PlatformsModel", "$state"];
    function PlansController(PlS, PM:IModel, $state) {
        let vm = this;
        vm.listPlans = [];
        vm.Model = PM.model();

 
        init();

        /**
         * Executa inicialmente o controller
         */
        function init(){
            PlS.getPlans(vm.Model.Plataforma.sku).then((result)=>{
                vm.listPlans = result;
            });

            if(!vm.Model.Plataforma){
                $state.go("platforms")
            }
        };
       
    }

    angular
        .module("AppWooza")
        .controller("PlansController", PlansController);
}