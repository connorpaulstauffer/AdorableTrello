class Api::BoardsController < ApplicationController
  def index
    boards = current_user.boards
    if boards
      render json: boards
    else
      render json: boards.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @board = Board.includes(lists: :cards).find(params[:id])
    redirect_to :root && return unless @board.user == current_user
    render 'show'
  end
end
