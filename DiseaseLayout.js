
//loading dependencies



var ScriptNode=document.createElement('script');
ScriptNode.setAttribute('type','text/javascript');
ScriptNode.setAttribute('src','https://dl.dropbox.com/u/79021836/ext-4.1.0-gpl/extjs-4.1.0/ext-all.js');
document.head.appendChild(ScriptNode);


var ScriptNode=document.createElement('script');
ScriptNode.setAttribute('type','text/javascript');
ScriptNode.setAttribute('src','https://dl.dropbox.com/u/79021836/TCGA_Ref_EMR/DiseaseClass.js');
document.head.appendChild(ScriptNode);

var ScriptNode=document.createElement('script');
ScriptNode.setAttribute('type','text/javascript');
ScriptNode.setAttribute('src','https://dl.dropbox.com/u/79021836/library/caolan-async-4351b56/lib/async.js');
document.head.appendChild(ScriptNode);




// var ScriptNode=document.createElement('script');
// ScriptNode.setAttribute('type','text/javascript');
// ScriptNode.setAttribute('src','https://dl.dropbox.com/u/79021836/TCGA_Ref_EMR/DiseaseClassUserInteraction.js');
// document.head.appendChild(ScriptNode);




var css = document.createElement('link');
css.setAttribute('rel', 'stylesheet');
css.setAttribute('href', 'https://dl.dropbox.com/u/79021836/ext-4.1.0-gpl/extjs-4.1.0/resources/css/ext-all-debug.css');
document.head.appendChild(css);


var lookUpTree={};
lookUpTree['disease']=new Array();
 
 
 var aDisease={};

 var currentWindow=this;
 var extTree={};

window.setTimeout(function(){startProcess(lookUpTree);},5000);




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
 * 
 * pipeline
 * 
 */



function startProcess(lookUpTree){

 var currentWin=this;




 /*
  *  ExtJs viewers
  */



var ViewDiv=document.createElement("div");
ViewDiv.setAttribute("id", "view_div");
ViewDiv.setAttribute("align","float:left");
document.body.appendChild(ViewDiv);






   Ext.require(['Ext.data.TreeStore','Ext.tree.Panel','Ext.data.Tree']);

 
   var lookUpStore = Ext.create('Ext.data.TreeStore', {
     root: { 
     	     
     	     text: "disease",
             expanded: true
          
           }
    });


   Ext.create('Ext.tree.Panel', {
    id:'lookUpTree',
    title: 'lookUpTree',
    width: 200,
    height: 150,
    store: lookUpStore,
    rootVisible: true,
    renderTo:  ViewDiv
   });

   
     currentWindow.extTree=Ext.getCmp('lookUpTree');
    
    
    



 
 getAllDiseaseTypes();
   	

  	
window.setTimeout(function(){processingDiseaseType(lookUpTree,currentWin.allDiseaseTypes);},20000);
 
 	
 	
 	
 
 
    function processingDiseaseType(lookUpTree,allDiseaseTypes){
 	  console.log(allDiseaseTypes.length);
 	  for(var j=0; j<allDiseaseTypes.length; j++){
      
 	  lookUpTree['disease'].push (allDiseaseTypes[j]);	
 	  lookUpTree[allDiseaseTypes[j]]={};
 	  lookUpTree[allDiseaseTypes[j]]['dataType']=new Array();
 	  
      var option=document.createElement('option');
      option.setAttribute('value',allDiseaseTypes[j]);
      var optionText=document.createTextNode(allDiseaseTypes[j]);
      if(j==0){
      	  option.setAttribute('selected','selected');
      }
      option.appendChild(optionText);
 	  cancerTypeSelector.appendChild(option);
 	  
 	  
 	  extTree.store.tree.root.appendChild({id:allDiseaseTypes[j], text: allDiseaseTypes[j], expanded: true});
 	  
 	  
 	  
 	  
 	   	  
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
      window.setTimeout(function(){feedDataType2ExtTree(lookUpTree,allDiseaseTypes);},10000);
  }



    function feedDataType2ExtTree(lookUpTree,allDiseaseTypes){
    	 
    	   for(var i=0; i<extTree.store.tree.root.childNodes.length; i++){
    	   	  var currentNode=extTree.store.tree.root.childNodes[i];
    	      for(var idx=0; idx<lookUpTree[allDiseaseTypes[i]]['dataType'].length; idx++){
  	                  	 	    	                  	 	 
               	     currentNode.appendChild({id: lookUpTree[allDiseaseTypes[i]]['dataType'][idx], text:lookUpTree[allDiseaseTypes[i]]['dataType'][idx], expanded: true});	
  	         }
    	   }
    	      
             fillUrlsGivenDataType(allDiseaseTypes,lookUpTree);         
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
    }





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
  customCtrlDiv.appendChild(buttonTable);



   for(var idx=0; idx<$(':button').length; idx++){
	  var buttonName=$(':button')[idx].value;

	  if(buttonName.match(/name/i)||buttonName.match(/type/i)){
		 $(':button')[idx].setAttribute('class','flat');
	 } 

  }





 




}
