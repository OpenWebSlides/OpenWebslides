# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::DeckResource, :type => :resource do
  let(:deck) { create :deck }
  let(:context) { {} }

  subject { described_class.new deck, context }

  it { is_expected.to have_primary_key :id }

  it { is_expected.to have_attribute :name }
  it { is_expected.to have_attribute :state }

  it { is_expected.to have_one :owner }

  it { is_expected.to have_many(:contributors).with_class_name 'User' }
  it { is_expected.to have_many(:tags).with_class_name 'Tag' }

  describe 'fields' do
    it 'should have a valid set of creatable fields' do
      expect(described_class.creatable_fields).to match_array %i[name state owner]
    end

    it 'should have a valid set of updatable fields' do
      expect(described_class.updatable_fields).to match_array %i[name state owner tags]
    end
  end

  it 'should have a valid set of fetchable fields' do
    expect(subject.fetchable_fields).to match_array %i[id name state owner contributors tags]
  end
end
