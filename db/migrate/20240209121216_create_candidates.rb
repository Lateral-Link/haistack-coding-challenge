# frozen_string_literal: true

class CreateCandidates < ActiveRecord::Migration[6.1]
  def change
    create_table :candidates do |t|
      t.string :name, null: false, limit: 255
      t.string :email, null: false, limit: 255
      t.date :birthdate, null: false

      t.timestamps
    end

    add_index :candidates, :email, unique: true
  end
end
