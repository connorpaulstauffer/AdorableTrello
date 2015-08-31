Trello.Views.NavBar = Backbone.CompositeView.extend({
  template: JST["shared/navbar"],

  events: {
    'click .navbar-brand': "goToIndex",
    'click #sign-up': 'openSignUpModal',
    'click #log-in': 'openLogInModal',
    'click #sign-out': 'signOut'
  },

  initialize: function (options) {
    this.router = options.router;
  },

  goToIndex: function () {
    Backbone.history.navigate("#", { trigger: true });
  },

  openSignUpModal: function (event) {
    this.activeModalView && this.activeModalView.remove();

    var signUpView = new Trello.Views.SignUp();
    var modal = new Backbone.BootstrapModal({
      content: signUpView,
      title: 'Sign Up',
      okText: 'Sign Up',
      focusOk: false,
      cancelText: false,
      enterTriggersOk: true,
      animate: true,
      okCloses: false
    }).open(this.signUpUser.bind(this, signUpView));

    this.activeModalView = signUpView;
    this.activeModal = modal;
  },

  openLogInModal: function (event, message) {
    this.activeModalView && this.activeModalView.remove();

    var logInView = new Trello.Views.LogIn({
      message: message
    });
    var modal = new Backbone.BootstrapModal({
      content: logInView,
      title: 'Log In',
      okText: 'Log In',
      focusOk: false,
      cancelText: false,
      enterTriggersOk: true,
      animate: true,
      okCloses: false,
      offerSignUp: true,
      offerGuestLogin: true
    }).open(this.logInUser.bind(this, logInView));
    this.activeModal = modal;
    this.activeModalView = logInView;

    this.activeModal.bind("shown", function () {
      this.addGuestLogin();
      this.addSignUpOption();
    }.bind(this));
  },

  signUpUser: function (signUpView) {
    var userData = signUpView.$el.serializeJSON();

    if (userData.user['password'] !== userData.user['password-confirmation']) {
      var errors = ["Passwords do not match"];
      signUpView.addErrors(errors);
    } else {
      var newUser = new Trello.Models.User();
      delete userData['user']['password-confirmation'];

      newUser.save(userData, {
        success: function (model, resp) {
          window.location.reload(true);
        },

        error: function (model, resp) {
          signUpView.addErrors(resp.responseJSON);
        }
      });
    }
  },

  logInUser: function (logInView) {
    var userData = logInView.$el.serializeJSON();
    var newSession = new Trello.Models.Session();

    newSession.save(userData, {
      success: function (model, resp) {
        window.location.reload(true);
      },

      error: function (model, resp) {
        logInView.addErrors(resp.responseJSON);
      }
    });
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
    var dummySession = new Trello.Models.Session({ id: 0 });
    dummySession.destroy({
      success: function () {
        currentUser = null;
        this.render();
        this.goToIndex();
      }.bind(this)
    })
  },

  render: function () {
    var content = this.template({
      currentUser: currentUser
    });
    this.$el.html(content);

    return this;
  }
});
