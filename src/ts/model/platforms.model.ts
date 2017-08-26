/**
 * Gera a model para o fluxo da plataforma
 */
namespace APPWZ {
    function PlatformsModel() {
        let Model = {
            Plataforma: "",
            Plano: "",
            Nome: "",
            Email: "",
            Nascimento: "",
            CPF: "",
            Telefone: ""
        };

        /**
         * Retorma a copiado model gerando uma nova instancia para esse objeto
         */
        function getModel() {
            return angular.copy(Model);
        }

        return {
            model: getModel
        };
    }

    angular
        .module("AppWooza")
        .factory("PlatformsModel", PlatformsModel);
}