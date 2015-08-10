class Api::SessionsController < ApplicationController
  def create
    params = user_params
    @user = User.find_by_credentials(params[:email], params[:password])
    if @user
      log_in_user!(@user)
      render json: @user
    else
      json_alert = ['Invalid email/password combination'].to_json
      render json: json_alert, status: :unprocessable_entity
    end
  end

  def destroy
    session_token = session[:session_token]
    Session.find_by_session_token(session_token).destroy!
    session[:session_token] = nil;
    redirect_to root_url
  end
end
