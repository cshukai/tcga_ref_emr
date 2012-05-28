
// SPARQL queries for finding relationships between pid and data-type 
var cancerType='';
var dataTypeByDisease=[ "prefix tcga:<http://purl.org/tcga/core#>",
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

var dataTypeByDisease_query=dataTypeByDisease.join(" ");



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