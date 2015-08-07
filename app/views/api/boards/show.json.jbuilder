json.(@board, :name)

json.lists @board.lists do |list|
  json.(list, :name)

  json.cards list.cards do |card|
    json.(card, :name, :image_url)
  end
end
