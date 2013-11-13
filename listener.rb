require 'sinatra'
require 'json'
require 'sinatra/activerecord'
require 'yaml'
require 'sinatra/activerecord/rake'
require './lib/model/weather_datum'
require './lib/model/weather_station'

environment = ENV['RAKE_ENV'] || 'development'
path = 'config/database.yml'
database_hash = YAML.load(ERB.new(File.read(path)).result) || {}
database_hash = database_hash[environment.to_s] if database_hash[environment.to_s]
ActiveRecord::Base.establish_connection database_hash

def write(data)
	data.each do |k, e|

		station = Hash.new
		station['url'] = e['url']
		e.delete('url')
		
		station['id_station'] = e['id_station']
		
		station['name'] = e['name']
 		e.delete('name')
 		
 		station['adress'] = e['adress']
		e.delete('adress')
		
		station['lat'] = e['lat']
		e.delete('lat')
		
		station['long'] = e['long']
		e.delete('long')

		WeatherDatum.find_or_create_by(e)
		WeatherStation.find_or_create_by(station)
	end
	return 'ok'
end

def read(data, station)
	puts station
	case data
		when 'waypoints'
			{ stations: weather_stations }.to_json
		when 'station'
			{ items: WeatherDatum.where(id_station: station), station: WeatherStation.find_by(id_station: station) }.to_json
	end	
end

def weather_stations
	WeatherStation.where(nil).map do |station|
		{
			id: station.id_station,
			name: station.name,
			address: station.adress,
			url: station.url,
			last_data: station.last_data,
			lat: station.lat, 
			long: station.long
		}
	end
end

post '/upload' do
  write(JSON.parse(params[:data]))
end

get '/download', provides: :json do
  json = read(params[:data], params[:station])
  "#{params[:callback]}(#{json});"
end