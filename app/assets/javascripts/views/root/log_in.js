Trello.Views.LogIn = Backbone.CompositeView.extend({
  tagName: 'form',

  template: JST['root/log_in'],

  initialize: function (options) {
    this.message = options.message;
  },

  addAlert: function () {
    if (this.message) {
      var alertView = new Trello.Views.Alert({ message: this.message })
      this.addSubview(".alerts", alertView);
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
