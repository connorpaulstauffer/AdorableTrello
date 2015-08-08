Trello.Views.List = Backbone.CompositeView.extend({
  template: JST['lists/list_show'],

  tagName: 'li',

  className: 'list-item',

  attributes: function () {
    return { 'data-id': this.model.id }
  },

  initialize: function () {
    // this.listenTo(this.model.cards(), "add", this.addCardItem.bind(this));
    // this.listenTo(this.model.cards(), "remove", this.removeCardItem.bind(this));
    // this.listenTo(this.model, "sync", this.render);
    this.model.cards().each(this.addCardItem.bind(this));
  },

  addCardItem: function (card) {
    var cardItemView = new Trello.Views.CardItem({ model: card });
    this.addSubview('.card-list', cardItemView);
  },

  removeCardItem: function (card) {
    this.removeModelSubview('.card-list', card);
  },


  render: function () {
    // debugger;
    var content = this.template({ list: this.model });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
});
