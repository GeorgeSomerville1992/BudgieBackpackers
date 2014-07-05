class AddAttractionTypeToAttractions < ActiveRecord::Migration
  def change
    add_column :attractions, :attraction_type, :string
  end
end
