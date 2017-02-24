class CreateOrderItems < ActiveRecord::Migration[5.0]
  def change
    create_table :order_items do |t|
      t.string :order_id, null: false
      t.string :item_id, null: false
      t.string :quantity, null: false

      t.timestamps
    end

    add_index :order_items, [:order_id, :item_id], unique: true
  end
end
