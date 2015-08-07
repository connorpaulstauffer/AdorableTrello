json.(@board, :name)

json.lists @board.lists do |list|
  json.(list, :name)
end
