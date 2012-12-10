////////////////////////////////////////////////// global variables////////////////////////////////////////

// using allegrograph as backend
var sparql_end_point='http://agalpha.mathbiol.org/repositories/tcga_ref_emr';


//using s3db as backend
var deployment='http://204.232.200.16/uabs3db';
var username ='shukai';
var password='500068';

var project_ID='289';
var clinical_pid_colletionID='97';


// using  couchdb as backend


var lookUpTree={};
lookUpTree['disease']=new Array();
var aDisease={};
var currentWindow=this;

////////////////////////////////////////////////functions for using allegrograph as backend//////////////////
 
var escapeSpecialCharacter=function(d){
   var d_1=d.replace(/ /g,"_");
    return(d_1);
} 


var insertSparqully=function(sub,pred,obj,sparql_end_point){
       var that=this;
       var sub_url='<http://example/'+escapeSpecialCharacter(sub)+'>';
       var pred_url='<http://example/'+escapeSpecialCharacter(pred)+'>';
       var obj_url='<http://example/'+escapeSpecialCharacter(obj)+'>';
       
       var sparql_template= [ 
                           "insert data {",
                             //"\'"+sub+"\'"+" "+"\'"+pred+"\'"+" "+"\'"+obj+"\'"+" .",
                             sub_url+" "+pred_url+" "+obj_url+" .",
                             "}"
                           ];
                           
       var sparql_query=sparql_template.join(" ");
       var queryString=encodeURIComponent(sparql_query);
  
       $.post(sparql_end_point, "query="+queryString, function (data) { }).error(function() {console.log(sparql_query); });
                     
  };


 var sendPidClinicalData2Alle =function(allDiseases,lookUpTree){
        
        
         var q = async.queue(function (task, callback) {
             if(task.value!=undefined){
                 insertSparqully(task.pid,task.attr,task.value,sparql_end_point);    
             }
             
              window.setTimeout(function(){ callback();},200);   
             }, 1);
        
        
             q.drain = function() {
                console.log('all items have been processed');
             }
        
        
        
        
        for(var i=0; i<allDiseases.length;i++){
             (function(i){
                 var totLen=lookUpTree[allDiseases[i]]['clin']['url_colNames_map'].length;                   
                 var start=totLen/2;
                 for(var k=start;k<totLen;k++){
                     (function(k){
                        var subDataTypes=lookUpTree[allDiseases[i]]['clin']['url_colNames_map'][k];
                        if(subDataTypes.indexOf("bcr_sample_barcode")> -1){
                            
                            var urlIndex=k-totLen/2;
                            var currentURL=lookUpTree[allDiseases[i]]['clin']['url_colNames_map'][urlIndex];
                            
                            window.setTimeout(function(){
                                
                                
                                                                   TCGA.get(currentURL,function(error,data){
                                        //console.log(error);
                                                
                                         var cuurentTbl=splitTbl2Array(data,false);
                                         var currentColNames=cuurentTbl[0];
                                       //  console.log(currentColNames);
                                       
                                   
                                       
                                         var currentColIdx=currentColNames.indexOf("bcr_sample_barcode");
                                           //  console.log(currentColIdx);
                                              if(currentColIdx>-1){
                                                  
                                
                                                     for(var index=1;index<cuurentTbl.length;index++){
                                                         
                                                        (function(index){
                                                           for(idx=0;idx<currentColNames.length;idx++){
                                                               (function(idx){
                                                                  if(idx!=currentColIdx){
                                                       
                                                                        q.push({pid:cuurentTbl[index][currentColIdx],attr:currentColNames[idx],value:cuurentTbl[index][idx]});
                                                         
                                                         
                                                                   }          
                                                               }(idx));
                                                         
                                                               
                                                           }
                                                       
                                                             
                                                         }(index));
                                          
                                                 }
                            }
                            
                            
                        });
                                
                                
                                
                            },5000);
                 
                       }
                     }(k));
                         
                     
                 }
                 
             }(i));
        }
       
    };
    
///////////////////////////////////////////// dependency///////////////////////////////////////////////////////
var ScriptNode=document.createElement('script');
ScriptNode.setAttribute('type','text/javascript');
ScriptNode.setAttribute('src','https://raw.github.com/agrueneberg/S3DB-Connectivity/master/s3db-connectivity.js');
document.head.appendChild(ScriptNode);


var ScriptNode=document.createElement('script');
ScriptNode.setAttribute('type','text/javascript');
ScriptNode.setAttribute('src','https://raw.github.com/cshukai/tcga_ref_emr/master/DiseaseClass.js');

document.head.appendChild(ScriptNode);

var ScriptNode=document.createElement('script');
ScriptNode.setAttribute('type','text/javascript');
ScriptNode.setAttribute('src','https://raw.github.com/cshukai/tcga_ref_emr/master/async.js');
document.head.appendChild(ScriptNode);


var ScriptNode=document.createElement('script');
ScriptNode.setAttribute('type','text/javascript');
ScriptNode.setAttribute('src','https://raw.github.com/cshukai/tcga_ref_emr/master/jquery.jsonp.js');
document.head.appendChild(ScriptNode);

//////////////////////////////////////////////////////pipeline//////////////////////////////


window.setTimeout(function(){startProcess(lookUpTree);},5000); // initilization




function startProcess(lookUpTree){
    
     
   // s3dbc.setJSONP(false);
    var currentWin=this;
    getAllDiseaseTypes();
    window.setTimeout(function(){processingDiseaseType(lookUpTree,currentWin.allDiseaseTypes);},30000);
 
     
    function processingDiseaseType(lookUpTree,allDiseaseTypes){ // place all the disease types in lookUpTree
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
    window.setTimeout(function(){fillUrlsGivenDataType(allDiseaseTypes,lookUpTree);},20000);
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
    	 window.setTimeout(function(){fillSubDataTypeGivenDataType(allDiseaseTypes,lookUpTree);},30000);
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
        window.setTimeout(function(){sendPidHavingClinicalData2S3DB(allDiseaseTypes,lookUpTree);},7000);
    }
 
   
	
   	
   	function sendPidHavingClinicalData2S3DB(allDiseases,lookUpTree){
   	    
   	    for(var i=0; i<allDiseases.length;i++){
   	         (function(i){
   	             var totLen=lookUpTree[allDiseases[i]]['clin']['url_colNames_map'].length;                   
                 var start=totLen/2;
   	             for(var k=start;k<totLen;k++){
   	                 (function(k){
   	                    var subDataTypes=lookUpTree[allDiseases[i]]['clin']['url_colNames_map'][k];
                        if(subDataTypes.indexOf("bcr_sample_barcode")> -1){
                            
                            var urlIndex=k-totLen/2;
                            var currentURL=lookUpTree[allDiseases[i]]['clin']['url_colNames_map'][urlIndex];
                            TCGA.get(currentURL,function(error,data){
                                        //console.log(error);
                                                
                                         var cuurentTbl=splitTbl2Array(data,false);
                                         var currentColNames=cuurentTbl[0];
                                       //  console.log(currentColNames);
                                       
                                   
                                       
                                         var currentColIdx=currentColNames.indexOf("bcr_sample_barcode");
                                           //  console.log(currentColIdx);
                                              if(currentColIdx>-1){
                                                  
                                                for(var index=0;index<currentColNames.length;index++){
                                                    (function(index){
                                                        if(index!=currentColIdx){
                                                           window.setTimeout(function(){builS3DBdRules(currentColNames[index]);},15000);    
                                                        }
                                                             
                                                    }(index))
                                                   
                                                }  
                                                  
                                                  
                                                for(var idx=1; idx<cuurentTbl.length; idx++){
                                                    
                                                   (function(idx){
                                                             
                                                            window.setTimeout(function(){sendPIDWithClnicalInfo(cuurentTbl,idx,currentColIdx,clinical_pid_colletionID);},7000);
                                                               
                                                         }     
                                                   (idx));   
                                                  }
                                               
                                                    
                                         
                                                 }
                            });
                            
                            
                        }
   	                 }(k));
   	                     
   	                 
   	             }
   	             
   	         }(i));
   	    }
   	   
   	}
   	
   	
   	function sendPIDWithClnicalInfo(cuurentTbl,idx,currentColIdx,clinical_pid_colletionID){
   	     s3dbc.setDeployment(deployment);
   	     s3dbc.login(username, password, function (err, key) {
                                                            if (err !== null) {
                                                               console.log("Login failed.", err);
                                                            } 
                                                                    
                                                            else {
                                                                s3dbc.setKey(key);
                                                               // s3dbc.setJSONP(false);
                                                                s3dbc.setDeployment(deployment);
                                                               // console.log (cuurentTbl[idx][currentColIdx]);
                                                                s3dbc.insertItem(clinical_pid_colletionID,cuurentTbl[idx][currentColIdx], function(err, results){});
                                                              
                                                            }
                                                          });      
   	}
   	
   	
   	
   
   	
   function  builS3DBdRules(ruleObject){
       
       s3dbc.login(username, password, function (err, key) {
                                                            if (err !== null) {
                                                               console.log("Login failed.", err);
                                                            } 
                                                                    
                                                            else {
                                                                s3dbc.setKey(key);
                                                                //s3dbc.setJSONP(false);
                                                                s3dbc.setDeployment(deployment);
                                                                var prefix='<S3QL><insert>rule</insert><where>';                                                            
                                                                var suffix='</where></S3QL>';
                                                                var s3ql_buildRules=prefix+'<project_id>'+project_ID+'</project_id>'+'<subject_id>'+subject_ID+'</subject_id>'+'<verb>has</verb>'+'<object>'+ruleObject+'</object>'+suffix;
                                                               // console.log(s3ql_buildRules);
                                                                s3dbc.s3qlQuery(s3ql_buildRules , function(err,  results){
                                                                      //console.log(err);
                                                                } );
                                                              
                                                            }
                                                          });     
   }
  
   
      
}
