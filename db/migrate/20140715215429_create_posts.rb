class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.string :name
      t.text :body
      t.date :datecreated
      t.date :dateedited
      t.text :picture

      t.timestamps
    end
  end
end
