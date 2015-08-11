Trello.Views.CardItem = Backbone.View.extend({
  template: JST['cards/card_item'],

  tagName: 'li',

  className: 'card_list_item',

  events: {
    "dblclick": "openEditModal"
  },

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
  },

  attributes: function () {
    return {
      'data-list-id': this.model.get('list_id'),
      'data-id': this.model.id
    };
  },

  openEditModal: function (event) {
    event.preventDefault();
    var editView = new Trello.Views.CardFormDetail({ model: this.model });
    var modal = new Backbone.BootstrapModal({
      title: 'Edit Card',
      content: editView,
      okText: 'Submit',
      focusOk: false,
      cancelText: false,
      enterTriggersOk: true,
      animate: true,
      okCloses: false
    }).open(this.updateCard.bind(this, editView, modal));
    this._editModal = modal;
  },

  updateCard: function (editView) {
    var that = this;
    var formData = editView.$el.serializeJSON();
    this.model.save(formData, {
      success: function () {
        that._editModal.close();
      }
    });
  },

  render: function () {
    var content = this.template({ card: this.model });
    this.$el.html(content);

    return this;
  }
});
