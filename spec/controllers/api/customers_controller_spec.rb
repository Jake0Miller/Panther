require 'rails_helper'

RSpec.describe Api::CustomersController, type: :controller do
  let(:user) { create(:user) }
  let(:customer) { create(:customer, user: user) }

  before do
    allow(controller).to receive(:current_user).and_return(user)
  end

  describe 'GET #index' do
    it 'returns a list of customers with active_matters_count' do
      create(:matter, customer: customer, status: 'active')
      create(:matter, customer: customer, status: 'active')
      create(:matter, customer: customer, status: 'completed')

      get :index
      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body)
      expect(json_response.first['active_matters_count']).to eq(2)
    end
  end

  describe 'GET #show' do
    it 'returns the customer with active_matters_count' do
      create(:matter, customer: customer, status: 'active')
      create(:matter, customer: customer, status: 'completed')

      get :show, params: { id: customer.id }
      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body)
      expect(json_response['active_matters_count']).to eq(1)
    end
  end

  describe 'POST #create' do
    let(:valid_params) { { customer: { name: 'Test Customer', phone: '+1234567890' } } }

    it 'creates a new customer with active_matters_count' do
      expect {
        post :create, params: valid_params
      }.to change(Customer, :count).by(1)

      expect(response).to have_http_status(:created)
      json_response = JSON.parse(response.body)
      expect(json_response['active_matters_count']).to eq(0)
    end
  end

  describe 'PUT #update' do
    let(:update_params) { { id: customer.id, customer: { name: 'Updated Name' } } }

    it 'updates the customer and returns active_matters_count' do
      create(:matter, customer: customer, status: 'active')

      put :update, params: update_params
      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body)
      expect(json_response['active_matters_count']).to eq(1)
    end
  end

  describe 'DELETE #destroy' do
    it 'deletes the customer' do
      customer_id = customer.id # Force creation
      expect {
        delete :destroy, params: { id: customer_id }
      }.to change(Customer, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end
  end
end 