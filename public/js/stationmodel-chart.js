var station = null;

function initialize_chart(anStation, type){
   if (anStation){
      station = anStation;   
   }
   
   var title = '';
   var aColor = '#000000';
   var StationsModel = Backbone.Model.extend({
      initialize: function(){
      
      },
      defaults:{
         stations:[]
      },      
      addStation: function(newStation, infoStation){//Add a Station to the list of Stations
         var array_stations = this.get('stations');
         switch (type){
          case 'Temperatura':
            array_stations.push([newStation['captured_at'], newStation['temperature']]);
            aColor = '#C0392B';
            break;
          case 'Humedad':
            array_stations.push([newStation['captured_at'], newStation['humidity']]);
            aColor = '#27AE60';
            break;
          case 'Presion':
            array_stations.push([newStation['captured_at'], newStation['bar']]);
            aColor = '#F1C40F';
            break;            
          case 'Viento':
            array_stations.push([newStation['captured_at'], newStation['wind_speed']]);
            aColor = '#00B0F6';
            break;            
          }            

         this.set({stations:array_stations});
      },      
      printStations: function(){//This function prints the right menu of Waypoints 
         var array_stations = this.get('stations');
         var i = 0;
         var anArray = new Array();
         anArray.push(["Year", type]);          
         array_stations.forEach(function(data) {//data for template
            var fecha = timeStampForHuman(data[0]);
            var stringFecha = fecha['date'] + '/' + fecha['month'] + ' ' + fecha['hours'] + ':' + zeroPad(fecha['minutes'], 2);
            anArray.push([stringFecha, parseInt(data[1])]);
         });

         drawChart(title, anArray, aColor);


      }
   });

var stations = new StationsModel;

//QUERY the fusion table LIST of ALL Waypoints


open('loading');
close('chart_div');
//$.getJSON("https://www.googleapis.com/fusiontables/v1/query?sql=SELECT%20*%20FROM%201iTD0jP1uZYzzCaHCkR_ue7lyeQfocXoDXgctRaY%20WHERE%20ID%20=%201&key=AIzaSyA72Nn_S7CPB0eYkpUZACopItP3pqG4wSs", function( data ) {
$.ajax({
   type: 'GET',
   url: url_station + station,
   dataType: "jsonp",
   success: function(data) {
      $.each( data.items, function( i, item ) {
         stations.addStation(item);//Add Station to the "list of Stations" (an array)
      });
      close('loading');
      open('chart_div');
      title = data['station']['name'];
      stations.printStations();//Call for print Stations on the chart*/
   }
   

});






}
