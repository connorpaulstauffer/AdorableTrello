Trello.Views.NavBar = Backbone.CompositeView.extend({
  template: JST["shared/navbar"],

  events: {
    'click .navbar-brand': "goToIndex",
    'click #sign-out': 'signOut'
  },

  initialize: function (options) {
    this.router = options.router;
  },

  goToIndex: function () {
    Backbone.history.navigate("#", { trigger: true });
  },

  addSignUpOption: function () {
    $("#sign-up-option-link").on("click", this.switchToSignUp.bind(this));
  },

  addGuestLogin: function () {
    $("#guest-login").on("click", this.loginAsGuest.bind(this));
  },

  switchToSignUp: function () {
    this.activeModal.close();
    this.openSignUpModal();
  },

  loginAsGuest: function () {
    var code = "";
    for (var i = 0; i < 10; i++) {
      code += Math.floor(Math.random() * 10)
    }
    var email = code + "@adorabletrello.com";
    var password = code;

    setTimeout(function () {
      this.animateInput("#user-email", email, function () {
        this.animateInput("#user-password", password, function () {
          $(".ok").trigger("click");
        }.bind(this));
      }.bind(this));
    }.bind(this), 0);
  },

  animateInput: function (selector, text, success) {
    var _index = 0;
    var textInterval = setInterval(function () {
      var $el = $(selector);
      var currentVal = $el.val();
      _index++;
      $el.val(text.substr(0, _index));
      if (_index >= text.length) {
        clearInterval(textInterval);
        success();
      }
    }.bind(this), 50);
  },

  signOut: function (event) {
    event.preventDefault();

    $.ajax({
      url: "/api/sessions/sign-out",
      method: "DELETE",
      dataType: "json",

      success: function () {
        Trello.currentUser = null;
        this.render();
        Backbone.history.navigate("#");
        this.router.currentView && this.router.currentView.remove();
        this.router.logIn();
      }.bind(this),

      error: function () {
        debugger;
      }
    });
  },

  render: function () {
    var content = this.template({
      currentUser: Trello.currentUser
    });
    this.$el.html(content);

    return this;
  }
});
