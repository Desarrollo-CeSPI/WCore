function timeStampForHuman(aTimeStamp){
  aTimeStamp = aTimeStamp - (3*60*60);
  var timeDate = new Date(aTimeStamp * 1000);
  var date = new Array();
  date['date'] = timeDate.getUTCDate();
  date['month'] = timeDate.getUTCMonth() + 1;
  date['year'] = timeDate.getUTCFullYear();
  date['hours'] = timeDate.getUTCHours();
  date['minutes'] = timeDate.getUTCMinutes();
  return date;
}

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

function close(id) {
  document.getElementById(id).style.display = 'none';
}

function open(id) {
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
