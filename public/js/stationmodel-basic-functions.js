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

function args( name ){
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp ( regexS );
  var tmpURL = window.location.href;
  var results = regex.exec( tmpURL );
  if( results == null )
    return"";
  else
    return results[1];
}


function chart_generate_link(type){
  location.href = "./grafico.htm?station=" + args("station") + "&type=" + type;
}