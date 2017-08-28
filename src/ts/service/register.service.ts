/**
 * Serviço que conclui a aplicação
 */
namespace APPWZ {
    RegisterController.$inject = ["$http", "$q", "API", "MsgInfos"];
    function RegisterController($http, $q, API, MsgInfos:IMgs) {
        return {
            Salvar: _save,
        }
 
        /**
         * Salva os dados do que foi selecionado e preenchido no fluxo da plataforma
         * @param obj {Object} Model da plataforma
         */
        function _save(obj) {
            console.log(obj);
            MsgInfos.success("Os dados foram enviados com sucesso!");
        }

    }

    angular
        .module("AppWooza")
        .service("RegisterController", RegisterController);
}