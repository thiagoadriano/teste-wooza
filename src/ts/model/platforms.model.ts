namespace APPWZ {
    function PlatformsModel() {
        let Model = {
            
        };

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