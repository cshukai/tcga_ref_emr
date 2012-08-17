var sparql_end_point='http://agalpha.mathbiol.org/repositories/tcga_ref_emr';

 
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
      // console.log(sparql_query);
       var queryString=encodeURIComponent(sparql_query);
       //console.log(queryString);
      // var url=sparql_end_point+'?query='+queryString;
      // console.log(url);
       
       $.post(sparql_end_point, "query="+queryString, function (data) { }).error(function() {console.log(sparql_query); });
       
       // TCGA.get.sparql(url, function(error,data){
             // console.log(error);
       // });
       
                           
                           
  };


var ScriptNode=document.createElement('script');
ScriptNode.setAttribute('type','text/javascript');
ScriptNode.setAttribute('src','https://raw.github.com/agrueneberg/S3DB-Connectivity/master/s3db-connectivity.js');
document.head.appendChild(ScriptNode);


var ScriptNode=document.createElement('script');
ScriptNode.setAttribute('type','text/javascript');
ScriptNode.setAttribute('src','https://dl.dropbox.com/u/79021836/TCGA_Ref_EMR/DiseaseClass.js');
document.head.appendChild(ScriptNode);

var ScriptNode=document.createElement('script');
ScriptNode.setAttribute('type','text/javascript');
ScriptNode.setAttribute('src','https://dl.dropbox.com/u/79021836/library/caolan-async-4351b56/lib/async.js');
document.head.appendChild(ScriptNode);


var css = document.createElement('link');
css.setAttribute('rel', 'stylesheet');
css.setAttribute('href', 'https://dl.dropbox.com/u/79021836/library/bootstrap/css/bootstrap.css');
document.head.appendChild(css);





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
    
     
   s3dbc.setJSONP(false);
     
  
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
        window.setTimeout(function(){sendPidClinicalData2Alle(allDiseaseTypes,lookUpTree);},5000);
    }
 
   
   
   
   
      
  function fillBarcodeHasClinicalData(allDiseases,lookUpTree){
    
        var q=async.queue(function (task, callback) {
            
             
       
                        
                               
                          TCGA.get(task.url, function(error,data){
                                      
                                                console.log(error);
                                                
                                                lookUpTree[allDiseases[task.idx_i]]['clin']['url_barcode_map'].push(task.url);
                                                var cuurentTbl=splitTbl2Array(data,false);
                                                var currentColNames=cuurentTbl[0];
        
           
                                                for(var idx=1; idx<cuurentTbl.length; idx++){
        
                                                    if(idx==cuurentTbl.length){
                                                        break;
                                                        }
     
                                                  var tcga_barcodes=new Array();
                                                  tcga_barcodes[idx-1]=cuurentTbl[idx][currentColNames.indexOf(task.resultColname)];
                                                  lookUpTree[allDiseases[task.idx_i]]['clin']['url_barcode_map'].push(tcga_barcodes);
                                                 }
                                         window.setTimeout(function(){ callback();},5000);        
                                     
                          });

            
         
        },1);
    
    
    var queueArray=[ ];
    for(var i=0; i<allDiseases.length ; i++){
            
            if(i==allDiseases.length){
                break;
            }
            
            
            var numOfDataTypes=lookUpTree[allDiseases[i]]['dataType'].length;
            
            for(var j=0;j<numOfDataTypes ;j++){
                
                
                if(j==numOfDataTypes){
                     break;
                }
                
                if(lookUpTree[allDiseases[i]]['dataType'][j].match(/clin/)){
                  
                    var aDisease=new Disease(allDiseases[i]);
                    lookUpTree[allDiseases[i]]['clin']['url_barcode_map']=new Array();
                    
                    var totLen=lookUpTree[allDiseases[i]]['clin']['url_colNames_map'].length;                   
                    var start=totLen/2;
                    for(var k=start;k<totLen;k++){
                        
                        if(k==totLen){
                            break;
                        }
                        
                        
                        var subDataTypes=lookUpTree[allDiseases[i]]['clin']['url_colNames_map'][k];
                        if(subDataTypes.indexOf("bcr_sample_barcode")> -1){
                            
                            var urlIndex=k-totLen/2;
                            var currentURL=lookUpTree[allDiseases[i]]['clin']['url_colNames_map'][urlIndex];
                            
                             queueArray= queueArray.concat({idx_i:i,url:currentURL,resultColname:"bcr_sample_barcode"});
                        }
                        
                     
                    }
                    
                }   
                
                
            }
            
        }
        
        
          q.drain = function() { console.log('all items have been processed'); }
          
          q.push(queueArray, function (err) {
            
          });
   }

 
   	
   	
   	
   	
   	
   	
   	    function sendPidClinicalData2Alle(allDiseases,lookUpTree){
        
        
         var q = async.queue(function (task, callback) {
             if(task.value!=undefined){
                 insertSparqully(task.pid,task.attr,task.value,sparql_end_point);    
             }
             
              window.setTimeout(function(){ callback();},5000);   
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
                                                             
                                                            window.setTimeout(function(){sendPIDWithClnicalInfo(cuurentTbl,idx,currentColIdx,patient_collection_id);},7000);
                                                               
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
   	
   	
   	function sendPIDWithClnicalInfo(cuurentTbl,idx,currentColIdx,patient_collection_id){
   	     s3dbc.setDeployment(deployment);
   	     s3dbc.login(username, password, function (err, key) {
                                                            if (err !== null) {
                                                               console.log("Login failed.", err);
                                                            } 
                                                                    
                                                            else {
                                                                s3dbc.setKey(key);
                                                                s3dbc.setJSONP(false);
                                                               // console.log (cuurentTbl[idx][currentColIdx]);
                                                                s3dbc.insertItem(patient_collection_id,cuurentTbl[idx][currentColIdx], function(err, results){});
                                                              
                                                            }
                                                          });      
   	}
   	
   	
   	
   
   	
   function  builS3DBdRules(ruleObject){
       s3dbc.setDeployment(deployment);
       s3dbc.login(username, password, function (err, key) {
                                                            if (err !== null) {
                                                               console.log("Login failed.", err);
                                                            } 
                                                                    
                                                            else {
                                                                s3dbc.setKey(key);
                                                                s3dbc.setJSONP(false);
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
