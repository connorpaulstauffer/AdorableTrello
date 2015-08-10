Trello.Views.BoardForm = Backbone.View.extend({
  template: JST['boards/board_form'],

  tagName: 'a',

  attributes: { 'href': '#'},

  className: 'list-group-item board-list-item',

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});
