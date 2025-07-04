class CreateMatters < ActiveRecord::Migration[8.0]
  def change
    create_table :matters do |t|
      t.string :title
      t.text :description
      t.references :customer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
