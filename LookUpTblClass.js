
// SPARQL queries for finding relationships between pid and data-type 
function getDataTypeByDisease(cancerType){
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
                           "?d rdfs:label "+"\'"+cancerType+"\'"+"."+"}"
                           ];
                           
        var sparql_query=sparql_template.join(" ");
        var result={};
        TCGA.hub.query(sparql_query,function(error,data){console.log(error);result=data;});
        
        //result is an array where every element is a type of biomedical data
        // tofix
        return(result);
    }



var  patientsOfImageData={};
function  getPatientsInBcrImages(cancerType){
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
                           "select distinct ?dataType ?name where { ",
                           "?file tcga:url ?url .",
                           "?file rdfs:label ?name .",
                           "filter ( contains(?name, "+"\'"+".svs"+"\'"+") ) .",
                           "?file tcga:data-type ?d.",
                           "?d rdfs:label ?dataType.",
                           "?file tcga:disease-study ?ds . ",
                           "?ds rdfs:label "+"\'"+cancerType+"\'"+"."+"}"
                           ];
                           
        var sparql_query=sparql_template.join(" ");
       
        TCGA.hub.query(sparql_query,function(error,data){console.log(error); patientsOfImageData=data;});
        
        //result is an array where every element is a type of biomedical data
       
    }


// automating inheritance contruction

if(typeof Object.create !== 'function'){
       Object.create= function(o){
              var F= function(){};
              F.prototype=o;
              return new F();
           }
    }

var  Disease=function(diseaseName){
       this.diseaseName=diseaseName;
       this.getPatientPool=function(){
              
           }
    }