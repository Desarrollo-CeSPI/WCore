function timeStampForHuman(aTimeStamp){
  var timeDate = new Date(aTimeStamp * 1000);
  var date = new Array();
  date['date'] = timeDate.getUTCDate();
  date['month'] = timeDate.getUTCMonth() + 1;
  date['year'] = timeDate.getUTCFullYear();
  date['hours'] = timeDate.getHours();
  date['minutes'] = timeDate.getMinutes();
  return date;
}

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

function close_chart(id) {
  document.getElementById(id).style.display = 'none';
}

function open_chart(id) {
  document.getElementById(id).style.display = 'block';
}

      $(function() {
        $("nav#menu")
           .mmenu()
           .on(
              "opened.mm",
              function()
              {
                 document.getElementById("map-canvas").style.width="79%";
              })
           .on(
              "closed.mm",
              function()
              {
                 document.getElementById("map-canvas").style.width="100%";
              })           
      });

      function open_menu(){
                 $("#menu")
               .mmenu()
               .trigger( "open.mm" )
               .on( "open.mm" );  
      }
      function close_menu(){
                 $("#menu")
               .mmenu()
               .trigger( "close.mm" )
               .on( "close.mm" );  
      }     
      jQuery(document).ready(function ($) {
        if ($(window).width() > 900) {
          open_menu();
        } 
      });
      $( window ).resize(function() {
        if ($(window).width() > 900) {
          close_menu();
        }
      });


/*function args( name ){
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp ( regexS );
  var tmpURL = window.location.href;
  var results = regex.exec( tmpURL );
  if( results == null )
    return"";
  else
    return results[1];
}*/


/*function chart_generate_link(type){
  location.href = "./grafico.htm?station=" + args("station") + "&type=" + type;
}*/