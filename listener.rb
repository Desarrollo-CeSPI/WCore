require 'sinatra'
require 'json'
require 'sinatra/activerecord'
require 'yaml'
require 'sinatra/activerecord/rake'
require './lib/model/weather_datum'
require './lib/model/weather_station'
require 'digest/md5'

environment = ENV['RACK_ENV'] || 'development'

database_hash = YAML.load(ERB.new(File.read('config/database.yml')).result) || {}


database_hash = database_hash[environment.to_s] if database_hash[environment.to_s]
ActiveRecord::Base.establish_connection database_hash

set :token_config, YAML.load(ERB.new(File.read('config/config.yml')).result) || {}


def check_token(station, token)

	if (Digest::MD5.hexdigest(station + settings.token_config['basetoken']) == token) then
		return true
	else
		return false
	end
end

def write(data, token)
	return_message = 'no data'
	data.each do |k, e|
		return_message = 'ok'
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

		if (check_token(station['id_station'], token)) then	
			WeatherDatum.find_or_create_by(e)
			WeatherStation.find_or_create_by(station)
		else
			return_message = 'error token'
		end
	end
	return_message
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
  write(JSON.parse(params[:data]), params[:token])
end

get '/download', provides: :json do
  json = read(params[:data], params[:station])
  "#{params[:callback]}(#{json});"
end
