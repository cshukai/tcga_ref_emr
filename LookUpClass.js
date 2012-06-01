

// conversion of data structure ___________reuseful


function  queryResultObj2Array(qr){
	//assuming query results ares at the first index of every  array element in object
	var output=new Array();
	for(var i=0; i<qr.length;i++){
		output[i]=qr[i][0].toString().replace(/\"/g,"");
	}
	return(output);
}


function splitTbl2Array(tbl,hasColName){
   allText=tbl.split("\n");
   var colNum=(allText[0].split("\t")).length;
   var rawRowNum=allText.length;
   
   var rowNum;
   var startRow;
   var i;  
   
   if(hasColName){
   	   rowNum=rawRowNum-1;
   	   startRow=1;
   }
   
   else{
   	   rowNum=rawRowNum;
   	   startRow=0;
   }  
   
   
   var tabularData=new Array(rowNum);
   for(i=startRow;i<allText.length;i++){
   	    var tblRowIdx;
   	    if(hasColName){
   	    	tblRowIdx=i-1;
   	    }
   	    else{
   	    	tblRowIdx=i;
   	    }
   	    
   	    tabularData[tblRowIdx]=new Array(colNum);   	 
   	    var thisLine=allText[i].split("\t");
   	    for(j=0;j<colNum;j++){
   	    	tabularData[tblRowIdx][j]=thisLine[j];
   	    	//console.log(tabularData[i,j]);
   	    }
   	     
   }
   return(tabularData);    	
}




//functions for building look-up  tree
  function getAllDiseaseTypes(){
  	  var sparql_template= [ "prefix tcga:<http://purl.org/tcga/core#>",
                        "prefix rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>",
                        "prefix rdfs:<http://www.w3.org/2000/01/rdf-schema#>",
                        "prefix owl:<http://www.w3.org/2002//07/owl#>",                       
                        "prefix dc:<http://purl.org/dc/ele07/owl#>",
                        "prefix dc:<http://purl.org/dc/elements/1.1/>",
                        "prefix dcterms:<http://purl.org/dc/terms/>",
                        "prefix foaf:<http://xmlns.com/foaf/0.1/>",
                        "prefix fti:<http://franz.com/ns/allegrograph/2.2/textindex/>",
                        "prefix skos:<http://www.w3.org/2004/02/skos/core#>",
                           "select  distinct ?diseaseType where { ",
                           "?file tcga:disease-study ?diseases .",
                           "?diseases rdfs:label ?diseaseType.",
                           "}"
                           ];
                           
        var sparql_query=sparql_template.join(" ");                       // note :this refers to the windows
        TCGA.hub.query(sparql_query,function(error,data){console.log(error);allDiseaseTypes=data;});
      
  }
  


// processing
var dfd = $.Deferred();
 var lookUpTree={};
 lookUpTree['disease']=new Array();
 
 
 var allDiseases=new Array();
 var aDisease={};
 getAllDiseaseTypes();
// window.setTimeout(function(){processingDiseaseType(processDataTypes(allDiseases,lookUpTree));},20000);
 
window.setTimeout(function(){processingDiseaseType();},20000);
 
 	
 	
 	
 
 
 function processingDiseaseType(callback){
 	
 	 for(var j=0; j<allDiseaseTypes.length; j++){
 	  allDiseases[j]=allDiseaseTypes[j][0].toString().replace(/\"/g,"");
 	  lookUpTree['disease'].push (allDiseases[j]);	
 	  lookUpTree[allDiseases[j]]={};
 	  lookUpTree[allDiseases[j]]['dataType']=new Array();
 	  


 	   	  
 	 }
 	 	 	 	
 }
 


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
  
  
  
    function pauseLoop(){
    	 window.setTimeout(function(){console.log('wait');},20000);
    }
  
    // function resumeLoop(){
    	// continue;
    // }


  	
  	 for(var k=0; k<allDiseases.length; k++){
  
  	   if(k==25){
  	   	  break;
  	   }
  	   var aDisease=new Disease(allDiseases[k]);
  	   dfd.done(aDisease.getDataTypeByDisease(lookUpTree), pauseLoop());
 	  //requestDataTypeGivenDisease(k,aDisease,lookUpTree,setDataTypeGivenDisease(k,aDisease,lookUpTree));
 	  	  	  	//setDataTypeGivenDisease(requestDataType,k,aDisease.dataTypesGivenDisease_temp,lookUpTree);
 	   //requestDataTypeGivenDisease(k,aDisease,lookUpTree);
 	  	  	  	
 	  	  	  	
 	  	  	  	console.log(k);
 	 }
  	
  
 
 
 


