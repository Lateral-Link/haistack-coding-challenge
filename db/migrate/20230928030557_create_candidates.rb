class CreateCandidates < ActiveRecord::Migration[6.1]
  def change
    create_table :candidates do |t|
      t.string :name, limit: 100, null: false
      t.string :email, limit: 100, null: false
      t.date :date_of_birth, null: false
      t.datetime :created_at, precision: 6, null: false, default: -> { 'CURRENT_TIMESTAMP(6)' }
      t.datetime :updated_at, precision: 6, null: false, default: -> { 'CURRENT_TIMESTAMP(6)' }
    end

    add_index :candidates, :email, unique: true
  end
end
