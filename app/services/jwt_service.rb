class JwtService
  HMAC_SECRET = Rails.application.credentials.secret_key_base

  def self.encode(payload)
    JWT.encode(payload, HMAC_SECRET)
  end

  def self.decode(token)
    JWT.decode(token, HMAC_SECRET).first
  rescue JWT::DecodeError
    nil
  end
end 