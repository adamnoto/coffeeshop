class CreateOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :orders, id: false do |t|
      t.string :id, null: false

      t.timestamps
    end

    execute "ALTER TABLE orders ADD CONSTRAINT order_pk PRIMARY KEY (id);"
  end
end
