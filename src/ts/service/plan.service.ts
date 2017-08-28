/**
 * Serviço para planos que linka o backend com o front end da aplicação
 */
namespace APPWZ {
    PlansService.$inject = ["$http", "$q", "API", "MsgInfos"];
    function PlansService($http, $q, API, MsgInfos:IMgs) {
        return {
            getPlans: _getPlans
        }
 
        /**
         * Busca os planos informados pela plataforma selecionada
         * @param plan {string} id da plataforma selecionada
         */
        function _getPlans(plan:string){
            let defer = $q.defer();
            $http.get(`${API}planos/${plan}`)
                .then( (result) => {
                    result.data.planos.filter( (item) => item.ativo );
                    defer.resolve(<Array<IPlanoWifi|IPlanoAparelho>>result.data.planos); 
                })
                .catch( (err) => {
                    console.error(err);
                    MsgInfos.danger(`Não foi possível buscar os planos para a plataforma selecionada`);
                    defer.reject(err);
                });

            return defer.promise;
        }
 
    }

    angular
        .module("AppWooza")
        .service("PlansService", PlansService);
} 