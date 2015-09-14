Rails.application.routes.draw do
  root to: "root#root"

  namespace :api, defaults: { format: :json } do
    resources :boards, only: [:create, :destroy, :show, :index, :update]
    resources :users, only: [:create, :show]
    resources :sessions, only: [:create, :destroy]
    resources :lists, only: [:create, :destroy, :show, :update]
    resources :cards, only: [:create, :destroy, :show, :update]
  end

  delete "api/sessions/sign-out", to: "api/sessions#destroy"
end
