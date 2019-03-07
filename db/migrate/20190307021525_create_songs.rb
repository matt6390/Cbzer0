class CreateSongs < ActiveRecord::Migration[5.2]
  def change
    create_table :songs do |t|
      t.string :name
      t.string :storage_url
      t.integer :user_id

      t.timestamps
    end
  end
end
