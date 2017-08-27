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
         * Limpa a model e cria nova referencia
         */
        function _newModel() {
            Model = {
                Plataforma: "",
                Plano: "",
                Nome: "",
                Email: "",
                Nascimento: "",
                CPF: "",
                Telefone: ""
            };
        }

        return {
            model: Model,
            newModel: _newModel
        };
    }

    angular
        .module("AppWooza")
        .factory("PlatformsModel", PlatformsModel);
}