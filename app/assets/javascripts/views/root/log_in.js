Trello.Views.LogIn = Backbone.CompositeView.extend({
  tagName: 'form',

  template: JST['root/log_in'],

  initialize: function (options) {
    this.message = options.message;
  },

  addAlert: function () {
    this.$(".alerts").empty();
    // if (this.alertView) { this.removeSubview(".alerts", this.alertView) };
    if (this.message) {
      this.alertView = new Trello.Views.Alert({ message: this.message })
      this.addSubview(".alerts", this.alertView);
    }
  },

  addErrors: function (errors) {
    this.removeErrors();

    errors.forEach(function (error) {
      var errorView = new Trello.Views.Error({ error: error });
      this.addSubview('.errors', errorView);
    }.bind(this));
  },

  removeErrors: function () {
    this.eachSubview(function (subview, selector) {
      this.removeSubview(selector, subview);
    }.bind(this));
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.addAlert();

    return this;
  }
});
