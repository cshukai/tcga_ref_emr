
$(document).ready(function() {

              $('#pidInput').position({
              of: $('#pidArea'),
             my:'center top',
             at:'center center'
           });
      
      
 
      
      $('#pidInput').mouseover(function(){
          $('#pidButton').position({
           of: $('#pidInput'),
           my:'left top',
           at:'right top'
         });     
      });

             
        
        
       $(window).resize(function(){
            $('#pidInput').position({
                of: $('#pidArea'),
                my:'center top',
                at:'center center'
            });
            
           $('#pidButton').position({
               of: $('#pidInput'),
               my:'left top',
              at:'right top'
         });  
           
            
            
      });    
      
      
      $('#pidButton').click(function(){
          
          
          
          
          
          // var progressDiv=document.createElement('div');
          // var barDiv=document.createElement('div');
//           
          // progressDiv.id='progressBar';
          // progressDiv.className='progress progress-striped active';
          // barDiv.className='bar';
          // barDiv.style='width: 40%;';
//           
//           
          // progressDiv.appendChild(barDiv);
          // pidDiv.appendChild(progressDiv);
//           
//           
          // $('#progressBar').position({
                // of: $('#pidInput'),
                // my:'left top',
                // at:'left bottom'
            // });
          
          
          
      });
      
      $('#pidInput').keypress(function(){
            console.log('here');
            $('#pidInput').css('animation-duration','30s');
            $('#pidInput').css('animation-name','slidein');
            $('#pidButton').css('animation-duration','30s');
            $('#pidButton').css('animation-name','slidein');
            
      });
      
      
    
});
