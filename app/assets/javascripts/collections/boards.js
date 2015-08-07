Trello.Collections.Boards = Backbone.Collection.extend({
  url: "api/boards",

  model: Trello.Models.Board,

  getOrFetch
});
