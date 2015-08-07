Trello.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "boardIndex",
    "boards/:id": "boardShow"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.boards().fetch();
  },

  boards: function () {
    this._boards = this._boards || new Trello.Collections.Boards();
    return this._boards;
  },

  boardIndex: function () {
    var boardIndexView = new Trello.Views.BoardIndex({
      collection: this.boards()
    });

    this.swap(boardIndexView);
  },

  boardShow: function (id) {
    var board = this.boards().getOrFetch(id);
    var boardShowView = new Trello.Views.BoardShow({ model: board });

    this.swap(boardShowView);
  },

  swap: function (newView) {
    if (this._currentView) {
      this.currentView.remove();
    }
    this.currentView = newView;
    this.$rootEl.html(newView.render().$el);

    return newView;
  }
});
