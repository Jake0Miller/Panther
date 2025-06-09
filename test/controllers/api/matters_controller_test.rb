require 'test_helper'

module Api
  class MattersControllerTest < ActionDispatch::IntegrationTest
    setup do
      @user = users(:one)
      @customer = customers(:one)
      @matter = matters(:one)
      @token = generate_token(@user)
    end

    test "should get index" do
      get api_customer_matters_url(@customer), headers: { 'Authorization' => "Bearer #{@token}" }
      assert_response :success
    end

    test "should create matter" do
      assert_difference('Matter.count') do
        post api_customer_matters_url(@customer), params: {
          matter: { title: 'New Matter', description: 'New Description' }
        }, headers: { 'Authorization' => "Bearer #{@token}" }
      end

      assert_response :created
    end

    test "should show matter" do
      get api_customer_matter_url(@customer, @matter), headers: { 'Authorization' => "Bearer #{@token}" }
      assert_response :success
    end

    test "should update matter" do
      patch api_customer_matter_url(@customer, @matter), params: {
        matter: { title: 'Updated Matter' }
      }, headers: { 'Authorization' => "Bearer #{@token}" }
      assert_response :success
    end

    test "should destroy matter" do
      assert_difference('Matter.count', -1) do
        delete api_customer_matter_url(@customer, @matter), headers: { 'Authorization' => "Bearer #{@token}" }
      end

      assert_response :no_content
    end

    private

    def generate_token(user)
      JWT.encode({ user_id: user.id }, Rails.application.credentials.secret_key_base)
    end
  end
end 