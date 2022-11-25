Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # Category
      resources :types

      # Expense
      resources :items

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
    end
  end
end
