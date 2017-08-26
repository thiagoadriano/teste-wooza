/**
 * Serviços que linkando o backend com o front end da aplicação
 */
namespace APPWZ {
    PlatformsService.$inject = ["$http", "$q", "API", "MsgInfos", "UtilHelpers"];
    function PlatformsService($http, $q, API, MsgInfos:IMgs, Util) {
        return {
            Salvar: _save,
            getPlatforms: _getPlatforms,
            getPlan: _getPlan
        }
 
        /**
         * Salva os dados do que foi selecionado e preenchido no fluxo da plataforma
         * @param obj {Object} Model da plataforma
         */
        function _save(obj) {
            console.log(obj);
            MsgInfos.success("Os dados foram enviados com sucesso!");
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

        /**
         * Busca os planos informados pela plataforma selecionada
         * @param plan {string} id da plataforma selecionada
         */
        function _getPlan(plan:string){
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
        .service("PlatformsService", PlatformsService);
}