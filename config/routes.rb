Rails.application.routes.draw do
  root 'home#index'
  namespace :api do
    resources :candidates, only: %i[index create update destroy]
    get '/candidates/:id', to: 'candidates#show'
    put '/api/candidates/:id', to: 'api/candidates#update'
  end
end
