namespace APPWZ {
    PlatformsService.$inject = ["MsgInfos", "UtilHelpers"];
    function PlatformsService(MsgInfos, Util) {
        return {
            Salvar: _save,
            getPlatforms: _getPlatforms,
            getPlan: _getPlan
        }

        function _save(obj) {
            
        }

        function _getPlatforms(){

        }

        function _getPlan(){

        }

       
    }

    angular
        .module("AppWooza")
        .service("PlatformsService", PlatformsService);
}