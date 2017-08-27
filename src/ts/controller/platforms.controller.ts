/**
 * Controle da aplicação para a rota platforms
 */
namespace APPWZ {
    PlatformsController.$inject = ["PlatformsService", "PlatformsModel"];
    function PlatformsController(PS:IServicePlatform, PM:IModel) {
        let vm = this;
        vm.listPlatforms = []; 
        vm.listPlan = [];
        vm.Model = PM.model;
        vm.saveForm = saveForm;
 
        init();


        /**
         * Salva os dados do formulário e on envia para o serviço
         * @param isValid {boolean} - indica se os valores do formulário foram preenchidos
         */
        function saveForm(isValid){

        }

        /**
         * Função retorna o icone para o tipo especificado
         * @param idclass classe de complementação para o icone
         */
        function getIcon(idclass:string):string{
            let icon = {
                computador: "laptop",
                tablet: "tablet",
                wifi: "connection"
            }
            return icon[idclass.toLowerCase().replace(/\-/g, '')];            
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
                result.map((item)=>{
                    item.icone = getIcon(item.nome);
                });
                vm.listPlatforms = result;
            });
        };
       
    }

    angular
        .module("AppWooza")
        .controller("PlatformsController", PlatformsController);
}