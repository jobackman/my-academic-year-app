//Created by Stefan Etoh, 2014-03-17
//
// TODO: 

app.controller('AlertController', function($scope, coursesService) {
	$scope.alerts = [];
	
	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};
	
	$scope.$on('alert', function() {
    	$scope.alerts.push({type: "danger", msg: "Course already added!"});
	});
});