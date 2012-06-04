
 var lookUpTree={};
 lookUpTree['disease']=new Array();
 
 
 var allDiseases=new Array();
 var aDisease={};
 getAllDiseaseTypes();
  	
window.setTimeout(function(){processingDiseaseType();},20000);
 
 	
 	
 	
 
 
 function processingDiseaseType(callback){
 	
 	 for(var j=0; j<allDiseaseTypes.length; j++){
 	  allDiseases[j]=allDiseaseTypes[j][0].toString().replace(/\"/g,"");
 	  lookUpTree['disease'].push (allDiseases[j]);	
 	  lookUpTree[allDiseases[j]]={};
 	  lookUpTree[allDiseases[j]]['dataType']=new Array();
 	  


 	   	  
 	 }
 	 	 	 	
 }
 
//  time interval here


  	 for(var k=0; k<allDiseases.length; k++){
  
  	   if(k==25){
  	   	  break;
  	   }
  	   var aDisease=new Disease(allDiseases[k]);
  	   aDisease.getDataTypeByDisease(lookUpTree);
  	 
  	 

 	  	  	  	
 	  	  	  	console.log(k);
 	 }
  	
//  time interval here

    
  
    
    
    function fillUrlsGivenDataType(allDiseases,lookUpTree){
    	for(var i=0; i<allDiseases.length ; i++){
    		
    		if(i==allDiseases.length){
    			break;
    		}
    		
    		var numOfDataTypes=lookUpTree[allDiseases[i]]['dataType'].length;
    		
    		for(var j=0;j<numOfDataTypes ;j++){
    			
    			
    			if(j==numOfDataTypes){
    				 break;
    			}
    			
    		    if(lookUpTree[allDiseases[i]]['dataType'][j].match(/slide_images/)){
    		    	lookUpTree[allDiseases[i]]['slide_images']={};  		    	
    		    	lookUpTree[allDiseases[i]]['slide_images']['url']=new Array();
    		    	//lookUpTree[allDiseases[i]]['slide_images']['url']['tcga_barcode']=new Array();
    		    }
    		    
    		    
    		      if(lookUpTree[allDiseases[i]]['dataType'][j].match(/clin/)){
    		    	lookUpTree[allDiseases[i]]['clin']={};
    		    	lookUpTree[allDiseases[i]]['clin']['url']=new Array();
    		    	//lookUpTree[allDiseases[i]]['clin']['subDataType']=new Array();
    		    	var aDisease=new Disease(allDiseases[i]);
    		    	aDisease.setClinUrlinTreeByDisease(lookUpTree,i,allDiseases);
    		    	//aDisease.setSubDataTypesAfterUrlInTreeByDisease(lookUpTree,i,allDiseases,'clin');
    		    	//window.setTimeout(function(){console.log(i);aDisease.setSubDataTypesAfterUrlInTreeByDisease(lookUpTree,i,allDiseases,'clin');},20000);
    		    	
    		    }	
    		    
    		    	
    		}
    	}
    }
 
 
 
 // time interval here
 
 
  function fillSubDataTypeGivenDataType(allDiseases,lookUpTree){
    	for(var i=0; i<allDiseases.length ; i++){
    		
    		if(i==allDiseases.length){
    			break;
    		}
    		
    		var numOfDataTypes=lookUpTree[allDiseases[i]]['dataType'].length;
    		
    		for(var j=0;j<numOfDataTypes ;j++){
    			
    			
    			if(j==numOfDataTypes){
    				 break;
    			}
    			
    		    if(lookUpTree[allDiseases[i]]['dataType'][j].match(/slide_images/)){
    		    	lookUpTree[allDiseases[i]]['slide_images']['url']['tcga_barcode']=new Array();
    		    }
    		    
    		    
    		      if(lookUpTree[allDiseases[i]]['dataType'][j].match(/clin/)){
    		      	console.log(i);   		    	
    		    	//lookUpTree[allDiseases[i]]['clin']['subDataType']=new Array();
    		    	var aDisease=new Disease(allDiseases[i]);
    		    	
    		    	aDisease.setSubDataTypesInTreeByDisease(lookUpTree,i,allDiseases,'clin');
    		    	//window.setTimeout(function(){console.log(i);aDisease.setSubDataTypesAfterUrlInTreeByDisease(lookUpTree,i,allDiseases,'clin');},20000);
    		    	
    		    }	
    		    
    		    	
    		}
    	}
    }
 
 


