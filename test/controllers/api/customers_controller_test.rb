require 'test_helper'

module Api
  class CustomersControllerTest < ActionDispatch::IntegrationTest
    setup do
      @user = users(:one)
      @customer = customers(:one)
      @token = generate_token(@user)
    end

    test "should get index" do
      get api_customers_url, headers: { 'Authorization' => "Bearer #{@token}" }
      assert_response :success
    end

    test "should create customer" do
      assert_difference('Customer.count') do
        post api_customers_url, params: {
          customer: { name: 'New Customer', phone: '+1234567890' }
        }, headers: { 'Authorization' => "Bearer #{@token}" }
      end

      assert_response :created
    end

    test "should show customer" do
      get api_customer_url(@customer), headers: { 'Authorization' => "Bearer #{@token}" }
      assert_response :success
    end

    test "should update customer" do
      patch api_customer_url(@customer), params: {
        customer: { name: 'Updated Customer' }
      }, headers: { 'Authorization' => "Bearer #{@token}" }
      assert_response :success
    end

    test "should destroy customer" do
      assert_difference('Customer.count', -1) do
        delete api_customer_url(@customer), headers: { 'Authorization' => "Bearer #{@token}" }
      end

      assert_response :no_content
    end

    private

    def generate_token(user)
      JWT.encode({ user_id: user.id }, Rails.application.credentials.secret_key_base)
    end
  end
end 