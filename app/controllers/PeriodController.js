//Created by Stefan Etoh, 2014-03-16. Johan Bäckman 2014-03-17. 
//


app.controller('PeriodController', function($scope, coursesService){
	$scope.selectedCourses = coursesService.getSelectedCourses();
	$scope.p1List = coursesService.getp1List();
	$scope.p2List = coursesService.getp2List();
	$scope.p3List = coursesService.getp3List();
	$scope.p4List = coursesService.getp4List();
	
	$scope.creditsP1 = coursesService.getCredP1();
	$scope.creditsP2 = coursesService.getCredP2();
	$scope.creditsP3 = coursesService.getCredP3();
	$scope.creditsP4 = coursesService.getCredP4();

  
	
	$scope.$on('valuesUpdated', function(){
		$scope.creditsP1 = coursesService.getCredP1();
		$scope.creditsP2 = coursesService.getCredP2();
		$scope.creditsP3 = coursesService.getCredP3();
		$scope.creditsP4 = coursesService.getCredP4();
	})
});