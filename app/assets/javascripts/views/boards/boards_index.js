Trello.Views.BoardIndex = Backbone.CompositeView.extend({
  template: JST['boards/board_index'],

  className: 'row',

  initialize: function () {
    this.listenTo(this.collection, "add", this.addBoardItem.bind(this));
    this.collection.each(this.addBoardItem.bind(this));
  },

  addBoardItem: function (board) {
    var boardItem = new Trello.Views.BoardIndexItem({ model: board });
    this.addSubview('.board-items', boardItem);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    // this.attachSubviews();

    return this;
  }
});
