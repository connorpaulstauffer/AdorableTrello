Trello.Views.BoardIndex = Backbone.CompositeView.extend({
  template: JST['boards/board_index'],

  className: 'container',

  initialize: function () {
    this.listenTo(this.collection, "add", this.addBoardItem.bind(this));
    this.addBoardForm();
    this.collection.each(this.addBoardItem.bind(this));
  },

  addBoardForm: function () {
    var boardForm = new Trello.Views.BoardForm();
    this.addSubview('#boards', boardForm);
  },

  addBoardItem: function (board) {
    var boardItem = new Trello.Views.BoardIndexItem({ model: board });
    this.addSubview('#boards', boardItem);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
});
