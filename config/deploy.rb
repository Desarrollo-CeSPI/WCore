set :application, "weather_core"
set :repository,  "https://github.com/Desarrollo-CeSPI/WCore.git"

default_run_options[:pty] = true

# No need to upload a deploy key
set :ssh_options,           { :forward_agent => true }

set :rbenv_ruby_version,    File.read(File.expand_path('../../.ruby-version', __FILE__)).chomp
set :deploy_via,            :remote_cache
set :keep_releases,         10
set :use_sudo,              false

set :shared_children,       %w{ log
                                bin
                                tmp }

set :shared_files,          %w{ config/database.yml
                                config/thin.yml
                                public/js/stationmodel-vars.js
                                config/config.yml }

set :deploy_to,   "/home/#{application}"
set :user,        application
set :domain,      'clima.info.unlp.edu.ar'
server domain,    :app, :web, :db, primary: true

after :deploy do
  run "if [ ! -d #{shared_path}/tmp/pids ]; then mkdir #{shared_path}/tmp/pids && chmod 0777 #{shared_path}/tmp/pids; fi"
end
