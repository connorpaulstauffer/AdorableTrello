Trello.Views.CardFormDetail = Backbone.View.extend({
  template: JST['cards/card_form_detail'],

  tagName: 'form',

  render: function () {
    var content = this.template({ card: this.model });
    this.$el.html(content);

    return this;
  }
});
