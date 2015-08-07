Trello.Collections.Cards = Backbone.Collection.extend({
  url: 'api/cards',

  model: Trello.Models.Card
});
