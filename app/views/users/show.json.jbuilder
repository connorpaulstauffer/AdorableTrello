json.(@user, :email)

json.boards @user.boards do |board|
  json.(board, :name)
end
