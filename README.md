# WCore
	
	Created for use with WUploader and WClient

	* WCore & WUploader
		WUploader send JSON data with POST method for WCore like: http://localhost:4567/upload
		WCore capture the JSON and inject into the db
	
	* WCore & WClient
		WClient need data, then, send a GET request for WCore and that ouput the data in JSON format


# Install

	* Create a database. Example: mysqladmin -uroot -p123456 create wcore
	* Copy `config/station.yml-sample` to `config/database.yml`
	* Copy `config/station.yml-sample` to `config/config.yml`
	* Configure `config/database.yml`
	* Configure `config/config.yml` for token base
	* Run bundler: `bundle install`
	* Run database migrations: `bundle exec rake db:migrate`

# Use
	
	* Run: `bundle exec rackup`

