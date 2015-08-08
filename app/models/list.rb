# == Schema Information
#
# Table name: lists
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  board_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  rank       :integer          not null
#

class List < ActiveRecord::Base
  validates :name, :board, presence: true
  before_save :ensure_rank

  default_scope { order(:rank) }

  belongs_to :board
  has_many :cards

  private
  def ensure_rank
    unless self.rank
      max = List.maximum(:rank)
      self.rank = max ? max + 1 : 1
    end
  end
end
