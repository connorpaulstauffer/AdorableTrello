class AddRankToCards < ActiveRecord::Migration
  def change
    add_column :cards, :rank, :integer
    change_column :cards, :rank, :integer, null: false
  end
end
