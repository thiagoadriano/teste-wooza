describe("Iniciando Aplicação", () => {

    beforeEach(function(){
		angular.mock.module("AppWooza");
		
		angular.mock.inject(function($controller, $rootScope) {
			$scope = $rootScope.$new();
			$controller("PlatformsController", {
				$scope : $scope
			});
        });
        
	});

    it("verificando uso do angular", () => {

    });
});