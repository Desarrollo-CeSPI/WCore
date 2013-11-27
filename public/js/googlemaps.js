var map;
var markers = [];//Array for save the object MARKER in the maps, to can link on click on the right list
var infowindows = [];//For can close all infowindows...
function initialize_google() {
  var mapOptions = {

    panControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
    },

    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
    },

    zoom: 13,
    center: new google.maps.LatLng(-34.922127, -57.955585),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  //integrate the DIV "Header" into Google MAPS
  var header = document.getElementById('logo_container');
  map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(header);

  //integrate the DIV "List of Stations" into Google MAPS
  var menu_slider = document.getElementById('header');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(menu_slider);

}

function myClick(id){//When click on a link of the right menu, calls that function, to auto-open the WP-Dialog(Infowindow)
  google.maps.event.trigger(markers[id], 'click');
  $("#menu")
     .mmenu()
     .trigger( "close.mm" )
     .on( "closed.mm" );  
}

function attachPoint(map, latitude, longitude, name, html, icon) {//add a waypoint to the map
  var position = new google.maps.LatLng(latitude, longitude);
  var marker = new google.maps.Marker({position: position, map: map});

  marker.setTitle((name).toString());

  marker.setIcon(icon);  

  var infowindow = new google.maps.InfoWindow({
    content: '<div class = "MarkerPopUp" style="width: 18em; height: 14em;"><div align="center" class = "MarkerContext"><div style="align:center;">' + html + '<br></div></div></div>'
  });

  google.maps.event.addListener(marker, 'click', function() {
    $.each( infowindows, function( key, value ) {
      infowindows[key].close();
    });    
    infowindow.open(marker.get('map'), marker);
    infowindows.push(infowindow);
  });

  markers.push(marker);//save the object to an array (for the links on the right menu)
}


//google.maps.event.addDomListener(window, 'load', initialize);