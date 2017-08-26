namespace APPWZ {
    appRun.$inject = [];
    function appRun() {

    }

    angular
        .module('AppWooza', ["ngRoute"])
        .run(appRun);
}