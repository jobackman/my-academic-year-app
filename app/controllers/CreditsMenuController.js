//Created by Stefan Etoh, 2014-03-16
//
//TODO: 
//

app.controller('CreditsMenuController', function($scope, coursesService){

	//inital values from the model i.e. 0
	$scope.totalCredits = coursesService.getTotalCredits();
	$scope.advancedCredits = coursesService.getAdvancedCredits();

	//When the model broadcasts a change, the advanced- and totalCredits will update
	$scope.$on('valuesUpdated', function() {
    	$scope.totalCredits = coursesService.getTotalCredits();
    	$scope.advancedCredits = coursesService.getAdvancedCredits();
	});
});
