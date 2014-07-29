class AddProfileImageToUser < ActiveRecord::Migration
  def change
    add_column :users, :profileImage, :string
  end
end
