Trello.Views.BoardIndexItem = Backbone.View.extend({
  template: JST['boards/board_index_item'],

  tagName: 'li',

  render: function () {
    var content = this.template({ board: this.model });
    this.$el.html(content);

    return this;
  }
});
