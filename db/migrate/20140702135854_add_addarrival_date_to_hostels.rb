class AddAddarrivalDateToHostels < ActiveRecord::Migration
  def change
    add_column :hostels, :arrivalDate, :date
  end
end
