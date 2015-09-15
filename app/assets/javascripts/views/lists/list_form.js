Trello.Views.ListForm = Backbone.View.extend({
  template: JST['lists/list_form'],

  tagName: 'li',

  className: 'list-item',

  events: {
    "click .list-form-link": "activateForm",
    "click .list-submit": "submitForm",
    "blur .list-name": "deactivateForm"
  },

  initialize: function (options) {
    this.boardShow = options.boardShow;
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
    formData.list.board_id = this.model.id;
    this.collection.create(formData, {
      success: function () {
        this.boardShow.bindSortableCards();
      }.bind(this),

      wait: true
    });
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});
