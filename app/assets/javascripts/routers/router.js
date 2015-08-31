Trello.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "welcomeOrUserBoardIndex",
    "boards/:id": "boardShow"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    // this.$rootView = new Trello.Views.Root();

    this.$rootEl = options.$rootEl;
    if (this.$rootEl.data("current-user") == "") {
      currentUser = null;
    } else {
      currentUser = new Trello.Models.User({
        id: this.$rootEl.data("current-user")
      });
      currentUser.fetch();
    }
    this.$rootContent = this.$rootEl.find("#content");
    this.$navBar = this.$rootEl.find("#navbar");
    this.setupNavBar();
  },

  setupNavBar: function () {
    this.navBar = new Trello.Views.NavBar({
      router: this
    });

    this.$navBar.html(this.navBar.$el);
    this.navBar.render();
  },

  welcomeOrUserBoardIndex: function () {
    this._boards = new Trello.Collections.Boards();
    var that = this;

    this._boards.fetch({
      success: function (collection) {
        that.userBoardIndex();
      },

      error: function (collection, response) {
        that.welcome(response.responseText);
      }
    });
  },

  userBoardIndex: function () {
    var indexView = new Trello.Views.BoardIndex({ collection: this._boards });
    this.swap(indexView);
  },

  welcome: function (message) {
    var welcomeView = new Trello.Views.Welcome({
      message: message,
      navBar: this.navBar
    });
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
    this.$rootContent.html(newView.render().$el);

    return newView;
  }
});
