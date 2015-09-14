Trello.Views.SignUp = Trello.Modal.extend({
  template: JST["root/sign_up"],

  events: {
    "click #sign-up-button": "signUp"
  },

  signUp: function (event) {
    event.preventDefault();

    var userData = this.$("#sign-up-form").serializeJSON();
    $.ajax({
      url: "/api/users",
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
  }
});
