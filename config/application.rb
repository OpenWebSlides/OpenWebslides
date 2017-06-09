# frozen_string_literal: true

require_relative 'boot'

require 'ostruct'
require 'rails'
# Pick the frameworks you want:
require 'active_model/railtie'
# require 'active_job/railtie'
require 'active_record/railtie'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'
# require "action_cable/engine"
# require "sprockets/railtie"
# require 'rails/test_unit/railtie'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module OpenWebslides
  mattr_accessor :config

  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true

    config.middleware.use ActionDispatch::Session::CacheStore
    config.session_store :cache_store

    # Autoload lib
    config.autoload_paths += %W[#{config.root}/lib]

    # Load configuration
    ows_config_file = Rails.root.join 'config', 'openwebslides.yml'
    ows_config = YAML.safe_load ERB.new(File.read ows_config_file).result

    # Parse configuration
    OpenWebslides.config = OpenStruct.new
    ows_config.each do |key, value|
      if value.is_a? Hash
        OpenWebslides.config.send "#{key.to_sym}=", OpenStruct.new(value)
      else
        OpenWebslides.config.send "#{key.to_sym}=", value
      end
    end

    # Cross Origin Resource Sharing
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '*', :headers => :any, :methods => %i[get post put patch delete options], :expose => ['Authorization']
      end
    end
  end
end
