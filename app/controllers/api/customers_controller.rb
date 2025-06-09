module Api
  class CustomersController < ApplicationController
    before_action :set_customer, only: [:show, :update, :destroy]

    def index
      @customers = current_user.customers
      render json: @customers.as_json(methods: [:active_matters_count])
    end

    def show
      render json: @customer.as_json(methods: [:active_matters_count])
    end

    def create
      @customer = current_user.customers.build(customer_params)

      if @customer.save
        render json: @customer.as_json(methods: [:active_matters_count]), status: :created
      else
        render json: { errors: @customer.errors }, status: :unprocessable_entity
      end
    end

    def update
      if @customer.update(customer_params)
        render json: @customer.as_json(methods: [:active_matters_count])
      else
        render json: { errors: @customer.errors }, status: :unprocessable_entity
      end
    end

    def destroy
      @customer.destroy
      head :no_content
    end

    private

    def set_customer
      @customer = current_user.customers.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Customer not found' }, status: :not_found
    end

    def customer_params
      params.require(:customer).permit(:name, :phone, :email)
    end
  end
end 