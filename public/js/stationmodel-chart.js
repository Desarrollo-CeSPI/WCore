var station = null;
var stats = 'Temperatura';

function initialize_chart(anStation, type, from, to){

   if (anStation){
      station = anStation;   
   }

   if (type == ''){
      type = stats;
   }else{
      stats = type;
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

if (from == null || to == null){
   date_from = (new Date).getTime() / 1000;
   date_to = (new Date).getTime() / 1000;
   date_from = date_from - (60*60*24);   
}else{
   if (from == to){
      date_from = (new Date(from)).getTime() / 1000;
      date_to = (new Date(to)).getTime() / 1000;
      date_from = date_from - (60*60*24);
   }else{
      date_from = new Date(from).getTime() / 1000;
      date_to = new Date(to).getTime() / 1000;
   }
}

$.ajax({
   type: 'GET',
   url: url_station + station + '&from=' + date_from + "&to=" + date_to,
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
