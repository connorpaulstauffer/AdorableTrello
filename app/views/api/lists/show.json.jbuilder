json.(@list, :id, :rank, :name, :board_id)

json.cards @list.cards do |card|
  json.(card, :id, :rank, :name, :image_url, :list_id)
end
