Trello.Views.Alert = Backbone.View.extend({
  initialize: function (options) {
    this.message = options.message;
  },

  className: "alert alert-success",

  attributes: { "role": "success" },

  render: function () {
    this.$el.html(this.message);
    return this;
  }
});
