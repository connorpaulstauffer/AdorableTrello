window.Trello = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#root');
    new Trello.Routers.Router({ $rootEl: $rootEl })
    Backbone.history.start();
  }
};

$(Trello.initialize);
