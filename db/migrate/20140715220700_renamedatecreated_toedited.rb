class RenamedatecreatedToedited < ActiveRecord::Migration
  def up
    rename_column :posts, :dateedited, :date_edited
  end

  def down
  end
end
