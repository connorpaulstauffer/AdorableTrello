Trello.Views.List = Backbone.CompositeView.extend({
  template: JST['lists/list_show'],

  tagName: 'li',

  className: 'list-item',

  render: function () {
    var content = this.template({ list: this.model });
    this.$el.html(content);

    return this;
  }
});
