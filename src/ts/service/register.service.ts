/**
 * Serviço que conclui a aplicação
 */
namespace APPWZ {
    RegisterService.$inject = ["$http", "$q", "API", "MsgInfos"];
    function RegisterService($http, $q, API, MsgInfos:IMgs) {
        return {
            Salvar: _save,
        }
 
        /**
         * Salva os dados do que foi selecionado e preenchido no fluxo da plataforma
         * @param obj {Object} Model da plataforma
         */
        function _save(obj) {
            let defer = $q.defer();

            console.log(obj);
            setTimeout(() => {
                MsgInfos.success("Os dados foram enviados com sucesso!");
                defer.resolve();
            }, 1000);
            return defer.promise;
        }

    }

    angular
        .module("AppWooza")
        .service("RegisterService", RegisterService);
}