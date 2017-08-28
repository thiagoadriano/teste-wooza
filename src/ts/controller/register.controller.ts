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
            if(!isValid){
                MsgInfos.danger("Preencha os campos com a borda vermelha");
                return;
            }

            if(validateCampos()){
                RS.Salvar(vm.Model).then(()=>{
                    PM.newModel();
                    $state.go("platforms")
                });
            }
        }

        /**
         * Valida se os dados recebidos conferem com o padrão estabelecido
         */
        function validateCampos(){
            let cpfPattern = /\d{3}\.\d{3}\.\d{3}-\d{2}/,
                dataPattern = /\d{2}\/\d{2}\/\d{4}/,
                emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                telPattern = /\(\d{2}\)\s\d{4,5}-\d{4}/,
                invalid = 0;
            
            if(!cpfPattern.test(vm.Model.CPF)){
                MsgInfos.danger("O CPF não está no padrão correto. Ex: 123.456.789-10");
                invalid++;
            }

            if(!dataPattern.test(vm.Model.Nascimento)){
                MsgInfos.danger("A data de Nascimento não está no padrão correto. Ex: 12/10/1980");
                invalid++;                
            }

            if(!emailPattern.test(vm.Model.Email)){
                MsgInfos.danger("O Email não está no padrão correto. Ex: fulano@beltrano.com");
                invalid++;                
            }

            if(!telPattern.test(vm.Model.Telefone)){
                MsgInfos.danger("O Telefone não está no padrão correto. Ex: (21) 23456-9874");
                invalid++;                
            }

            if(invalid > 0){
                return false;
            }

            return true;
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