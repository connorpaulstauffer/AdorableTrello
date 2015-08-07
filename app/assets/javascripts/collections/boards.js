Trello.Collections.Boards = Backbone.Collection.extend({
  url: "api/boards",

  model: Trello.Models.Board,

  getOrFetch: function (id) {
    var board = this.get(id) || new Trello.Models.Board({ id: id });
    board.fetch();

    return board;
  }
});
