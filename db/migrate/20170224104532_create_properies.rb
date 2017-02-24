class CreateProperies < ActiveRecord::Migration[5.0]
  def change
    create_table :properties do |t|
      t.string :name, null: false
      t.string :desc, null: false
      t.boolean :nameable, null: false, default: true

      t.timestamps
    end
  end
end
