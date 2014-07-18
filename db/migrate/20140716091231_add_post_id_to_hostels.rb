class AddPostIdToHostels < ActiveRecord::Migration
  def change
    add_column :hostels, :post_id, :integer
  end
end
