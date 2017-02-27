Rails.application.routes.draw do
  root to: 'application#index'
  resources :orders, only: [:index, :new, :create, :show]
  resources :items, only: [:index]
  resources :item_properties, only: [:index]
  resources :properties, only: [:index]
end
