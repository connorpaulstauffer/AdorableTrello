Trello.Views.LogIn = Trello.Modal.extend({
  initialize: function (options) {
    this.message = options.message;
  },

  template: JST["root/log_in"],

  events: {
    "click #log-in-button": "logIn",
    "click #guest-log-in-button": "loginAsGuest"
  },

  addAlert: function () {
    this.$(".alerts").empty();
    if (this.alertView) { this.removeSubview(".alerts", this.alertView) };
    if (this.message) {
      this.alertView = new Trello.Views.Alert({ message: this.message })
      this.addSubview(".alerts", this.alertView);
    }
  },

  logIn: function (event) {
    event && event.preventDefault();

    var userData = this.$("#log-in-form").serializeJSON();
    $.ajax({
      url: "/api/sessions",
      type: "POST",
      data: userData,
      dataType: "json",
      success: function (model, response) {
        Trello.currentUser = new Trello.Models.User(model)
        this.router.setCurrentUser();
        Backbone.history.navigate("", { trigger: true });
      }.bind(this),

      error: function () {
        debugger
      }
    })
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
          this.logIn();
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

  render: function () {
    Trello.Modal.prototype.render.call(this);
    this.addAlert();
  }
});
