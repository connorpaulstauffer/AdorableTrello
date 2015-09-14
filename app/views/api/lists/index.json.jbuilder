json.array! @lists do |this_list|
  json.partial! "api/lists/list", list: this_list
end
