Trello.Views.SignUp = Backbone.CompositeView.extend({
  tagName: 'form',

  template: JST['root/sign_up'],

  events: {
    "blur #user-password": "validatePasswordLength",
    "keyup #user-password": "validatePasswordLength",
    "blur #user-password-confirmation": "validatePasswordMatch",
    "keyup #user-password-confirmation": "validatePasswordMatch"
  },

  addErrors: function (errors) {
    this.removeErrors();

    errors.forEach(function (error) {
      var errorView = new Trello.Views.Error({ error: error });
      this.addSubview('.errors', errorView);
    }.bind(this));
  },

  // Clean this up. Calling removeSubview was interfering with the loop
  // Maybe try reversing it first
  removeErrors: function () {
    this.eachSubview(function (subview, selector) {
      subview.remove();
    }.bind(this));
    this._subviews = {};
  },

  validatePasswordLength: function (event) {
    var $passwordField = $(event.currentTarget);

    if ($passwordField.parent().hasClass("has-error")) {
      if ($passwordField.val().length >= 6) {
        this.removeInputError($passwordField);
        this.addInputConfirmation($passwordField);
        this.$('#user-password-confirmation').removeAttr("readonly");
      }
    } else if (event.type === "keyup") {
      return;
    } else if ($passwordField.val().length < 6) {
      this.removeInputConfirmation($passwordField);
      this.addInputError.call(this, $passwordField, "Password must be at least 6 characters");
      this.$('#user-password-confirmation').attr("readonly", "readonly");
    } else {
      this.addInputConfirmation($passwordField);
      this.$('#user-password-confirmation').removeAttr("readonly");
    }
  },

  validatePasswordMatch: function (event) {
    var $passwordConfirm = $(event.currentTarget);
    var $passwordField = this.$('#user-password');

    if ($passwordConfirm.attr("readonly") === "readonly") {
      return;
    } else if ($passwordConfirm.parent().hasClass("has-error")) {
      if ($passwordConfirm.val() === $passwordField.val()) {
        this.removeInputError($passwordConfirm);
        this.addInputConfirmation($passwordConfirm);
      }
    } else if (event.type === "keyup") {
      return;
    } else if ($passwordConfirm.val() === $passwordField.val()) {
      this.removeInputError($passwordConfirm);
      this.addInputConfirmation($passwordConfirm);
    } else {
      this.removeInputConfirmation($passwordConfirm);
      this.addInputError($passwordConfirm, "Passwords do not match");
    }

  },

  addInputError: function (field, message) {
    if (field.parent().hasClass("has-error")) { return; }
    field.parent().addClass("has-error has-feedback");
    field.parent().append($('<span class="error glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>'));
    field.parent().append($('<span id="input-error" class="error sr-only">(error)</span>'));
    field.parent().append($('<label class="error control-label" for="input-error">' + message + '</label>'));
    field.attr("aria-describedby", "input-error");
  },

  addInputConfirmation: function (field) {
    if (field.parent().hasClass("has-success")) { return; }
    field.parent().addClass("has-success has-feedback");
    field.parent().append($('<span class="success glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>'));
    field.parent().append($('<span id="input-success" class="success sr-only">(success)</span>'));
    field.attr("aria-describedby", "input-success");
  },

  removeInputError: function (field) {
    field.parent().removeClass("has-error");
    field.parent().find(".error").remove();
  },

  removeInputConfirmation: function (field) {
    field.parent().removeClass("has-success");
    field.parent().find(".success").remove();
  },

  render: function () {
    var content = this.template({ errors: this.errors });
    this.$el.html(content);

    return this;
  }
});
