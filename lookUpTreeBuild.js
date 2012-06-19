
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
        window.setTimeout(function(){fillBarcodeHasClinicalData(allDiseaseTypes,lookUpTree);},20000);
    }
 
 
 
 
 
 
   function fillBarcodeHasClinicalData(allDiseases,lookUpTree){
   	
   	
   	
   	var q=async.queue(function (task, callback) {
   		             // console.log(task.i_idx);
   		             //  console.log(task.k_idx);
   		   		       var subDataTypes=lookUpTree[allDiseases[task.i_idx]]['clin']['url_colNames_map'][task.k_idx];
   		   		     //  console.log(subDataTypes);
    		    		if(subDataTypes.indexOf("bcr_sample_barcode")> -1){
    		    			console.log('here');
    		    			var urlIndex=task.k_idx-totLen/2;
    		    			var currentURL=lookUpTree[allDiseases[task.i_idx]]['clin']['url_colNames_map'][urlIndex];
    		    		    aDisease.fetchOneColInFile(lookUpTree,task.i_idx,allDiseases,'clin',currentURL,'bcr_sample_barcode','url_barcode_map');
    		    		}
    		    		
    		    		
    		    		if(subDataTypes.indexOf("bcr_patient_barcod")> -1){
    		    			console.log('here');
    		    			var urlIndex=task.k_idx-totLen/2;
    		    			var currentURL=lookUpTree[allDiseases[task.i_idx]]['clin']['url_colNames_map'][urlIndex];
    		    		    aDisease.fetchOneColInFile(lookUpTree,task.i_idx,allDiseases,'clin',currentURL,'bcr_patient_barcod','url_barcode_map');
    		    		}
   	},1);
   	  // var that=this;
   	   var serialNumArray=[ ];
   	   for(var i=0; i<allDiseases.length ; i++){
    		
      		if(i==allDiseases.length){
    			break;
    			}
    		    var numOfDataTypes=lookUpTree[allDiseases[i]]['dataType'].length;	
    		    
    		    
    		    for(var j=0;j<numOfDataTypes ;j++){
    		    	if(j==numOfDataTypes){
    				 break;   				 
    		     	}
    		     	
    		     	var clinicalSerialNo=[];
    		     	if(lookUpTree[allDiseases[i]]['dataType'][j].match(/clin/)){
    		     		var aDisease=new Disease(allDiseases[i]);
    		         	var totLen=lookUpTree[allDiseases[i]]['clin']['url_colNames_map'].length;
    		        	var start=totLen/2;
    		        	
    		        	for(var k=start;k<totLen;k++){
    		    		
    		    		  if(k==totLen){
    		    			break;
     	    			
    		    		   }
    		    		  // console.log(i);
    		    		    // console.log(j);
    		    		    // console.log(k);
    		    		    // console.log('----');
    		    		    
    		    		   // console.log(idx);
    		    		   // console.log(k-start);
    		    		   
    		    			clinicalSerialNo[k-start]={i_idx:i,k_idx:k};
    		    			
    		    		}
    	
    		    		 	serialNumArray=serialNumArray.concat(clinicalSerialNo);
    		    		
    		    		
    		     	}
    		     	
    		    }
    		    
    		}
    		
    	 // console.log(serialNumArray);	
 		  q.push(serialNumArray, function (err) {});
    		
    		
    	}
    		
           
   	
   	
   	
   	
   	
   	
   	
   	
   	
   	
   	
   	
   	
   	
   	
   	
   
  
   
    
}
