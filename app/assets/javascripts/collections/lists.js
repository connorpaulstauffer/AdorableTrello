Trello.Collections.Lists = Backbone.Collection.extend({
  url: 'api/lists',

  model: Trello.Models.List
});
