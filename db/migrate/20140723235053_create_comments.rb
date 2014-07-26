class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :name
      t.string :body
      t.date :date_logged

      t.timestamps
    end
  end
end
