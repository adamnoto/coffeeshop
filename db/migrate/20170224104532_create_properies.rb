class CreateProperies < ActiveRecord::Migration[5.0]
  def change
    create_table :properies do |t|
      t.string :name
      t.string :desc

      t.timestamps
    end
  end
end
