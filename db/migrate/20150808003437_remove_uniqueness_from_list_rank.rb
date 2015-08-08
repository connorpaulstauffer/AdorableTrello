class RemoveUniquenessFromListRank < ActiveRecord::Migration
  def change
    change_column :lists, :rank, :integer, unique: false
  end
end
