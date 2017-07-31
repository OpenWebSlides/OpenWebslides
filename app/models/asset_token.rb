# frozen_string_literal: true

class AssetToken < JWT::Auth::Token
  attr_accessor :object

  def valid?
    object && object.reload
    super && !object.nil?
  end

  def payload
    super.merge :obj => object.id
  end

  def lifetime
    OpenWebslides.config.api.asset_url_lifetime.hours
  end

  def self.from_token(token)
    token = super

    token.object = Asset.find_by :id => @decoded_payload['obj'] if @decoded_payload['obj']

    token
  end
end
