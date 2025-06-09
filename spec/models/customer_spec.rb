require 'rails_helper'

RSpec.describe Customer, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:phone) }

    it "is invalid with an incorrect phone format" do
      customer = build(:customer, phone: "invalid")
      expect(customer).not_to be_valid
      expect(customer.errors[:phone]).to be_present
    end

    it "is valid with a correct phone format" do
      customer = build(:customer, phone: "+1234567890")
      expect(customer).to be_valid
    end
  end

  describe 'associations' do
    it { should belong_to(:user) }
    it { should have_many(:matters).dependent(:destroy) }
    it { should have_many(:active_matters) }
  end

  describe '#active_matters_count' do
    let(:user) { create(:user) }
    let(:customer) { create(:customer, user: user) }

    it 'returns 0 when there are no matters' do
      expect(customer.active_matters_count).to eq(0)
    end

    it 'returns 0 when there are no active matters' do
      create(:matter, customer: customer, status: 'completed')
      create(:matter, customer: customer, status: 'archived')
      expect(customer.active_matters_count).to eq(0)
    end

    it 'returns the correct count of active matters' do
      create(:matter, customer: customer, status: 'active')
      create(:matter, customer: customer, status: 'active')
      create(:matter, customer: customer, status: 'completed')
      expect(customer.active_matters_count).to eq(2)
    end
  end
end 