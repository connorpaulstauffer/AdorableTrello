Trello.Views.CardItem = Backbone.View.extend({
  template: JST['cards/card_item'],

  render: function () {
    var content = this.template({ card: this.model });
    this.$el.html(content);

    return this;
  }
});
