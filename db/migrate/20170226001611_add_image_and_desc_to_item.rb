class AddImageAndDescToItem < ActiveRecord::Migration[5.0]
  def change
    add_column :items, :image_name, :string, null: false
    add_column :items, :description, :text, null: false
  end
end
