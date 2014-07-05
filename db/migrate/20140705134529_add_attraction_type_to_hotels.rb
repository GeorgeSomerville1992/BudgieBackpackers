class AddAttractionTypeToHotels < ActiveRecord::Migration
  def change
    add_column :hostels, :attraction_type, :string
  end
end
