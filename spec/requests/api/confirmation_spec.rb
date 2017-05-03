# frozen_string_literal: true

require 'rails_helper'

include RequestsHelper

RSpec.describe 'Confirmation API', :type => :request do
  let(:user) { create :user }

  def request_body(token)
    {
      :data => {
        :type => 'confirmations',
        :attributes => {
          :confirmationToken => token
        }
      }
    }.to_json
  end

  it 'rejects invalid confirmation tokens' do
    post_unauthenticated '/api/confirmation', request_body('foo')

    expect(response.status).to eq 400
  end

  it 'confirm a user' do
    expect(user.confirmed?).not_to be true

    post_unauthenticated '/api/confirmation', request_body(user.confirmation_token)

    expect(response.status).to eq 201

    user.reload
    expect(user.confirmed?).to be true
  end
end
