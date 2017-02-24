class CreateItemProperties < ActiveRecord::Migration[5.0]
  def change
    create_table :item_properties do |t|
      t.string :item_id
      t.string :property_id
      t.string :value
      
      t.timestamps
    end

    add_index :item_properties, [:item_id, :property_id], unique: true
  end
end
