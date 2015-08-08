class AddRankToLists < ActiveRecord::Migration
  def change
    add_column :lists, :rank, :integer, unique: true
    change_column :lists, :rank, :integer, null: false
  end
end
