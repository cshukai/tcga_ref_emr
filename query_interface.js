var template_div_node=document.getElementById('main');

while (template_div_node.firstChild) {
              template_div_node.removeChild(template_div_node.firstChild);
         }

var ScriptNode=document.createElement('script');
ScriptNode.setAttribute('type','text/javascript');
ScriptNode.setAttribute('src','https://dl.dropbox.com/u/79021836/jQueryUI/jquery-ui.min.js');
document.head.appendChild(ScriptNode);



var css = document.createElement('link');
css.setAttribute('rel', 'stylesheet');
css.setAttribute('href', 'https://dl.dropbox.com/u/79021836/TCGA_Ref_EMR/query_interface.css');
document.head.appendChild(css);






var pidDiv=document.createElement('div');
pidDiv.setAttribute('id','pidArea');
document.body.appendChild(pidDiv);



 var  pidInput=document.createElement('input');

     pidInput.setAttribute('type','text');
     pidInput.setAttribute('id','pidInput');

     pidDiv.appendChild(pidInput);
     



var ScriptNode=document.createElement('script');
ScriptNode.setAttribute('type','text/javascript');
ScriptNode.setAttribute('src','https://dl.dropbox.com/u/79021836/TCGA_Ref_EMR/query_interaction.js');
document.head.appendChild(ScriptNode);
