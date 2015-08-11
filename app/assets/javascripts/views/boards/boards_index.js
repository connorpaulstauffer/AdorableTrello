Trello.Views.BoardIndex = Backbone.CompositeView.extend({
  template: JST['boards/board_index'],

  className: 'container',

  initialize: function () {
    this.listenTo(this.collection, "add", function (model) {
      this.boardForm.remove();
      this.addBoardItem(model);
      this.addBoardForm();
    }.bind(this));

    this.collection.each(this.addBoardItem.bind(this));
    this.addBoardForm();
  },

  addBoardForm: function () {
    var boardForm = new Trello.Views.BoardForm({
      collection: this.collection
    });
    this.boardForm = boardForm;
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
