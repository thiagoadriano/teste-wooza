/**
 * Controle da aplicação para a rota platforms
 */
namespace APPWZ {
    PlatformsController.$inject = ["PlatformsService", "PlatformsModel", "UtilHelpers"];
    function PlatformsController(PS:IServicePlatform, PM:IModel, Util) {
        let vm = this;
        vm.listPlatforms = []; 
        vm.listPlan = [];
        vm.Model = PM.model();
        vm.saveForm = saveForm;
 
        init();

        /**
         * Salva os dados do formulário e on envia para o serviço
         * @param isValid {boolean} - indica se os valores do formulário foram preenchidos
         */
        function saveForm(isValid){

        }

        /**
         * Executa inicialmente o controller
         */
        function init(){
            PS.getPlatforms().then((result)=>{
                result.map((item)=>{
                    item.icone = Util.getIcon(item.nome);
                });
                vm.listPlatforms = result;
            });
        };
       
    }

    angular
        .module("AppWooza")
        .controller("PlatformsController", PlatformsController);
}