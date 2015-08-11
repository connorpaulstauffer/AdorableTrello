Trello.Views.CardForm = Backbone.View.extend({
  template: JST['cards/card_form'],
  
  tagName: 'a',

  attributes: { 'href': '#'},

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});
