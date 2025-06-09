class Customer < ApplicationRecord
  belongs_to :user
  has_many :matters, dependent: :destroy
  has_many :active_matters, -> { where(status: 'active') }, class_name: 'Matter'

  validates :name, presence: true
  validates :phone, presence: true, format: { with: /\A\+?\d{10,15}\z/, message: "must be a valid phone number" }

  def active_matters_count
    active_matters.count
  end
end 