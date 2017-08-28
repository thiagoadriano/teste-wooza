/**
 * Serviços que linkando o backend com o front end da aplicação
 */
namespace APPWZ {
    PlatformsService.$inject = ["$http", "$q", "API", "MsgInfos", "UtilHelpers"];
    function PlatformsService($http, $q, API, MsgInfos:IMgs, Util) {
        return {
            getPlatforms: _getPlatforms
        }
 
        /**
         * Busca todas as platafomas e as devolve com promise
         */
        function _getPlatforms(){
            let defer = $q.defer();
            $http.get(`${API}plataformas`)
                .then( (result) => {
                    result.data.plataformas.map((item:IPlatform)=>{
                        item.descricao = item.descricao.replace("|", "\n");
                    });
                    defer.resolve(<Array<IPlatform>>result.data.plataformas); 
                })
                .catch( (err) => {
                    console.error(err);
                    MsgInfos.danger("Não foi possível mostrar as plataformas");
                    defer.reject(err);
                });

            return defer.promise;
        }
 
    }

    angular
        .module("AppWooza")
        .service("PlatformsService", PlatformsService);
} 