# frozen_string_literal: true

FactoryGirl.define do
  factory :notification do
    predicate { Notification.predicates.keys.sample }
    subject { build :user }
    deck { build :deck }
    item { build :conversation }
  end
end
