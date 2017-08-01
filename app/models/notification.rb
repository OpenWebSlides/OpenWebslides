# frozen_string_literal: true

class Notification < ApplicationRecord
  ##
  # Properties
  #
  enum :event_type => %i[deck_created deck_updated]
  validates :event_type, :presence => true

  ##
  # Associations
  #
  belongs_to :user, :required => true
  belongs_to :deck, :required => true

  ##
  # Callbacks
  #
  ##
  # Methods
  #
  ##
  # Overrides
  #
  ##
  # Helpers and callback methods
  #
end
