class CreateProperies < ActiveRecord::Migration[5.0]
  def change
    create_table :properties do |t|
      t.string :name, null: false
      t.string :desc, null: false
      # when creating the item, the property value will be embedded into the name
      t.boolean :nameable, null: false, default: true

      t.timestamps
    end
  end
end
