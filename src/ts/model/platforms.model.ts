/**
 * Gera a model para o fluxo da plataforma
 */
namespace APPWZ {
    function PlatformsModel() {
        let Model = {};

        _newModel();
        
        return {
            model: returnModel,
            newModel: _newModel
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

        /**
         * Retorna a Model para uso na aplicação
         */
        function returnModel(){
            return Model;
        }        
    }

    angular
        .module("AppWooza")
        .factory("PlatformsModel", PlatformsModel);
}