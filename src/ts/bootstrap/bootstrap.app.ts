namespace APPWZ {
    appRun.$inject = [];
    
    function appRun() { }

    angular
        .module('AppWooza', ["ngRoute"])
        .constant("API", "http://private-59658d-celulardireto2017.apiary-mock.com/")
        .run(appRun);
}