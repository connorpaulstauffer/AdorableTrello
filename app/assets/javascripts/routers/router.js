Trello.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "loginOrUserBoardIndex",
    "boards/:id": "boardShow",
    "sign-up": "signUp",
    "log-in": "logIn"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$rootContent = this.$rootEl.find("#content");
    this.$modalContent = this.$rootEl.find("#modal");

    this.checkCurrentUser();
    this.setupNavBar();
  },

  checkCurrentUser: function () {
    var currentUserId = this.$rootEl.data("current-user");
    if (currentUserId == "") {
      Trello.currentUser = null;
    } else {
      Trello.currentUser = new Trello.Models.User({
        id: this.$rootEl.data("current-user")
      });
      Trello.currentUser.fetch();
    }
  },

  signUp: function () {
    var signUpView = new Trello.Views.SignUp();
    this.openModal(signUpView);
  },

  logIn: function (message) {
    var logInView = new Trello.Views.LogIn({
      message: message
    });
    this.openModal(logInView);
  },

  openModal: function (newModal) {
    this.currentModal && this.currentModal.remove();

    newModal.router = this;
    this.currentModal = newModal;
    this.$modalContent.html(newModal.$el);
    this.currentModal.render();
  },

  closeModal: function () {
    this.currentModal && this.currentModal.remove();
    this.currentModal = null;
  },

  setupNavBar: function () {
    this.navBar = new Trello.Views.NavBar({ router: this });
    this.$rootEl.find("#navbar").html(this.navBar.$el);
    this.navBar.render();

  },

  setCurrentUser: function () {
    this.navBar.render();
  },

  loginOrUserBoardIndex: function () {
    this._boards = new Trello.Collections.Boards();

    this._boards.fetch({
      success: function (collection) {
        this.userBoardIndex();
      }.bind(this),

      error: function (collection, response) {
        Backbone.history.navigate("log-in");
        this.currentView && this.currentView.remove();
        this.logIn(response.responseText);
      }.bind(this)
    });
  },

  userBoardIndex: function () {
    var indexView = new Trello.Views.BoardIndex({ collection: this._boards });
    this.swap(indexView);
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
          debugger;
        }
      });
    } else {
      var board = this._boards.getOrFetch(id);
      var boardShowView = new Trello.Views.BoardShow({ model: board });

      this.swap(boardShowView);
    }
  },

  swap: function (newView) {
    this.closeModal();
    this.currentView && this.currentView.remove();
    this.currentView = newView;
    this.$rootContent.html(newView.render().$el);

    return newView;
  }
});
