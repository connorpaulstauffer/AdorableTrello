Trello.Views.BoardForm = Backbone.View.extend({
  template: JST['boards/board_form'],

  tagName: 'a',

  attributes: { 'href': '#'},

  className: 'board-list-item',

  events: {
    "click .board-form-link": "activateForm",
    "click .board-submit": "submitForm",
    "blur .board-name": "deactivateForm"
  },

  activateForm: function (event) {
    event.preventDefault();
    this.$('.input-link').css("display", "none");
    this.$('.input-form').removeAttr("style");
    this.$('.form-control').focus();
  },

  deactivateForm: function () {
    this.$('.input-form').css("display", "none");
    this.$('.input-link').removeAttr("style");
  },

  submitForm: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).parent().serializeJSON();
    this.collection.create(formData, { wait: true });
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});
