var ctrl = null;

describe("Teste do controller Platform", () => {

    beforeEach(function(){
		angular.mock.module("AppWooza");

		angular.mock.inject(function($controller, $rootScope) {
			$scope = $rootScope.$new();
			ctrl = $controller("PlatformsController", {
				$scope : $scope
			});
        });
        
	});

    it("Deverá passar se a model foi iniciada", () => {
        expect(ctrl.Model).toBeDefined();
	});
	
	it("Deverá retornar verdadeiro após a mudança da propriedade Plataforma", () =>{
		var obj = {
			plataforma: "teste"
		};
		ctrl.Model.Plataforma = obj;
		expect(ctrl.Model.Plataforma).toEqual(obj);
	});
});