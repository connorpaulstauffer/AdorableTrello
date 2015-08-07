Trello.Models.List = Backbone.Model.extend({
  urlRoot: 'api/lists',

  cards: function () {
    this._cards = this._cards
      || new Trello.Collections.Cards([], { board: this });
    return this._cards;
  },

  parse: function (response) {
    if (response.cards) {
      this.cards().set(response.cards, { parse: true });
      delete response.cards;
    }
    return response;
  }
});
