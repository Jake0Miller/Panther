class Matter < ApplicationRecord
  belongs_to :customer

  validates :title, presence: true
  validates :description, presence: true
  validates :status, presence: true, inclusion: { in: %w[active completed archived] }

  scope :active, -> { where(status: 'active') }
end 