var template_div_node=document.getElementById('main');

while (template_div_node.firstChild) {
              template_div_node.removeChild(template_div_node.firstChild);
         }

var ScriptNode=document.createElement('script');
ScriptNode.setAttribute('type','text/javascript');
ScriptNode.setAttribute('src','https://dl.dropbox.com/u/79021836/jQueryUI/jquery-ui.min.js');
document.head.appendChild(ScriptNode);



$(document).ready(function() {
     
     
     var  pidInput=document.createElement('input');
     pidInput.setAttribute('type','text');
     pidInput.setAttribute('id','pidInput');
     template_div_node.appendChild(pidInput);

     
         
     $('#main').position({
         of:$('body'),
         my:'center',
         at:'center'
         
     });
    
    
      $('#pidInput').position({
           of: $('#main'),
           my:'center',
           at:'center'
        });    
    
});

