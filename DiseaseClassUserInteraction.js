




var data={};

$(document).ready(function(){
   
   var aDisease=new Disease('blca');
   
   
       $("select").change(function () {
           
             aDisease=new Disease($("select option:selected").value);
            
        })
        .trigger('change');
   
   
   $('.flat').click(
   	
   	             // if(){
//    	             	
   	             // }
   	                // function() {
// 				         
		            // }
		       );
   	   

});


// var resultStore = Ext.create('Ext.data.Store', {
    // model: 'ResultView',
    // data: temp
// });