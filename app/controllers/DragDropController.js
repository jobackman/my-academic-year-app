app.controller('DragDropController', function($scope, coursesService){
	
	//Init 
	$scope.currentCourse;
	
	//Calls the function remove in courseServices (the model)
	$scope.removeCourse = function(course) {
		coursesService.remove(course);	
	} 
	
	//Init 
	$scope.currentPeriod = 0;
	
	//If the dragged course contains period: 1, accept the drop in this div.
	$scope.acceptP1 = {
		activeClass: "ui-state-highlight",
    	accept: function(dragEl) {
		    if ($scope.currentPeriod==1) {
			    return true;
			}
		}
    }
    
    //If the dragged course contains period: 2, accept the drop in this div.
    $scope.acceptP2 = {
   	 	activeClass: "ui-state-highlight",
    	accept: function(dragEl) {
	    	if ($scope.currentPeriod==2) {
		    	return true;
		    }
		}
    }
    
    //If the dragged course contains period: 3, accept the drop in this div.
    $scope.acceptP3 = {
    	activeClass: "ui-state-highlight",
    	accept: function(dragEl) {
	    	if ($scope.currentPeriod==3) {
		    	return true;
		    }
		}
    }		
    
    //If the dragged course contains period: 4, accept the drop in this div.
    $scope.acceptP4 = {
    	activeClass: "ui-state-highlight",
    	accept: function(dragEl) {
	    	if ($scope.currentPeriod==4) {
		    	return true;
		    }
        }
    }	
    
    //Selects the current period and the current course being dragged at the moment
	$scope.startCallback = function(event, ui){
		$scope.currentPeriod = $(this)[0].course.period;
		$scope.currentCourse = $(this)[0].course;
	}
	
	
	//Johan Bäckman 2013-03-18
	//drop is called from the different period divs in the mainView 
	$scope.drop = function(event, ui){
		coursesService.add($scope.currentCourse);						
	} 
	
});