Rails.application.routes.draw do
  root to: "root#root"

  namespace :api, defaults: { format: :json } do
    resources :boards, only: [:create, :destroy, :show, :index, :update] do
      resources :lists, only: [:index] do
        resources :cards, only: [:index]
      end
    end

    resources :lists, only: [:create, :destroy, :show, :update]
    resources :cards, only: [:create, :destroy, :show, :update]
  end
end
