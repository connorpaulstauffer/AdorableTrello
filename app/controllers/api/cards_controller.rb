class Api::CardsController < ApplicationController
  def update
    card = Card.find(params[:id])
    if card.update(card_params)
      render json: card
    else
      render json: card.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    card = Card.find(params[:id])
    if card
      render json: card
    else
      render json: "error"
    end
  end

  def create
    card = Card.new(card_params)
    if card.save
      render json: card
    else
      render json: card.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def card_params
    params.require(:card).permit(:name, :rank, :list_id, :image_url, :description)
  end
end
