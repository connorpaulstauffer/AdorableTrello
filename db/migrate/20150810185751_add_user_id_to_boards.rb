class AddUserIdToBoards < ActiveRecord::Migration
  def change
    add_column :boards, :user_id, :integer, index: true
    change_column :boards, :user_id, :integer, null: false
  end
end
