class WeatherStation < ActiveRecord::Base
	has_many :weather_data, foreign_key: 'id_station'

	def last_data
        weather_data.order('captured_at DESC').first
	end
end