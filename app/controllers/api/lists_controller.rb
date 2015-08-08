class Api::ListsController < ApplicationController
  def update
    list = List.find(params[:id])
    if list.update(list_params)
      render json: list
    else
      render json: "error"
    end
  end

  def show
    @list = List.includes(:cards).find(params[:id])
    render 'show'
  end

  private
  def list_params
    params.require(:list).permit(:name, :rank, :board_id)
  end
end
