Trello.Views.Welcome = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.message = options.message;
    this.navBar = options.navBar;
    this.promptLogin();
  },

  promptLogin: function () {
    this.navBar.openLogInModal(null, this.message);
  },

  render: function () {
    // this.$el.html("Please sign in");
    return this;
  }
});
