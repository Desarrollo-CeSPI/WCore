function initialize_map(){
   var StationsModel = Backbone.Model.extend({
      initialize: function(){
         console.info("Iniciando...");
         initialize_google();
      },
      defaults:{
         stations:[]
      },      
      addStation: function(newStation){//Add a Station to the list of Stations
         var array_stations = this.get('stations');
         array_stations.push(newStation);
         this.set({stations:array_stations});
      },      
      printStations: function(){//This function prints the right menu of Waypoints 
         var array_stations = this.get('stations');
         var i = 0;

			   var source = $("#template-list-links").html();
			   var template = Handlebars.compile(source);
  			 var info = { station: []};
         
         array_stations.forEach(function(data) {//data for template
         	info.station.push({n: i, id: data['id'], name: data['name']});
          i++;
         });   

         $(template(info)).appendTo( "#stations" );//Print the template merged with data, into DIV: stations  
         
         stations_loaded();
      }
   });

var stations = new StationsModel;

//QUERY the fusion table LIST of ALL Waypoints


$.ajax({
   type: 'GET',
   url: url_waypoint,
   dataType: "jsonp",
   success: function(data) {
      var source = $("#template-waypoint-menu").html();
      var template = Handlebars.compile(source);
      $.each( data.stations, function( i, station ) {
        var info = { waypoint: []};
         
        var fecha = timeStampForHuman(station['last_data']['captured_at']);
        var stringFecha = fecha['date'] + '/' + fecha['month'] + '/' + fecha['year'] + ' ' + fecha['hours'] + ':' + fecha['minutes'];
        info.waypoint.push({id: station['id'], name: station['name'], adress: station['adress'], update: stringFecha, temperatura: station['last_data']['temperature'], humedad: station['last_data']['humidity'], presion: station['last_data']['bar'], velocidad: station['last_data']['wind_speed'], direccion: station['last_data']['wind_direction'], uvi: station['last_data']['uv_dose'], url: station['url']});
       
        attachPoint(map, station['lat'], station['long'], station['name'], template(info), './img/' + station['id'] + '.png');//Add Waypoint into the map
        stations.addStation(station);//Add Station to the "list of Stations" (an array)

      });

      stations.printStations();//Call for print the name of Stations, "a list right of map"


   }
});

      
}
