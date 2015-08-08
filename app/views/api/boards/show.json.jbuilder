json.(@board, :name)

json.lists @board.lists do |list|
  json.(list, :id, :name, :rank)

  json.cards list.cards do |card|
    json.(card, :name, :image_url, :id, :list_id)
  end
end
