Trello.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/board_show'],

  className: "board-container",

  initialize: function () {
    this.listenTo(this.model.lists(), "add", this.addListItem.bind(this));
    this.listenTo(this.model, "sync", this.render);
    this.model.lists().each(this.addListItem.bind(this));
    this.addListForm();
  },

  addListItem: function (list) {
    this.removeSubview("#lists", this.listForm);
    var listView = new Trello.Views.List({
      model: list,
      boardShow: this
    });
    this.addSubview('#lists', listView);
    this.addListForm();
  },

  addListForm: function () {
    this.listForm = new Trello.Views.ListForm({
      collection: this.model.lists(),
      model: this.model
    });
    this.addSubview('#lists', this.listForm);
  },

  updateListPlacement: function (event, ui) {
    this.$('.sortable-lists').children().each(function (idx, listItem) {
      var id = $(listItem).data("id");
      if (id) {
        var list = this.model.lists().get(id);
        list.save({ rank: idx + 1 });
      }
    }.bind(this));
  },

  updateCardPlacement: function (event, ui) {
    this.$('.sortable-lists').children().each(function (listIdx, listItem) {
      $(listItem).find('.sortable-cards').children().each(function (cardIdx, cardItem) {
        var listId = $(cardItem).data("list-id");
        if (listId) {
          var originalList = this.model.lists().get(listId);
          var card = originalList.cards().get($(cardItem).data("id"));

          card.save({ rank: cardIdx + 1, list_id: $(listItem).data("id")}, {
            patch: true
          });
        }
      }.bind(this));
    }.bind(this));
  },

  bindSortableCards: function () {
    this.$('.sortable-cards').sortable( {
      items: '.card_list_item',
      connectWith: '.sortable-cards',
      update: this.updateCardPlacement.bind(this),
      start: this.addDragged.bind(this),
      stop: this.removeDragged.bind(this)
    });
  },

  bindSortableLists: function () {
    this.$('.sortable-lists').sortable({
      handle: '.panel-heading',
      items: '.list-item',
      update: this.updateListPlacement.bind(this),
      start: this.addDragged.bind(this),
      stop: this.removeDragged.bind(this)
    });
  },

  addDragged: function (event, ui) {
    ui.item.find('> div').addClass("dragged");
  },

  removeDragged: function (event, ui) {
    ui.item.find('> div').removeClass("dragged");
  },

  render: function () {
    var content = this.template({ board: this.model });
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();

    return this;
  },

  onRender: function () {
    this.bindSortableLists();
    this.bindSortableCards();
    Backbone.CompositeView.prototype.onRender.call(this);
  }
});
