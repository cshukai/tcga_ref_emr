/*
 * from DiseaseClass.js
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
                           "?ds rdfs:label "+"\'"+'tumor/'+this.diseaseName+"\'"+"."+"}"
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
                           "filter ( contains(?url, "+"\'"+'tumor/'+this.diseaseName+"\'"+") ) .",
                           "filter ( contains(?url, "+"\'"+"clin"+"\'"+") ) .",
                           "filter ( contains(?url, "+"\'"+".txt"+"\'"+") ) .",
                           "filter ( contains(?url, "+"\'"+"public"+"\'"+") ) .",        
                           "}"
                           ];
                           
        var sparql_query=sparql_template.join(" ");
                                                                                
        TCGA.hub.query(sparql_query,function(error,data){console.log(error);that.urlsOfClinicalDataSets=queryResultObj2Array(data,0);});
        
        //result is an array where every element is a type of biomedical data
  };
  
  
   Disease.prototype.setClinUrlinTreeByDisease=function(lookUpTree,i,allDiseases){
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
                           "filter ( contains(?url, "+"\'"+'tumor/'+this.diseaseName+"\'"+") ) .",
                           "filter ( contains(?url, "+"\'"+"clin"+"\'"+") ) .",
                           "filter ( contains(?url, "+"\'"+".txt"+"\'"+") ) .",
                           "filter ( contains(?url, "+"\'"+"public"+"\'"+") ) .",        
                           "}"
                           ];
                           
        var sparql_query=sparql_template.join(" ");
                                                                                
        TCGA.hub.query(sparql_query,function(error,data){
                                                           console.log(error);
                                                           that.urlsOfClinicalDataSets=queryResultObj2Array(data,0);
                                                           lookUpTree[allDiseases[i]]['clin']['url']=that.urlsOfClinicalDataSets;
                                                  
                                                          });
        
   	  
   	  
   	 

   }
 
 
   Disease.prototype.setSubDataTypesInTreeByDisease=function(lookUpTree,i,allDiseases,mainDataType){
   	                                                 
   	                                                       var that= this;
   	                                                       lookUpTree[allDiseases[i]][mainDataType]['url_colNames_map']=new Array();
   	                                                          
                                                           for(var j =0; j< lookUpTree[allDiseases[i]][mainDataType]['url'].length;j++){
   	  		                                                     
   	  		                                                     
   	                  	                                        if(j==lookUpTree[allDiseases[i]][mainDataType]['url'].length){
   	  	                                                        	 break;
   	                                                       	     }	
 	                                                          
 	                                                           // console.log(i); 
 	                                                          // console.log(j);
 	                                                           // console.log('----');
 	                                                           
 	                                                            lookUpTree[allDiseases[i]][mainDataType]['url_colNames_map'].push( lookUpTree[allDiseases[i]][mainDataType]['url'][j]);
 	                                                            
 	                                                         // lookUpTree[allDiseases[i]][mainDataType]['url'][j]['subDataType']=new Array();
  	                                                          TCGA.get(lookUpTree[allDiseases[i]][mainDataType]['url'][j], function(error,data){console.log(error);that.cuurentTbl=splitTbl2Array(data,false);that.currentColNames=that.cuurentTbl[0];lookUpTree[allDiseases[i]][mainDataType]['url_colNames_map'].push(that.currentColNames);}); 	     
  	     
  	                                                          
                                                            }
                                                          
   }
 
 
 
 
 
 
   Disease.prototype.getDataTypes=function(){
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
        TCGA.hub.query(sparql_query,function(error,data){console.log(error);that.dataTypes= queryResultObj2Array(data,0);});
   
        
        
                 
         
       }
 
 
 
 
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
  

  
  Disease.prototype.fetchOneColInFile=function(lookUpTree,i,j,k,allDiseases,mainDataType,currentURL,resultColname,urlResultMapName){
  	   
  	   var that=this;
  	   that.currentColNames=new Array();
  	   
  	   
  	   lookUpTree[allDiseases[i]][mainDataType][urlResultMapName]=new Array();
  	   
  	   	   
       lookUpTree[allDiseases[i]][mainDataType][urlResultMapName].push(currentURL);
       
  	   TCGA.get(currentURL, function(error,data){
  	   	console.log(error);
  	   	that.cuurentTbl=splitTbl2Array(data,false);
  	   //	console.log(currentURL);
  	   	that.currentColNames=that.cuurentTbl[0];
  	    
  	   	for(var idx=1; idx<that.cuurentTbl.length; idx++){
  	   		if(idx==that.cuurentTbl.length){
  	   			break;
  	   		}
  	   	//	console.log(that.currentColNames);
  	   	    console.log(idx);
  	   	    console.log(typeof that.currentColNames);
  	   	    console.log(typeof that.cuurentTbl[idx]);
  	   	    console.log('---');
  	   	    that.tcga_barcodes=new Array();
  	   		that.tcga_barcodes[idx-1]=that.cuurentTbl[idx][that.currentColNames.indexOf(resultColname)];
  	   		lookUpTree[allDiseases[i]][mainDataType][urlResultMapName].push(that.tcga_barcodes);
  	   		}
  	   	});

  }



//assuming colnames are tab-separated
  Disease.prototype.fetchColNames=function(url){
  	   var that=this;
  	   TCGA.get(url, function(error,data){console.log(error);that.cuurentTbl=splitTbl2Array(data,false);that.currentColNames=that.cuurentTbl[0];});
  }

  
  
  //assuming colnames are tab-separated
  Disease.prototype.fetchRowColNames=function(url,ColIndexForRowName){
  	   var that=this;
  	   TCGA.get(url, function(error,data){console.log(error);that.cuurentTbl=splitTbl2Array(data,false);that.currentColNames=that.cuurentTbl[0];that.tcga_barcodes=new Array();for(var i=1; i<that.cuurentTbl.length; i++){that.tcga_barcodes[i-1]=that.cuurentTbl[i][ColIndexForRowName];}});
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
                           
        var sparql_query=sparql_template.join(" ");                      
        TCGA.hub.query(sparql_query,function(error,data){console.log(error);allDiseaseTypes=data;});
      
  }
  







/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
 * 
 * pipeline
 * 
 */






 var lookUpTree={};
 lookUpTree['disease']=new Array();
 
 
 var allDiseases=new Array();
 var aDisease={};
 getAllDiseaseTypes();
  	
window.setTimeout(function(){processingDiseaseType();},20000);



 
//  time interval here 
 	




var template_div_node=document.getElementById('main');

while (template_div_node.firstChild) {
    template_div_node.removeChild(template_div_node.firstChild);
}


template_div_node.style.backgroundColor = 'orange';


var customCtrlDiv=document.createElement("div");
customCtrlDiv.setAttribute("id", "usrCtrl");
//customCtrlDiv.setAttribute("align","float:right");
customCtrlDiv.style.paddingLeft="15px";
template_div_node.appendChild(customCtrlDiv);


 var cancerTypeSelector=document.createElement('select');
 cancerTypeSelector.setAttribute('class','disease');
 cancerTypeSelector.setAttribute('id','cancerType');





 
 
 function processingDiseaseType(callback){
 	
 	 for(var j=0; j<allDiseaseTypes.length; j++){
 	  allDiseases[j]=allDiseaseTypes[j][0].toString().replace(/\"/g,"");
 	  lookUpTree['disease'].push (allDiseases[j]);	
 	  lookUpTree[allDiseases[j]]={};
 	  lookUpTree[allDiseases[j]]['dataType']=new Array();
 	  
      
      var option=document.createElement('option');
      option.setAttribute('value',allDiseases[j]);
      var optionText=document.createTextNode(allDiseases[j]);
      option.appendChild(optionText);
 	  cancerTypeSelector.appendChild(option); 	  
 	 }
 	 	 	 	
 }



var label = document.createElement('label');
label.setAttribute('for','cancerType')
label.style.display="inline-block";
label.style.color='white';
label.appendChild(document.createTextNode('Select cancer type:   '));





customCtrlDiv.appendChild(label);
customCtrlDiv.appendChild(document.createElement('br'));
customCtrlDiv.appendChild(cancerTypeSelector);
customCtrlDiv.appendChild(document.createElement('br'));


var sampleObject=new Disease('gbm');
var currentFunctions=Object.keys(Object.getPrototypeOf(sampleObject));
var numofFunctions=currentFunctions.length;

var buttonTable=document.createElement('table');
buttonTable.style.borderWidth="thick thick";

for (var rowIdx=0; rowIdx<numofFunctions ; rowIdx++){
     var row=buttonTable.insertRow(-1);	
     row.style.textAlign="center";
     var cell_1=row.insertCell(0);
     var cell_2=row.insertCell(1);
	 var cell_3=row.insertCell(2);
   	 
   	 var button_1=document.createElement('input');
   	 var button_2=document.createElement('input');
   	 var button_3=document.createElement('input');
   	 
   	
   	 
   	 button_1.setAttribute('type','button');
   	 button_2.setAttribute('type','button');
   	 button_3.setAttribute('type','button');
   	  
   	 button_1.setAttribute('value',currentFunctions[rowIdx]);
   	 button_2.setAttribute('value',currentFunctions[rowIdx+1]);
   	 button_3.setAttribute('value',currentFunctions[rowIdx+2]);
   	 
   	 cell_1.appendChild(button_1);
   	 cell_2.appendChild(button_2);
   	 cell_3.appendChild(button_3);
   	 
	 rowIdx=rowIdx+2; 
	 
} 

buttonTable.cellPadding="25";
buttonTable.cellSpacing="15";
//buttonTable.style.textAlign="center";
customCtrlDiv.appendChild(buttonTable);

