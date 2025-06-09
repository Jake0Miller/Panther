require 'rails_helper'

RSpec.describe 'Auth', type: :request do
  describe 'POST /api/auth/signup' do
    it 'creates a new user' do
      expect {
        post '/api/auth/signup', params: { email: 'test@example.com', firm_name: 'Test Firm', password: 'password123', password_confirmation: 'password123' }
      }.to change(User, :count).by(1)
      expect(response).to have_http_status(:created)
    end
  end

  describe 'POST /api/auth/login' do
    let(:user) { create(:user, email: 'test@example.com', password: 'password123') }

    it 'returns a JWT token' do
      post '/api/auth/login', params: { email: user.email, password: 'password123' }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to include('token')
    end
  end

  describe 'GET /api/auth/me' do
    let(:user) { create(:user) }
    let(:token) { JWT.encode({ user_id: user.id }, Rails.application.credentials.secret_key_base) }

    it 'returns user details' do
      get '/api/auth/me', headers: { 'Authorization' => "Bearer #{token}" }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to include('email' => user.email)
    end
  end
end 