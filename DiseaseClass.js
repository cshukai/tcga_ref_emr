

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
    
    
Disease.prototype.getPatientsInBcrImages=function(){
	      
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
                                                                              // note :this refers to the windows        
        TCGA.hub.query(sparql_query,function(error,data){console.log(error); this.patientsOfImageData=data;});
        
        //result is an array where every element is a type of biomedical data
      
    };
    
    
  Disease.prototype.getUrlsOfClinicalDataSets=function(){
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
                                                                              // note :this refers to the windows        
        TCGA.hub.query(sparql_query,function(error,data){console.log(error); this.urlsOfClinicalDataSets=data;});
        
        //result is an array where every element is a type of biomedical data
  };
  
  
   
 
   Disease.prototype.getDataTypeByDisease=function(){
   	
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
        TCGA.hub.query(sparql_query,function(error,data){console.log(error);dataTypesGivenDisease_temp=data;});
         window.setTimeout("dataTypesGivenDisease=queryResultObj2Array(dataTypesGivenDisease_temp)",15000); 
        
        
        
                 
         
       }
  
 
  
   //Disease.prototype.getUrlOfClinicalDataSets=
  
    

