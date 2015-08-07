class Api::BoardsController < ApplicationController
  def index
    boards = Board.all
    render json: boards
  end

  def show
    @board = Board.includes(lists: :cards).find(params[:id])
    render 'show'
  end
end
