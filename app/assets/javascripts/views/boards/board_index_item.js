Trello.Views.BoardIndexItem = Backbone.View.extend({
  template: JST['boards/board_index_item'],

  tagName: 'a',

  attributes: function () {
    return { 'href': "#/boards/" + this.model.id };
  },

  className: 'board-list-item active nounderline',

  render: function () {
    var content = this.template({ board: this.model });
    this.$el.html(content);

    return this;
  }
});
