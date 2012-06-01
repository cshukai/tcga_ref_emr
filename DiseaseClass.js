
/*
 * conversion of data structure ___________reuseful 
 */


function  queryResultObj2Array(qr,targetIdx){
	//assuming query results ares at the targetIdx of every  array element in object
	var output=new Array();
	for(var i=0; i<qr.length;i++){
		output[i]=qr[i][targetIdx].toString().replace(/\"/g,"");
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









//Management of TCGA barcode





function barcode2elements(barcode,dataType){
	     var barcodeElement={};
         
         var tempArray=barcode.split('-');
         tempArray.shift();
         
         if(dataType==="slide_images"){
         	tempArray.pop();
         	//console.log(tempArray.length);
         	barcodeElement={
         		tissue_source_site:tempArray[0],
         		participant:tempArray[1],
         		sampleType:tempArray[2].match(/\d+/),
         		vial:tempArray[2].match(/[A-Z]/),
         		portion:tempArray[3].match(/\d+/),
         		analyte:tempArray[3].match(/[A-Z]/)
         		
         	};
         }
         
         
         return  barcodeElement;
    }






// constructor of disease class
var  Disease=function(diseaseName){
       this.diseaseName=diseaseName;
       this.dataTypes=new Array();
       
    };
    
    
Disease.prototype.getPatientsInBcrImages=function(lookUpTree){
	      var that=this;
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
                           "select distinct ?dataType ?name ?url where { ",
                           "?file tcga:url ?url .",
                           "?file rdfs:label ?name .",
                           "filter ( contains(?name, "+"\'"+".svs"+"\'"+") ) .",
                           "?file tcga:data-type ?d.",
                           "?d rdfs:label ?dataType.",
                           "?file tcga:disease-study ?ds . ",
                           "?ds rdfs:label "+"\'"+this.diseaseName+"\'"+"."+"}"
                           ];
                           
        var sparql_query=sparql_template.join(" ");
                                                                              
        TCGA.hub.query(sparql_query,function(error,data){console.log(error); that.patientsOfImageData=queryResultObj2Array(data,1);that.urls4PatientsOfImageData=queryResultObj2Array(data,2)});
        
        //result is an array where every element is a type of biomedical data
      
    };
    
    
  Disease.prototype.getUrlsOfClinicalDataSets=function(){
  	  var that=this;
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
                           "select distinct ?url where { ",
                           "?file tcga:url ?url .",                         
                           "filter ( contains(?url, "+"\'"+this.diseaseName+"\'"+") ) .",
                           "filter ( contains(?url, "+"\'"+"clin"+"\'"+") ) .",
                           "filter ( contains(?url, "+"\'"+".txt"+"\'"+") ) .",
                           "filter ( contains(?url, "+"\'"+"public"+"\'"+") ) .",        
                           "}"
                           ];
                           
        var sparql_query=sparql_template.join(" ");
                                                                                
        TCGA.hub.query(sparql_query,function(error,data){console.log(error);that.urlsOfClinicalDataSets=data;});
        
        //result is an array where every element is a type of biomedical data
  };
  
  
   
 
   Disease.prototype.getDataTypeByDisease=function(lookUpTree){
   	var that=this;
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
                           "select distinct ?type where { ",
                           "?file tcga:data-type ?t . ",
                           "?t rdfs:label ?type . ",
                           "?file tcga:disease-study ?d . ",
                           "?d rdfs:label "+"\'"+this.diseaseName+"\'"+"."+"}"
                           ];
                           
        var sparql_query=sparql_template.join(" ");                       // note :this refers to the windows
        TCGA.hub.query(sparql_query,function(error,data){console.log(error);that.dataTypes= queryResultObj2Array(data,0);lookUpTree[that.diseaseName]['dataType']=that.dataTypes;});
   
        
        
                 
         
       }
  
  
  


  
  


//static functions for building look-up  tree
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
 

