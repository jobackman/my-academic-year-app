//Created by Stefan Etoh, 2014-03-16
//
//TODO: 
//

app.controller('CoursesController', function($scope, coursesService){		
		
	
	$scope.selectedMaster = coursesService.getSelectedMaster();
	$scope.selectedTrack = coursesService.getSelectedTrack();


	//Get the masters via the service (By Stefan)
	$scope.masters = coursesService.getMasters();


    // Calle and Anna 2014-03-13
    // Saves the correct index of the chosen master and track from the JSON object
    $scope.index = $scope.masters.map(function(d) { return d['title']; }).indexOf($scope.selectedMaster.title);
    $scope.trackIndex = $scope.masters[$scope.index].specialisation.map(function(d) {return d['trackCode']; }).indexOf($scope.selectedTrack.trackCode);
    	

	// $watch is a kind of listener. When selectedMaster is updated the inner code runs. Therefore $scope.index and $scope.trackIndex updates when selectedMaster updates.
	$scope.$watch('selectedMaster', function(){
	        $scope.index = $scope.masters.map(function(d) { return d['title']; }).indexOf($scope.selectedMaster.title);
	        $scope.selectedTrack = $scope.masters[$scope.index].specialisation[0]; //Set the init value to the first element in the list. 
	        $scope.trackIndex = $scope.masters[$scope.index].specialisation.map(function(d) {return d['trackCode']; }).indexOf($scope.selectedTrack.trackCode); 
	});	
	
	// $watch is a kind of listener. When selectedTrack is updated the inner code runs. Therefore $scope.index, $scope.trackIndex, $scope.listMandatory and $scope.listTracks updates when selectedTrack updates.
	$scope.$watch('selectedTrack', function(){
	        $scope.index = $scope.masters.map(function(d) { return d['title']; }).indexOf($scope.selectedMaster.title);
	        $scope.trackIndex = $scope.masters[$scope.index].specialisation.map(function(d) {return d['trackCode']; }).indexOf($scope.selectedTrack.trackCode);
		    $scope.listMandatory = $scope.masters[$scope.index].mandatory;
		    $scope.listTracks = $scope.selectedTrack.trackCourses;
	});

	//List with mandatory courses for the chosen master
	$scope.listMandatory = $scope.masters[$scope.index].mandatory; 
	//List with the electable courses for the chosen master
	$scope.listTracks = $scope.selectedTrack.trackCourses;
					
	//Calls the add funciton in courseServices (the model)	
	$scope.addCourse = function(course) {
		coursesService.add(course);
    }			
});