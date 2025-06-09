class AddStatusToMatters < ActiveRecord::Migration[7.0]
  def change
    add_column :matters, :status, :string, default: 'active'
  end
end 