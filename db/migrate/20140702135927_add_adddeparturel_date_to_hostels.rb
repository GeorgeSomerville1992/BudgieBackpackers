class AddAdddeparturelDateToHostels < ActiveRecord::Migration
  def change
    add_column :hostels, :departureDate, :date
  end
end
