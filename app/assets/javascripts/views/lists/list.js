Trello.Views.List = Backbone.CompositeView.extend({
  template: JST['lists/list_show'],

  tagName: 'li',

  className: 'list-item',

  attributes: function () {
    return { 'data-id': this.model.id };
  },

  initialize: function (options) {
    this.listenTo(this.model.cards(), "add", this.deactivateForm.bind(this));
    this.model.cards().each(this.addCardItem.bind(this));
    this.boardShow = options.boardShow;
  },

  events: {
    "click .card-form-link": "activateForm",
    "click .card-submit": "submitForm",
    "blur .card-name": "deactivateForm"
  },

  activateForm: function (event) {
    event.preventDefault();
    this.$('.card-form-panel').css("display", "none");
    this.$('.input-form').removeAttr("style");
    this.$('.form-control').focus();
  },

  deactivateForm: function () {
    this.$('.input-form').css("display", "none");
    this.$('.card-form-panel').removeAttr("style");
  },

  submitForm: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).parent().serializeJSON();
    formData['card']['list_id'] = this.model.id;
    this.model.cards().create(formData, {
      success: function (model) {
        this.addCardItem(model);
        this.boardShow.bindSortableCards();
      }.bind(this),
      wait: true
    });
  },

  addCardItem: function (card, idx, refresh) {
    var cardItemView = new Trello.Views.CardItem({ model: card });
    this.addSubview('.card-list', cardItemView);
  },

  removeCardItem: function (card) {
    this.removeModelSubview('.card-list', card);
  },

  render: function () {
    var content = this.template({ list: this.model });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  onRender: function () {
    this.boardHeight = $('.board').height();
    this.$('.list-container').css("max-height", this.boardHeight);
    this.$('.card-list').css("max-height", this.boardHeight - 155)
  }
});
