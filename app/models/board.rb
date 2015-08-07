# == Schema Information
#
# Table name: boards
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Board < ActiveRecord::Base
  validates :name, presence: true

  has_many :lists
end
