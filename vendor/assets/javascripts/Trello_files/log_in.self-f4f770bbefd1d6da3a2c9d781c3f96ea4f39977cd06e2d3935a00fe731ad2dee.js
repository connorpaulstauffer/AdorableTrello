Trello.Views.LogIn = Backbone.CompositeView.extend({
  tagName: 'form',

  template: JST['root/log_in'],

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
    var content = this.template({ errors: this.errors });
    this.$el.html(content);

    return this;
  }
});
