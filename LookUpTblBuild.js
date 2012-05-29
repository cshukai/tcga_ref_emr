
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
         //result is an array where every element is a type of biomedical data
  }
  


// get all the diseases from Alleograph
 var allDiseaseTypes={};
 var allDiseases=new Array();
 getAllDiseaseTypes();
 for(var i=0; i<allDiseaseTypes.length; i++){
 	allDiseases[i]=allDiseaseTypes[i][0].toString().replace(/\"/g,"");
 	 
 } 



