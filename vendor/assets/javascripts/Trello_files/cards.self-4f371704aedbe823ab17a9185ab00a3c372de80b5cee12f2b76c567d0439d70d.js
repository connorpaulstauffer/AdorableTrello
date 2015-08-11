Trello.Collections.Cards = Backbone.Collection.extend({
  url: 'api/cards',

  model: Trello.Models.Card,

  getOrFetch: function (id) {
    var card = this.get(id) || new Trello.Models.Card({ id: id });
    card.fetch();

    return card;
  }
});
