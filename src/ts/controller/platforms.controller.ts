/**
 * Controle da aplicação para a rota platforms
 */
namespace APPWZ {
    PlatformsController.$inject = ["PlatformsService", "PlatformsModel"];
    function PlatformsController(PS:IServicePlatform, PM:IModel) {
        let vm = this;
        vm.listPlatforms = [];
        vm.listPlan = [];
        vm.Model = PM.model();
        vm.saveForm = saveForm;
        vm.selecionaPlataforma = selecionaPlataforma;

        init();

        /**
         * Ação usada na seleção da plataforma para popular a model
         * @param item {Objeto} - Plataforma selecionada
         */
        function selecionaPlataforma(item){
            vm.Model.Plataforma = item;
            console.log(vm.Model.Plataforma);
        }
        /**
         * Salva os dados do formulário e on envia para o serviço
         * @param isValid {boolean} - indica se os valores do formulário foram preenchidos
         */
        function saveForm(isValid){

        }

        /**
         * Busca os planos a partir do plano informado na model
         */
        function getPlan(){
            PS.getPlan(vm.Model.Plataforma.sku)
                .then((result)=>{
                    vm.listPlan = result;
                });
        }

        /**
         * Executa inicialmente o controller
         */
        function init(){
            PS.getPlatforms().then((result)=>{
                vm.listPlatforms = result;
            });
        };
       
    }

    angular
        .module("AppWooza")
        .controller("PlatformsController", PlatformsController);
}