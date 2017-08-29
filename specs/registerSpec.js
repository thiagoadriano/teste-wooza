var ctrl = null;

describe("Teste do controller Register", () => {

    beforeEach(function(){
		angular.mock.module("AppWooza");
		
		angular.mock.inject(function($controller, $rootScope) {
			$scope = $rootScope.$new();
			ctrl = $controller("RegisterController", {
				$scope : $scope
			});
        });
        
	});

    it("Deverá passar se a model foi iniciada", () => {
        expect(ctrl.Model).toBeDefined();
	});

	it("Deverá validar o CPF", () => {
		ctrl.Model.CPF = "12332145698";
		expect(ctrl.maskCPF()).toBeUndefined();
		expect(ctrl.Model.CPF).toEqual("123.321.456-98");
		expect(CPF.validate(ctrl.Model.CPF)).toBeFalsy();
	});

	it("Deverá validar a Data", () => {
		ctrl.Model.Nascimento = "35329999";
		expect(ctrl.maskData()).toBeUndefined();
		expect(ctrl.Model.Nascimento).toEqual("35/32/9999");
		expect(moment(ctrl.Model.Nascimento, "DD/MM/YYYY").isValid()).toBeFalsy();
	});

	it("Deverá validar o Telefone", () => {
		ctrl.Model.Telefone = "2123456598";
		expect(ctrl.maskTel()).toBeUndefined();
		expect(ctrl.Model.Telefone).toEqual("(21) 2345-6598");
	});
	
});