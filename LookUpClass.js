


    // function requestDataTypeGivenDisease(idx,aDisease,lookUpTree,callback){
//    	   	 
 	  // aDisease.getDataTypeByDisease();
//  	  
   // } 

  // var requestDataType= function requestDataTypeGivenDisease(idx,aDisease,lookUpTree){
   	  // console.log('here'); 	 
 	  // aDisease.getDataTypeByDisease();
//  	  
   // }; 




// function requestDataTypeGivenDisease(k,aDisease,lookUpTree){
   	  // console.log('here'); 	 
 	  // aDisease.getDataTypeByDisease();
//  	  
   // }; 
// 
// 
// var setDataTypes=function setDataTypeGivenDisease(k,aDisease,lookUpTree){
  	 // // console.log(aDisease.diseaseName);
  	  // aDisease.dataTypes=queryResultObj2Array(aDisease.dataTypesGivenDisease_temp);
  	  // lookUpTree[allDiseases[k]]['dataType']=aDisease.dataTypes;
// };
//  




  // function setDataTypeGivenDisease(pre_run_function,idx,dataTypesGivenDisease_temp,lookUpTree){
  	 // // console.log(aDisease.diseaseName);
  	  // aDisease.dataTypes=queryResultObj2Array(dataTypesGivenDisease_temp);
  	  // lookUpTree[allDiseases[k]]['dataType']=aDisease.dataTypes;
  // }
  
  
  
    // function pauseLoop(){
    	 // window.setTimeout(function(){console.log('wait');},20000);
    // }
  
    // function resumeLoop(){
    	// continue;
    // }


  	
  	 for(var k=0; k<allDiseases.length; k++){
  
  	   if(k==25){
  	   	  break;
  	   }
  	   var aDisease=new Disease(allDiseases[k]);
  	   aDisease.getDataTypeByDisease(lookUpTree);
  	 
  	 

 	  	  	  	
 	  	  	  	console.log(k);
 	 }
  	
    
    
    function fillFieldsGivenDataType(allDiseases,lookUpTree){
    	for(var i=0; i<allDiseases.length ; i++){
    		var numOfDataTypes=lookUpTree[allDiseases[i]]['dataType'].length;
    		
    		for(var j=0;j<numOfDataTypes ;j++){
    		    if(lookUpTree[allDiseases[i]]['dataType'][j].match(/slide_images/)){
    		    	lookUpTree[allDiseases[i]]['slide_images']={};
    		    	lookUpTree[allDiseases[i]]['slide_images']['pid']=new Array();
    		    	lookUpTree[allDiseases[i]]['slide_images']['urlsOfImageFiles']=new Array();
    		    }
    		    
    		    
    		      if(lookUpTree[allDiseases[i]]['dataType'][j].match(/clin/)){
    		    	lookUpTree[allDiseases[i]]['clin']={};
    		    	lookUpTree[allDiseases[i]]['clin']['pid']=new Array();
    		    	lookUpTree[allDiseases[i]]['clin']['url']=new Array();
    		    }	
    		    
    		    	
    		}
    	}
    }
 
 


