Rails.application.routes.draw do
  resources :orders, only: [:index, :create, :show]
  resources :items, only: [:index]
  resources :item_properties, only: [:index]
  resources :properties, only: [:index]
end
