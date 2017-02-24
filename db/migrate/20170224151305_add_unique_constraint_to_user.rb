# frozen_string_literal: true
class AddUniqueConstraintToUser < ActiveRecord::Migration[5.0]
  def change
    add_index :users, :email, :unique => true
  end
end
