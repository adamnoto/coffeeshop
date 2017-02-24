class CreateItemProperties < ActiveRecord::Migration[5.0]
  def change
    create_table :item_properties do |t|
      t.string :item_id
      t.string :key
      t.string :value

      t.timestamps
    end
  end
end
