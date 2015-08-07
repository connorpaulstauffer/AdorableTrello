Trello.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "boardsIndex"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.boards().fetch();
  },

  boards: function () {
    this._boards = this._boards || new Trello.Collections.Boards();
    return this._boards;
  },

  boardsIndex: function () {
    var boardsIndexView = new Trello.Views.BoardsIndex({
      collection: this.boards()
    });

    this.swap(boardsIndexView);
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
