<?php
// Created by Stefan Etoh, 2014-02-11 
//
//
// TODO: Figure out how to represent courses that span over multiple periods
//
//
$programmes = array("TMETM", "THCIM");
$course_list_all = array();

foreach($programmes as $programme){
	$url = 'http://www.kth.se/api/kopps/v1/programme/' . $programme . '/academic-year-plan/2014:2/2';
	$xml_url = simplexml_load_file($url);
	
	//Set variable names to the different xml elements
	$mandatory = $xml_url->common->mandatory;
	$specialisation = $xml_url->specialisation;
	$conditional = $xml_url->common->conditional;	

	//if the track contains any mandatory courses	
	if(isset($mandatory)){		
		$mandatory_courses = array();
		
		//loop the mandatory courses
		foreach($mandatory->courseRound as $course){	
		
			//get initial info form the first xml-page
			$course_code = $course["courseCode"];
			$start_term=$course["startTerm"]; 
			$round_id=$course["roundId"];
			
			//create course-objects
			$course = createCourseObject("$course_code", "$start_term", "$round_id");
			array_push($mandatory_courses, $course);
			
		}
	}


	//if the track contains any specialisations
	if(isset($specialisation)){
		$specialisation_courses = array();
		
		//loop the specialisations
		foreach($specialisation as $specialisation){
			$specialisation_code = $specialisation["programmeSpecialisationCode"];
			$specialisation_list = array();
			
			//loop the courses in each specialisation
			foreach($specialisation->conditional->courseRound as $course){
				
				//get initial info form the first xml-page
				$course_code = $course["courseCode"];
				$start_term = $course["startTerm"]; 
				$round_id = $course["roundId"];
				
				//create course-objects
				$course = createCourseObject("$course_code", "$start_term", "$round_id");
				array_push($specialisation_list, $course);
								
			}
			
			//Temporary solution to print the specialisation codes nicer for the end user
			if($specialisation_code == "META"){
				$specialisation_code = "Image and Video Technology";
			}
			elseif($specialisation_code == "METB"){
				$specialisation_code = "Interactive Media Technology";
			}
			elseif($specialisation_code == "METC"){
				$specialisation_code = "Audio Technology";
			}
			elseif($specialisation_code == "METD"){
				$specialisation_code = "Printed Communication";
			}

			//create "json-object"-compatible array for the Specialisation courses 
			$specialisation_object = array("trackCode"=>"$specialisation_code","trackCourses" => $specialisation_list);
			array_push($specialisation_courses, $specialisation_object);
			
		}
	}
	
	
	//if the track contains any conditional courses
	if(isset($conditional)){
		$conditional_courses = array();
		
		//loop the conditional courses
		foreach($conditional->courseRound as $course){	
		
			//get initial info form the first xml-page
			$course_code = $course["courseCode"];
			$start_term=$course["startTerm"]; 
			$round_id=$course["roundId"];
			
			//create course-objects
			$course = createCourseObject("$course_code", "$start_term", "$round_id");
			array_push($conditional_courses, $course);
			
		}

	}
	
	
	//Full programme title not available on the XML-pages so this will do for now
	if($programme == "TMETM"){
		$programme = "Media Technology";
	}
	elseif($programme == "THCIM"){
		$programme = "Human Computer Interaction";
	}
	
	//if there's no specialisation courses we add the conditional ones to a custom made general track
	if(empty($specialisation_courses)){
		$specialisation_courses = array(array("trackCode"=>"General", "trackCourses"=>$conditional_courses));
	}

	//Create programme objects with the corresponding courses
	$programme_object = array("title"=>"$programme", "mandatory" => $mandatory_courses, "specialisation" =>$specialisation_courses);
	array_push($course_list_all, $programme_object);
}



//function that creates course-objects from the different programme- and course-pages
//that we need in order to create the json-object for each course
function createCourseObject($course_code, $start_term, $round_id){
	
	//edit the string to be able to enter the course round page
	$year=substr($start_term, 0, 4); //3 first signs: $start_term = "2014:2" 
	$term=substr($start_term, -1); //last sign

	//create a new link to get TITLE, HREF, POINTS and LEVEL
	$url_course = 'http://www.kth.se/api/kopps/v1/course/' . $course_code;
	$xml_course = simplexml_load_file($url_course);
	$course_title = $xml_course->title[1]; // 1-> english
	$course_credits = $xml_course->credits[1];
	$course_level = $xml_course->educationalLevel[1];
	$course_url = $xml_course->supplementalInformationUrl[1];

	//one last link to get the PERIOD
	$url_course_round = 'http://www.kth.se/api/kopps/v1/course/' . $course_code . '/round/' . $year . ':' . $term . '/' . $round_id;
	$xml_course_round = simplexml_load_file($url_course_round);
	$course_period = $xml_course_round->creditDistribution[0]->periodCredits[0]["period"];
	
	//create course-object
	$course = array("code" => "$course_code" , "title" => "$course_title", "credits" => "$course_credits", "level" => "$course_level", "period" => "$course_period", "url" => "$course_url");
	
	return $course;	
	
}

//json_encode the list 
echo json_encode($course_list_all);
?>