# == Schema Information
#
# Table name: lists
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  board_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class List < ActiveRecord::Base
  validates :name, :board, presence: true

  belongs_to :board
  has_many :cards
end
