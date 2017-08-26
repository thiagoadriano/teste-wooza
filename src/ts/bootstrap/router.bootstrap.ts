namespace APPWZ {

    Router.$inject = ["$routeProvider"];
    function Router($routeProvider: ng.route.IRouteProvider) {
        $routeProvider
            .when("/platforms", {
                templateUrl: "views/platforms.html",
                controller: "PlatformsController",
                controllerAs: "vm"
            })
            .otherwise({
                redirectTo: "/platforms"
            });
    }

    angular
        .module("AppWooza")
        .config(Router);
}