Trello.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/board_show'],

  initialize: function () {
    this.listenTo(this.model.lists(), "add", this.addListItem.bind(this));
    this.listenTo(this.model, "sync", this.render);
    this.model.lists().each(this.addListItem.bind(this));
  },

  addListItem: function (list) {
    var listView = new Trello.Views.List({ model: list });
    this.addSubview('#lists', listView);
  },

  render: function () {
    var content = this.template({ board: this.model });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
});
