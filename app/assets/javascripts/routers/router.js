Trello.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "welcomeOrUserBoardIndex",
    "boards/:id": "boardShow"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$rootView = new Trello.Views.Root();
  },

  welcomeOrUserBoardIndex: function () {
    this._boards = new Trello.Collections.Boards();
    var that = this;
    
    this._boards.fetch({
      success: function (collection) {
        that.userBoardIndex();
      },

      error: function (collection, response) {
        that.welcome();
      }
    });
  },

  userBoardIndex: function () {
    var indexView = new Trello.Views.BoardIndex({ collection: this._boards });
    this.swap(indexView);
  },

  welcome: function () {
    var welcomeView = new Trello.Views.Welcome();
    this.swap(welcomeView);
  },

  boardShow: function (id) {
    var that = this;
    if (!this._boards) {
      this._boards = new Trello.Collections.Boards();
      this._boards.fetch({
        success: function () {
          var board = that._boards.getOrFetch(id);
          var boardShowView = new Trello.Views.BoardShow({ model: board });

          that.swap(boardShowView);
        },

        error: function () {
          this.welcome();
        }
      });
    } else {
      var board = this._boards.getOrFetch(id);
      var boardShowView = new Trello.Views.BoardShow({ model: board });

      this.swap(boardShowView);
    }
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
