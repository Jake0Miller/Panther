class ApplicationController < ActionController::API
  before_action :authenticate_request

  private

  def authenticate_request
    header = request.headers['Authorization']
    token = header.split(' ').last if header
    decoded = JwtService.decode(token)
    @current_user = User.find_by(id: decoded['user_id']) if decoded
  rescue JWT::DecodeError, ActiveRecord::RecordNotFound
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end

  def current_user
    @current_user
  end
end
