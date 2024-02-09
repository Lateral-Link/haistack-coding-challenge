# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  namespace :api do
    namespace :v1 do
      resources :candidates, only: %i[create index]
    end
  end

  root 'home#index'
  get '*path', to: 'home#index', via: :all
end
