Trello.Modal = Backbone.CompositeView.extend({
  className: "modal-container",

  handleKeyPress: function (event) {
    if (event.which == 27) { this.closeModal() }
  },

  handleClick: function (event) {
    if ($(event.target).hasClass("modal-container")) { this.closeModal() }
  },

  closeModal: function () {
    this.router.closeModal();
  },

  bindListeners: function () {
    $( document ).on("keydown.modal", this.handleKeyPress.bind(this))
    $("#modal").on("click.modal", this.handleClick.bind(this));
  },

  render: function () {
    var content = this.template({ errors: this.errors });
    this.$el.html(content);
    this.bindListeners();

    return this;
  },

  remove: function () {
    $( document ).off("keydown.modal");
    $("#modal").off("click.modal");
    Backbone.View.prototype.remove.call(this);
  }
});
