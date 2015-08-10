class Session < ActiveRecord::Base
  validates :user_id, :session_token, presence: true
  validates :session_token, uniqueness: true

  belongs_to :user

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end
end
