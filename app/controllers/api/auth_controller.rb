module Api
  class AuthController < ApplicationController
    skip_before_action :authenticate_request, only: [:signup, :login]

    def signup
      user = User.new(user_params)
      if user.save
        token = JwtService.encode(user_id: user.id)
        render json: { token: token, user: user.as_json(except: :password_digest) }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def login
      user = User.find_by(email: params[:email])
      if user&.authenticate(params[:password])
        token = JwtService.encode(user_id: user.id)
        render json: { token: token, user: user.as_json(except: :password_digest) }
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end

    def me
      render json: @current_user.as_json(except: :password_digest)
    end

    private

    def user_params
      params.permit(:email, :password, :password_confirmation, :firm_name)
    end
  end
end 