class AddDistanceToHostels < ActiveRecord::Migration
  def change
    add_column :hostels, :distance, :integer
  end
end
