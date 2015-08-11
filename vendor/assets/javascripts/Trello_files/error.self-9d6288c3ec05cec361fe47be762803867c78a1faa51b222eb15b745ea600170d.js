Trello.Views.Error = Backbone.View.extend({
  initialize: function (options) {
    this.error = options.error;
  },

  className: "alert alert-danger",

  attributes: { "role": "alert" },

  render: function () {
    this.$el.html(this.error);
    return this;
  }
});
