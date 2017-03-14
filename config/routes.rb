# frozen_string_literal: true
Rails.application.routes.draw do
  # Application
  root :to => 'application#index'

  # API
  namespace :api, :constraints => { :format => :json } do
    root :to => 'api#index'

    # Authentication
    mount_devise_token_auth_for 'User', :at => 'auth'

    jsonapi_resources :users
    jsonapi_resources :decks
    jsonapi_resources :tags
  end
end
