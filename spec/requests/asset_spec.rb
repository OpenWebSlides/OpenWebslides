# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Assets API', :type => :request do
  let(:asset) { create :asset, :with_deck }
  let(:deck) { asset.deck }
  let(:user) { deck.owner }

  let(:asset_file) { Rails.root.join 'spec', 'support', 'asset.png' }

  describe 'POST /' do
    before do
      add_auth_header
      @headers['Content-Type'] = 'image/png'
      @headers['Content-Disposition'] = 'attachment; filename="asset.png"'

      @body = fixture_file_upload(asset_file)
    end

    it 'rejects without Content-Disposition' do
      post deck_assets_path(:deck_id => deck.id), :params => @body, :headers => headers.except('Content-Disposition')

      expect(response.status).to eq 400
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'rejects filename already taken' do
      post deck_assets_path(:deck_id => deck.id), :params => @body, :headers => headers.merge('Content-Disposition' => "attachment; filename=\"#{asset.filename}\"")

      expect(response.status).to eq 422
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
      expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
    end

    it 'rejects media types not allowed' do
      post deck_assets_path(:deck_id => deck.id), :params => @body, :headers => headers.merge('Content-Type' => 'application/octet-stream')

      expect(response.status).to eq 415
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'returns successful' do
      post deck_assets_path(:deck_id => deck.id), :params => @body, :headers => headers

      expect(response.status).to eq 201
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

      attributes = (JSON.parse response.body)['data']['attributes']
      expect(attributes['filename']).to eq 'asset.png'
    end
  end

  describe 'GET /:id' do
    before do
      add_auth_header
      add_accept_header
    end

    it 'rejects an invalid id' do
      get asset_path(:id => 0), :headers => headers

      expect(response.status).to eq 404
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'returns successful' do
      get asset_path(:id => asset.id), :headers => headers

      expect(response.status).to eq 200
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'has a raw link' do
      get asset_path(:id => asset.id), :headers => headers

      links = (JSON.parse response.body)['data']['links']
      expect(links['raw']).not_to be_nil
    end
  end

  describe 'DELETE /:id' do
    before do
      add_auth_header
    end

    it 'rejects non-existant assets' do
      delete asset_path(:id => '0'), :headers => headers

      asset.reload
      expect(asset).not_to be_destroyed

      expect(response.status).to eq 404
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'deletes an asset' do
      id = asset.id
      delete asset_path(:id => asset.id), :headers => headers

      expect(-> { Asset.find id }).to raise_error ActiveRecord::RecordNotFound

      expect(response.status).to eq 204
    end
  end

  describe 'GET /:id/raw' do
    before do
      @token = AssetToken.new
      @token.subject = user
      @token.object = asset

      # Stub out Repository::Asset::Find
      mock_method Repository::Asset::Find, :execute do
        Rails.root.join 'spec', 'support', 'asset.png'
      end
    end

    it 'rejects no token' do
      get asset_raw_path(:asset_id => asset.id)

      expect(response.status).to eq 401
    end

    it 'rejects invalid token' do
      get asset_raw_path :asset_id => asset.id, :token => 'foo'

      expect(response.status).to eq 401
    end

    it 'returns successful' do
      get asset_raw_path :asset_id => asset.id, :token => @token.to_jwt

      expect(response.status).to eq 200
    end
  end
end
