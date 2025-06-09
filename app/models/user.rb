class User < ApplicationRecord
  has_secure_password
  has_many :customers, dependent: :destroy

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :firm_name, presence: true
  validates :password, presence: true, length: { minimum: 8 }, on: :create
  validates :password, confirmation: true, if: -> { password.present? }
end 