Trello.Collections.Lists = Backbone.Collection.extend({
  url: 'api/lists',

  model: Trello.Models.List,

  getOrFetch: function (id) {
    var list = this.get(id) || new Trello.Models.List({ id: id });
    list.fetch();

    return list;
  }
});
