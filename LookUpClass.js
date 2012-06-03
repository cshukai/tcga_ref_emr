
  	
  	 for(var k=0; k<allDiseases.length; k++){
  
  	   if(k==25){
  	   	  break;
  	   }
  	   var aDisease=new Disease(allDiseases[k]);
  	   aDisease.getDataTypeByDisease(lookUpTree);
  	 
  	 

 	  	  	  	
 	  	  	  	console.log(k);
 	 }
  	
    
    function fillClinFields(lookUpTree,aDisease){
    	
    }
    
    
    function fillFieldsGivenDataType(allDiseases,lookUpTree){
    	for(var i=0; i<allDiseases.length ; i++){
    		var numOfDataTypes=lookUpTree[allDiseases[i]]['dataType'].length;
    		
    		for(var j=0;j<numOfDataTypes ;j++){
    		    if(lookUpTree[allDiseases[i]]['dataType'][j].match(/slide_images/)){
    		    	lookUpTree[allDiseases[i]]['slide_images']={};  		    	
    		    	lookUpTree[allDiseases[i]]['slide_images']['url']=new Array();
    		    	lookUpTree[allDiseases[i]]['slide_images']['url']['tcga_barcode']=new Array();
    		    }
    		    
    		    
    		      if(lookUpTree[allDiseases[i]]['dataType'][j].match(/clin/)){
    		    	lookUpTree[allDiseases[i]]['clin']={};
    		    	lookUpTree[allDiseases[i]]['clin']['url']=new Array();
    		    	
    		    }	
    		    
    		    	
    		}
    	}
    }
 
 


