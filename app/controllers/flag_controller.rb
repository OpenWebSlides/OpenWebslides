# frozen_string_literal: true

class FlagController < ApplicationController
  # Authentication
  before_action :authenticate_user
  after_action :renew_token

  # Authorization
  after_action :verify_authorized

  ##
  # Resource
  #

  # POST /flag
  def create
    @annotation = params[:comment_id] ? Comment.find(params[:comment_id]) : Conversation.find(params[:conversation_id])

    authorize @annotation, :flag?

    if @annotation.flag
      head :created, :content_type => JSONAPI::MEDIA_TYPE
    else
      jsonapi_render_errors :json => @annotation, :status => :unprocessable_entity
    end
  end
end
