/*
Calle and Anna 2014-03-10:
*/

/* ------------Controller for weclomeView ------------*/
app.controller('WelcomeController', function($scope, $http, coursesService) {

	//Get the masters via the service (By Stefan, 2014-03-16)
	$scope.masters = coursesService.getMasters();
    
    
    // Calle and Anna 2014-03-13
    // INIT the variables
    $scope.selectedMaster = $scope.masters[0];
	$scope.selectedTrack = $scope.masters[0].specialisation[0];
    
    // Saves the correct index of the chosen master and track from the JSON object
    $scope.index = $scope.masters.map(function(d) { return d['title']; }).indexOf($scope.selectedMaster.title);
	$scope.trackIndex = $scope.masters[$scope.index].specialisation.map(function(d) {return d['trackCode']; }).indexOf($scope.selectedTrack.trackCode);
	//console.log("index innan watch " + $scope.index + "trackindex innan watch: " + $scope.trackIndex);
	
	 // $watch is a kind of listener. When selectedMaster is updated the inner code runs. Therefore $scope.index and $scope.trackIndex updates when selectedMaster updates.
	$scope.$watch('selectedMaster', function(){
			
	        $scope.index = $scope.masters.map(function(d) { return d['title']; }).indexOf($scope.selectedMaster.title);
	        $scope.selectedTrack = $scope.masters[$scope.index].specialisation[0]; //Set the init value to the first element in the list. 
	        $scope.trackIndex = $scope.masters[$scope.index].specialisation.map(function(d) {return d['trackCode']; }).indexOf($scope.selectedTrack.trackCode);


	        //console.log("index " + $scope.index + "trackindex: " + $scope.trackIndex + " $scope.selectedTrack.trackCode: " + $scope.selectedTrack.trackCode);
	    
	});	
	
	 // $watch is a kind of listener. When selectedTrack is updated the inner code runs. Therefore $scope.index and $scope.trackIndex updates when selectedTrack updates.
	$scope.$watch('selectedTrack', function(){
	        $scope.index = $scope.masters.map(function(d) { return d['title']; }).indexOf($scope.selectedMaster.title);
	        $scope.trackIndex = $scope.masters[$scope.index].specialisation.map(function(d) {return d['trackCode']; }).indexOf($scope.selectedTrack.trackCode);
		
	});

	$scope.setMaster = function(selectedMaster) {
		coursesService.setSelectedMaster(selectedMaster);
    }		
    
    $scope.setTrack = function(selectedTrack){
	    coursesService.setSelectedTrack(selectedTrack);
    }	


});
