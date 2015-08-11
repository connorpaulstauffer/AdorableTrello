Trello.Views.Root = Backbone.View.extend({
    el: 'body',

    events: {
        'click #sign-up': 'openSignUpModal',
        'click #log-in': 'openLogInModal'
    },

    openSignUpModal: function (event) {
      event.preventDefault();

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
    },

    openLogInModal: function () {
      event.preventDefault();

      var logInView = new Trello.Views.LogIn();
      var modal = new Backbone.BootstrapModal({
        content: logInView,
        title: 'Log In',
        okText: 'Log In',
        focusOk: false,
        cancelText: false,
        enterTriggersOk: true,
        animate: true,
        okCloses: false
      }).open(this.logInUser.bind(this, logInView));
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
    }
});
