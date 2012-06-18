
var ScriptNode=document.createElement('script');
ScriptNode.setAttribute('type','text/javascript');
ScriptNode.setAttribute('src','https://dl.dropbox.com/u/79021836/TCGA_Ref_EMR/DiseaseClass.js');
document.head.appendChild(ScriptNode);

var ScriptNode=document.createElement('script');
ScriptNode.setAttribute('type','text/javascript');
ScriptNode.setAttribute('src','https://dl.dropbox.com/u/79021836/library/caolan-async-4351b56/lib/async.js');
document.head.appendChild(ScriptNode);


var lookUpTree={};
lookUpTree['disease']=new Array();
 
 
 var aDisease={};

 var currentWindow=this;
 var extTree={};





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
 * 
 * pipeline
 * 
 */


window.setTimeout(function(){startProcess(lookUpTree);},5000);




function startProcess(lookUpTree){

    var currentWin=this;
 
    getAllDiseaseTypes();
    window.setTimeout(function(){processingDiseaseType(lookUpTree,currentWin.allDiseaseTypes);},20000);
 
 
 
    function processingDiseaseType(lookUpTree,allDiseaseTypes){
 	  console.log(allDiseaseTypes.length);
 	  for(var j=0; j<allDiseaseTypes.length; j++){
      
 	  lookUpTree['disease'].push (allDiseaseTypes[j]);	
 	  lookUpTree[allDiseaseTypes[j]]={};
 	  lookUpTree[allDiseaseTypes[j]]['dataType']=new Array();
 	  
     	  
 	  
 	   	  
 	 }    
 	  feedDataType2BackEndTree(lookUpTree,allDiseaseTypes);
   }
 	 	 	 	
 
    
   function feedDataType2BackEndTree(lookUpTree,allDiseaseTypes){
     	
      
  	 for(var k=0; k<allDiseaseTypes.length; k++){
        
  	   if(k==25){
  	   	  break;
  	   }
  	   
  	   
  	   var aDisease=new Disease(allDiseaseTypes[k]);	
  	   var disName=aDisease.diseaseName;
  	 
  	   
  	   aDisease.getDataTypeByDisease(lookUpTree);

    }
    window.setTimeout(function(){fillUrlsGivenDataType(allDiseaseTypes,lookUpTree);},10000);
  }
 
  function fillUrlsGivenDataType(allDiseaseTypes,lookUpTree){
    	for(var i=0; i<allDiseaseTypes.length ; i++){
    		
    		if(i==allDiseaseTypes.length){
    			break;
    		}
    		
    		var numOfDataTypes=lookUpTree[allDiseaseTypes[i]]['dataType'].length;
    		
    		for(var j=0;j<numOfDataTypes ;j++){
    			
    			
    			if(j==numOfDataTypes){
    				 break;
    			}
    			
    		    if(lookUpTree[allDiseaseTypes[i]]['dataType'][j].match(/slide_images/)){
    		    	lookUpTree[allDiseaseTypes[i]]['slide_images']={};  		    	
    		    	lookUpTree[allDiseaseTypes[i]]['slide_images']['url']=new Array();
    		    	
    		    }
    		    
    		    
    		      if(lookUpTree[allDiseaseTypes[i]]['dataType'][j].match(/clin/)){
    		    	lookUpTree[allDiseaseTypes[i]]['clin']={};
    		    	lookUpTree[allDiseaseTypes[i]]['clin']['url']=new Array();
    		    	
    		    	var aDisease=new Disease(allDiseaseTypes[i]);
    		    	aDisease.setClinUrlinTreeByDisease(lookUpTree,i,allDiseaseTypes);
    		    
    		    	
    		    }	
    		    
    		    	
    		}
    	}    	
    	 window.setTimeout(function(){fillSubDataTypeGivenDataType(allDiseaseTypes,lookUpTree);},10000);
    }
    
    
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
    		     
    		    	var aDisease=new Disease(allDiseases[i]);
    		    	
    		    	aDisease.setSubDataTypesInTreeByDisease(lookUpTree,i,allDiseases,'clin');
    		    	
    		    }	
    		    
    		    	
    		}
    	}
        window.setTimeout(function(){fillBarcodeGivenDataType(allDiseaseTypes,lookUpTree);},10000);
    }
 
 
 
 
 
 
   function fillBarcodeGivenDataType(allDiseases,lookUpTree){
   	
   	var q_1= async.queue(function (task_1, callback) {   
    		         	                               var numOfDataTypes=lookUpTree[allDiseases[task_1.serialNo]]['dataType'].length;
    		         	            
    		         	                               var q_3=async.queue(function (task_3, callback) {
    		         	                               	          // console.log(task_1.serialNo);
    		         	                               	          // console.log(task_3.serialNo);
    		         	                               	            
    		         	                               	            if(lookUpTree[allDiseases[task_1.serialNo]]['dataType'][task_3.serialNo].match(/clin/)){
    		                                                           
    		                                                          var aDisease=new Disease(allDiseases[task_1.serialNo]);
    		                                                          var totLen=lookUpTree[allDiseases[task_1.serialNo]]['clin']['url_colNames_map'].length;
    		                                                          var start=totLen/2;
    		    
    		                                             
    		                                                         var q_2 = async.queue(function (task_2, callback) {     		         	  		         	                                
   		         	                                                  	//console.log('here');	         	                                          
                                                                     var subDataTypes=lookUpTree[allDiseases[task_1.serialNo]]['clin']['url_colNames_map'][task_2.serialNo];
                                                                      console.log(task_1.serialNo);
    		         	                               	           console.log(task_2.serialNo);
                                                                     console.log(subDataTypes.length);
                                                                     
    		    		                                            if(subDataTypes.indexOf("bcr_sample_barcode")> -1 ){
    		    		                                            	//console.log('here');
                                                                   	var urlIndex=k-totLen/2;
    		    		                                         	var currentURL=lookUpTree[allDiseases[task_1.serialNo]]['clin']['url_colNames_map'][urlIndex];
    		    	                                           	    aDisease.fetchOneColInFile(lookUpTree,task_1.serialNo,task_3.serialNo,task_2.serialNo,allDiseases,'clin',currentURL,'bcr_sample_barcode','url_barcode_map');
                                                                    }
                                                                    
                                                                    
                                                                    if(subDataTypes.indexOf("bcr_patient_barcode")> -1 ){
    		    		                                            	console.log('here');
                                                                   	var urlIndex=k-totLen/2;
    		    		                                         	var currentURL=lookUpTree[allDiseases[task_1.serialNo]]['clin']['url_colNames_map'][urlIndex];
    		    	                                           	    aDisease.fetchOneColInFile(lookUpTree,task_1.serialNo,task_3.serialNo,task_2.serialNo,allDiseases,'clin',currentURL,'bcr_patient_barcode','url_barcode_map');
                                                                    }
                                                                    
                                                                    
                                                                    
                                                               }, 1); 
                                                               
                                                            for(var k=start;k<totLen;k++){
    		    		
    		    	        	                                       if(k==totLen){
    		    	 		                                             break;
    		    		                                               }
    		    		                                             //  console.log(k);
                                                                       q_2.push([{serialNo:k}], function (err) {
                                                                     
                                                                       });       		    		   		    		
    		    	                                        }  	     
                                                                 
                                                          }  	
    		         	                               	 
    		         	                               	 
    		         	                               	   
    		         	                               	 
    		         	                               	 
    		         	                               	 
    		         	                               	 },7);
    		         	                               	 
    		         	                               	 
    		         	                               
    		         	                               	 
    		         	                               	 
    		         	                               	 
    		         	                               	 
    		         	                               	 
    
    		         	                                for(var j=0;j<numOfDataTypes ;j++){
    			
    			                                          
    			                                          if(j==numOfDataTypes){
    		                                                 break;
    		                                              }
    		                                             // console.log(j);
    		                                              q_3.push([{serialNo:j}], function (err) {
                                                              
                                                            }
                                                          );       
    		                                              
    			                                                                        
    		                                  
    		    	                                    }
    		    	                                    
    		    	                           
    		    	                                   
    		    	
		    	
    		    	
    		   	
    			
    			
    		},1);  
                                                                
                                                                
                                                                
                                                                
	     for(var i=0; i<allDiseases.length ; i++){
    		
      		if(i==allDiseases.length){
    			break;
    			
    		}
    		
    		q_1.push([{serialNo:i}], function (err) {
                                                                  //console.log(err);
                                                     }
                     );       
    		
    		
    
    		
    	}
   
  
  }  
    
}

