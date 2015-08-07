Trello.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST['boards/board_index'],

  render: function () {
    var content = this.template();
    this.$el.html(content);

    this.collection.each(function (board) {
      var boardItem = new Trello.Views.BoardIndexItem({ model: board });
      this.addSubview('.board-items', boardItem);
    });

    return this;
  }
});
