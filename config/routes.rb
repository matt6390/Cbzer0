Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post 'user_token' => 'user_token#create'

  get "/users" => 'users#index'
  get "/users/:id" => 'users#show'
  post "/users" => 'users#create'
  patch "/users/:id" => 'users#update'
  delete "/users/:id" => 'users#destroy'

  get "/songs" => 'songs#index'
  get "/songs/:id" => 'songs#show'
  post "/songs" => 'songs#create'
  patch "/songs/:id" => 'songs#update'
  delete "/songs/:id" => 'songs#destroy'

  
end
