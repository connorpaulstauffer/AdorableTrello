class Api::SessionsController < ApplicationController
  def create
    params = user_params
    user = User.find_by_credentials(params[:email], params[:password])
    if user
      log_in_user!(user)
      render json: user
    elsif params[:email].include?("@adorabletrello.com")
      user = create_demo_user(params[:email], params[:password])
      log_in_user!(user)
      render json: user
    else
      json_alert = ['Invalid email/password combination'].to_json
      render json: json_alert, status: :unprocessable_entity
    end
  end

  def destroy
    log_out!
    render json: "success".to_json
  end
end
