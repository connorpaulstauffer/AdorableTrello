Trello.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/board_show'],

  initialize: function () {
    this.listenTo(this.model.lists(), "add", this.addListItem.bind(this));
    this.listenTo(this.model, "sync", this.render);
    this.model.lists().each(this.addListItem.bind(this));
  },

  addListItem: function (list) {
    var listView = new Trello.Views.List({ model: list });
    this.addSubview('#lists', listView);
  },

  updateListPlacement: function (event, ui) {
    var view = this;
    this.$('.sortable-lists').children().each(function (idx, listItem) {
      var list = view.model.lists().getOrFetch($(listItem).data("id"));
      list.save({ rank: idx + 1 });
    });
  },

  updateCardPlacement: function (event, ui) {
    var view = this;
    this.$('.sortable-lists').children().each(function (listIdx, listItem) {
      var thisList = view.model.lists().getOrFetch($(listItem).data("id"));

      $(listItem).find('.sortable-cards').children().each(function (cardIdx, cardItem) {
        var originalList = view.model.lists().getOrFetch($(cardItem).data("list-id"));
        var card = originalList.cards().getOrFetch($(cardItem).data("id"));

        card.save({ rank: cardIdx + 1, list_id: $(listItem).data("id")}, {
          patch: true
        });
      });
    });
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

    this.$('.sortable-lists').sortable({
      handle: '.panel-heading',
      items: '.list-item',
      update: this.updateListPlacement.bind(this),
      start: this.addDragged.bind(this),
      stop: this.removeDragged.bind(this)
    });

    this.bindSortableCards();
    this.onRender();

    return this;
  }
});
