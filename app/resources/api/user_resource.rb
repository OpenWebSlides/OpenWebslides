# frozen_string_literal: true

module Api
  class UserResource < ApiResource
    ##
    # Properties
    #
    attributes :first_name, :last_name, :email, :password

    has_many :decks
    has_many :collaborations

    ##
    # Filters
    #
    filters :first_name, :last_name, :email

    ##
    # Callbacks
    #
    ##
    # Methods
    #
    def fetchable_fields
      if context[:current_user]
        super - [:password]
      else
        super - %i[email password]
      end
    end

    def self.creatable_fields(context = {})
      super(context) - %i[decks collaborations]
    end

    def self.updatable_fields(context = {})
      super(context) - %i[email decks collaborations]
    end

    def self.sortable_fields(context)
      super(context) - [:password]
    end
  end
end