# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  validates :email, :password_digest, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password

  has_many :sessions, dependent: :destroy
  has_many :boards

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    user && user.is_password?(password) ? user : nil
  end

  def self.find_by_session_token(session_token)
    return nil unless session_token
    session = Session.find_by_session_token(session_token)
    session ? session.user : nil
  end

  def is_password?(password)
    self.password_digest.is_password?(password)
  end

  def password_digest
    BCrypt::Password.new(super)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end
end
