Rails.application.routes.draw do
  resources :orders, only: [:index, :new, :create, :show]
end
