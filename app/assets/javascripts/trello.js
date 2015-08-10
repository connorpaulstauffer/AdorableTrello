window.Trello = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Trello.Routers.Router({ $rootEl: $('#root') });
    Backbone.history.start();
  }
};

$(Trello.initialize);
