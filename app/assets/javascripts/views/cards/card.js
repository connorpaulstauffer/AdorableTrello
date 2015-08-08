Trello.Views.CardItem = Backbone.View.extend({
  template: JST['cards/card_item'],

  tagName: 'li',

  className: 'card_list_item',

  attributes: function () {
    return {
      'data-list-id': this.model.get('list_id'),
      'data-id': this.model.id
    }
  },

  render: function () {
    var content = this.template({ card: this.model });
    this.$el.html(content);

    return this;
  }
});
