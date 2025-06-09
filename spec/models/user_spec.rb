require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email) }
    it { should validate_presence_of(:firm_name) }
    it { should validate_presence_of(:password).on(:create) }
    it { should validate_length_of(:password).is_at_least(8).on(:create) }
  end

  describe 'associations' do
    it { should have_many(:customers).dependent(:destroy) }
  end
end 