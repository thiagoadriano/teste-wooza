/**
 * Controle da aplicação para a rota Register
 */
namespace APPWZ {
    RegisterController.$inject = ["RegisterService", "PlatformsModel", "$state", "UtilHelpers", "MsgInfos"];
    function RegisterController(RS, PM:IModel, $state, Util, MsgInfos) {
        let vm = this;
        vm.Model = PM.model();
        vm.goBack = goBack;
        vm.maskCPF = maskCPF;
        vm.maskData = maskData;
        vm.maskTel = maskTel;
        vm.sendForm = sendForm;

 
        init();

        /**
         * Envia os dados do formulário para o serviço
         * @param isValid {boolean} - recebe do formulário se o mesmo está válido
         */
        function sendForm(isValid){
            if(isValid){
                RS.Salvar(vm.Model).then(()=>{
                    PM.newModel();
                    $state.go("platforms")
                });
            }else{
                MsgInfos.danger("Preencha os campos com a borda vermelha");
            }
        }

        /**
         * Mascara de CPF
         */
        function maskCPF(){
            vm.Model.CPF = Util.maskCPF(vm.Model.CPF);
        }

        /**
         * Mascara de Telefone
         */
        function maskTel(){
            vm.Model.Telefone = Util.maskTel(vm.Model.Telefone);
        }

        /**
         * Mascara de Data
         */
        function maskData(){
            vm.Model.Nascimento = Util.maskData(vm.Model.Nascimento);
        }

        /**
         * Voltar para a seleção dos planos
         */
        function goBack(){
            $state.go("plans", {idPlan: vm.Model.Plataforma.sku});
        }

        /**
         * Executa inicialmente o controller
         */
        function init(){

            if(!vm.Model.Plataforma){
                $state.go("platforms");
            }

            if(!vm.Model.Plano){
                $state.go("plans", {idPlan: vm.Model.Plataforma.sku});
            }
        };
       
    }

    angular
        .module("AppWooza")
        .controller("RegisterController", RegisterController);
}