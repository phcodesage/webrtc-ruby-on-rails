# config/routes.rb
Rails.application.routes.draw do
  root 'home#index'   # Set the root route if not already set
  get 'call', to: 'home#call'  # Add this line for your WebRTC calling page
end
