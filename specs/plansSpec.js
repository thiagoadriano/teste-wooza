var ctrl = null;

describe("Teste do controller Plans", () => {

    beforeEach(function(){
		angular.mock.module("AppWooza");
		
		angular.mock.inject(function($controller, $rootScope) {
			$scope = $rootScope.$new();
			ctrl = $controller("PlansController", {
				$scope : $scope
			});
        });
        
	});

    it("Deverá passar se a model foi iniciada", () => {
        expect(ctrl.Model).toBeDefined();
	});

	it("Deverá retornar verdadeiro após a mudança da propriedade Plano", () =>{
		var obj = {
			plano: "teste"
		};
		ctrl.Model.Plano = obj;
		expect(ctrl.Model.Plano).toEqual(obj);
	});
});