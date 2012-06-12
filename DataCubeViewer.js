
var ScriptNode=document.createElement('script');
ScriptNode.setAttribute('type','text/javascript');
ScriptNode.setAttribute('src','https://dl.dropbox.com/u/79021836/ext-4.1.0-gpl/extjs-4.1.0/ext-all-debug.js');
document.head.appendChild(ScriptNode);

var ScriptNode=document.createElement('script');
ScriptNode.setAttribute('type','text/javascript');
ScriptNode.setAttribute('src','https://dl.dropbox.com/u/79021836/ext-4.1.0-gpl/extjs-boxselect-2.0/src/BoxSelect.js');
document.head.appendChild(ScriptNode);



var css = document.createElement('link');
css.setAttribute('rel', 'stylesheet');
css.setAttribute('href', 'https://dl.dropbox.com/u/79021836/ext-4.1.0-gpl/extjs-4.1.0/resources/css/ext-all-debug.css');
document.head.appendChild(css);


var css = document.createElement('link');
css.setAttribute('rel', 'stylesheet');
css.setAttribute('href', 'https://dl.dropbox.com/u/79021836/ext-4.1.0-gpl/extjs-boxselect-2.0/src/BoxSelect.css');
document.head.appendChild(css);






window.setTimeout(function(){startProcess();},5000);


function startProcess(){
	Ext.onReady(function(){
   

  
   
    var template_div_node=document.getElementById('main');

    while (template_div_node.firstChild) {
          template_div_node.removeChild(template_div_node.firstChild);
    }




    var customCtrlDiv=document.createElement("div");
    customCtrlDiv.setAttribute("id", "usrCtrl");
    customCtrlDiv.style.verticalAlign="bottom";
    document.body.appendChild(customCtrlDiv);
    
    
    var  pid_scroller= new Ext.menu.Menu();
       for (var i = 0; i < 50; ++i){
          pid_scroller.add({
           text: 'Patient' + (i + 1)
           });
       }
    
    
    
    var pid_menu= new Ext.menu.Menu({
        id: 'pid',
        style: {
            overflow: 'visible'     
        },
        items: [
          
           {
                text: 'Choose Tissue Source Site:',
                menu: {        // <-- submenu by nested config object
                    items: [
                        // stick any markup in a menu
                        
                        {
                            text: 'MD Anderson',
                            checked: false,
                            group: 'theme',
                            checkHandler: onItemCheck
                        }, {
                            text: 'TGen',
                            checked: false,
                            group: 'theme',
                            checkHandler: onItemCheck
                        }
                    ]
                }
            },
            
            {
            	text:'Select TCGA Barcode',
            	menu:pid_scroller
            }
        ]
    });
    
    
   var disease_dataType_store= Ext.create('Ext.data.Store', {
    fields: ['disease', 'dataType'],
    data : [
        {"disease":"BLCA", "dataType":"snp"},
        {"disease":"GBM", "dataType":"transcriptome"},
        {"disease":"OV", "dataType":"methylation"}
      
    ]
}); 

   var dataTypeBox= new Ext.form.ComboBox({
   	   id:'dataType',
   	   emptyText: 'Select Data Type...',
   	   multiSelect:true,
   	   store:disease_dataType_store
   	
   });
   
   var dataType_menu= new Ext.menu.Menu({
        id: 'dataType',
        style: {
            overflow: 'visible'     
        },
        items: [
          
           {
                
                
                text: 'Choose Data Type..',
                
                menu: { 
                	
                	
                	      
                    items: [ 
                 
                        
                        {
                            text: 'SNP',
                            checked: false,
                            group: 'theme',
                            checkHandler: onItemCheck
                        }, {
                            text: 'Transcriptome',
                            checked: false,
                            group: 'theme',
                            checkHandler: onItemCheck
                        },
                        
                        {
                            text: 'Methylation',
                            checked: false,
                            group: 'theme',
                            checkHandler: onItemCheck
                        }
                        
                    ]
                }
            }
        ]
    }); 
    
    
    
   Ext.create('Ext.toolbar.Toolbar', {
    renderTo: customCtrlDiv,
    width   : 400,
    items: [
        {   xtype: 'splitbutton',
            text: 'Patient-ID',
            menu: pid_menu
        },
        
        
        {
            xtype: 'splitbutton',
            text : 'disease'
        },
        
        {
            xtype: 'splitbutton',
            text : 'data type',
            menu:dataType_menu
        },
        
        '->',
        {
            xtype    : 'textfield',
            name     : 'field1',
            emptyText: 'enter search term'
        }
    ]
}).alignTo(customCtrlDiv,'bl');
  
     function onItemCheck(item, checked){
        Ext.example.msg('Item Check', 'You {1} the "{0}" menu item.', item.text, checked ? 'checked' : 'unchecked');
    }


});






























}
