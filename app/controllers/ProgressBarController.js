//Created by Stefan Etoh, 2014-03-16

app.controller('ProgressBarController', function($scope, coursesService){
	//max value for the progressbar
	$scope.max = 60;
	
	$scope.totalCredits = coursesService.getTotalCredits();
	
	//When the model broadcasts a change, the totalCredits will update
	$scope.$on('valuesUpdated', function() {
    	$scope.totalCredits = coursesService.getTotalCredits();
	});
});