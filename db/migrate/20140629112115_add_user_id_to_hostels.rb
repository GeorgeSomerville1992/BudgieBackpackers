class AddUserIdToHostels < ActiveRecord::Migration
  def change
    add_column :hostels, :user_id, :integer
  end
end
