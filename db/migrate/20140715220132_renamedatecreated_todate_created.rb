class RenamedatecreatedTodateCreated < ActiveRecord::Migration
  def up
    rename_column :posts, :datecreated, :date_created
  end

  def down
  end
end
