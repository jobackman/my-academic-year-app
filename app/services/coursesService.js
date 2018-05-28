//Created by Stefan Etoh 2014-03-16. Johan Bäckman 2014-03-17.
//
//TODO: add to correct list (p1List...
//
//

app.service('coursesService', function($rootScope){	
    var selectedCourses = [];
    var totalCredits = 0;   
    var advancedCredits = 0;
    var currentCourse;

    var creditsP1 = 0;
    var creditsP2 = 0;
    var creditsP3 = 0;
    var creditsP4 = 0;
    
    var p1List = [];
	var p2List = [];
	var p3List = [];
	var p4List = [];
	
	var selectedMaster="";
	var selectedTrack="";
    
    //return json object from the getMasters.php file
	this.getMasters = function(){
		var url = "app/scripts/getMasters.php";
		
	    $.ajax({
	        type: 'GET',
	        url: url,
	        dataType: 'json',
	        async: false,
	        success: function (data) {
	            masters = data;
	        },
	        error: function(e){
	            console.log(e.message);
	        }
	    });		
	    
	    return masters;	
	}
	
 	this.setSelectedMaster = function (master){
	 	selectedMaster = master;
 	}
 	
 	this.setSelectedTrack = function (track){
	 	selectedTrack = track;
 	}
 	
 	//add courses to corresponding list above
    this.add = function (course) {
    	var courseAdded = this.checkIfCourseAdded(course);
    	var period = course.period;
    	
    	if(courseAdded){
	    	console.log("Course already added...");   			
			$rootScope.$broadcast("alert");
    	}
    	else{
    		var courseCredits = parseFloat(course.credits);
			totalCredits += courseCredits;
			
	    	if(course.level == "Second cycle"){
	    		advancedCredits += courseCredits;
			}
			
			if(period == "1"){
	    		creditsP1 += courseCredits;
	    		p1List.push(course);
	    		console.log("lägg till "+ course.title+ " -->p1list, index: " + p1List.indexOf(course));
			}
			else if(period == "2"){
				creditsP2 += courseCredits;	  
				p2List.push(course);  	
				console.log("lägg till "+ course.title+ " -->p2list, index: " + p2List.indexOf(course));
			}
			else if (period == "3"){
	    		creditsP3 += courseCredits;
	    		p3List.push(course);
				console.log("lägg till "+ course.title+ " -->p3list, index: " + p3List.indexOf(course));
			}
			else if(period =="4"){
	    		creditsP4 += courseCredits;
	    		p4List.push(course);
				console.log("lägg till "+ course.title+ " -->p4list, index: " + p4List.indexOf(course));

			}
			else{
	    		console.log("Lade aldrig till credits från period " + period);
			}
			
		   	
			selectedCourses.push(course);
		
			//everytime something in the model changes we will broadcast it to our controllers
			$rootScope.$broadcast("valuesUpdated");
    	}
	}
	
	//if course is added it shouldn't be added again
	this.checkIfCourseAdded = function (course){
		var courseAdded = false;
		
		for(var i=0; i<selectedCourses.length; i++){
			if(selectedCourses[i] == course){
				courseAdded = true;
			}
		}
		return courseAdded;
		courseAdded = false;
	}

	//removes courses
    this.remove = function (course) {   

    	var courseCredits = parseFloat(course.credits);
    	var period = course.period;
    	
    	totalCredits -= courseCredits;
		
		if(course.level == "Second cycle"){
	    	advancedCredits -= courseCredits;
    	}
    	
    				
    	//determine position of course in array and remove it
        var index = selectedCourses.indexOf(course);
        selectedCourses.splice(index,1);			
    				
		if(period == "1"){
    		creditsP1 -= courseCredits;
    		var pIndex = p1List.indexOf(course);
			console.log("tar bort "+ course.title+ " <--p1list, index: " + pIndex);
    		p1List.splice(pIndex,1);
		}
		else if(period == "2"){
			creditsP2 -= courseCredits;	  
			var pIndex = p2List.indexOf(course);
			console.log("tar bort "+ course.title+ " <--p2list, index: " + pIndex);    		
			p2List.splice(pIndex,1);  	
		}
		else if (period == "3"){
    		creditsP3 -= courseCredits;
    		var pIndex = p3List.indexOf(course);
			console.log("tar bort "+ course.title+ " <--p3list, index: " + pIndex);	
			p3List.splice(pIndex,1);
		}
		else if(period =="4"){
    		creditsP4 -= courseCredits;
    		var pIndex = p4List.indexOf(course);
			console.log("tar bort "+ course.title+ " <--p4list, index: " + pIndex);
    		p4List.splice(pIndex,1);
		}
		else{
    		console.log("Lade aldrig till credits från period " + period);
		}
        
		//everytime something in the model changes we will broadcast it to our controllers
		$rootScope.$broadcast("valuesUpdated");        
    }	
	

	//GET-methods below
	this.getTotalCredits = function(){
        return totalCredits;
    }
    
    
    this.getSelectedCourses = function(){
        return selectedCourses;
    }       
    
    
    this.getAdvancedCredits = function(){
	    return advancedCredits;
    }
    
    this.getSelectedMaster = function(){
	    return selectedMaster;
    }
    
    this.getSelectedTrack = function(){
	    return selectedTrack;
    }
    
    this.getCredP1 = function(){
	    return creditsP1;
    }
    
    this.getCredP2 = function(){
	    return creditsP2;
    }
    
    this.getCredP3 = function(){
	    return creditsP3;
    }
    
    this.getCredP4 = function(){
	    return creditsP4;
    }
    
    this.getp1List = function(){
	    return p1List;
    }
    
    this.getp2List = function(){
	    return p2List;
    }
    
    this.getp3List = function(){
		return p3List;
    }
    
    this.getp4List = function(){
	    return p4List;
    }
    
    
    
});