# == Schema Information
#
# Table name: cards
#
#  id          :integer          not null, primary key
#  name        :string           not null
#  description :text
#  list_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  image_url   :string
#

class Card < ActiveRecord::Base
  validates :name, :list, presence: true

  belongs_to :list
end
