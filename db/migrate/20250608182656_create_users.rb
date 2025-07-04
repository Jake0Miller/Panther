class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :firm_name
      t.string :password_digest

      t.timestamps
    end
    add_index :users, :email, unique: true
  end
end
