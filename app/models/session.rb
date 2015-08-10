# == Schema Information
#
# Table name: sessions
#
#  id            :integer          not null, primary key
#  user_id       :integer          not null
#  session_token :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Session < ActiveRecord::Base
  validates :user_id, :session_token, presence: true
  validates :session_token, uniqueness: true

  belongs_to :user

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end
end
