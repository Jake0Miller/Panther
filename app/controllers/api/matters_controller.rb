module Api
  class MattersController < ApplicationController
    before_action :set_customer
    before_action :set_matter, only: [:show, :update, :destroy]

    def index
      @matters = @customer.matters
      render json: @matters
    end

    def show
      render json: @matter
    end

    def create
      @matter = @customer.matters.build(matter_params)

      if @matter.save
        render json: @matter, status: :created
      else
        render json: { errors: @matter.errors }, status: :unprocessable_entity
      end
    end

    def update
      if @matter.update(matter_params)
        render json: @matter
      else
        render json: { errors: @matter.errors }, status: :unprocessable_entity
      end
    end

    def destroy
      @matter.destroy
      head :no_content
    end

    private

    def set_customer
      @customer = Customer.find(params[:customer_id])
      unless @customer.user_id == current_user.id
        render json: { error: 'Unauthorized' }, status: :unauthorized
        return
      end
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Customer not found' }, status: :not_found
    end

    def set_matter
      @matter = @customer.matters.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Matter not found' }, status: :not_found
    end

    def matter_params
      params.require(:matter).permit(:title, :description, :status)
    end
  end
end 