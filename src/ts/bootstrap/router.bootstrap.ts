namespace APPWZ {

    Router.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
    function Router($stateProvider, $urlRouterProvider, $locationProvider) {
        let RoutesStates = [];

        RoutesStates.push({
            name: 'platforms',
            url: '/platforms',
            templateUrl: 'views/platforms.html',
            controller: 'PlatformsController',
            controllerAs: "vm"
        });

        RoutesStates.push({
            name: 'plans',
            url: '/planos/:idPlan',
            templateUrl: 'views/plans.html',
            controller: 'PlansController',
            controllerAs: "vm"
        });

        RoutesStates.push({
            name: 'register',
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'RegisterController',
            controllerAs: "vm"
        });

        RoutesStates.forEach( (state) => {
            $stateProvider.state(state);
        })

        $urlRouterProvider.otherwise("/platforms");
        $locationProvider.html5Mode(true);
    }

    angular
        .module("AppWooza")
        .config(Router);
}