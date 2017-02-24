# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

PROP_SIZE = Property.create!(name: Property::SIZE, desc: 'The size of the drink')
PROP_TYPE = Property.create!(name: Property::TYPE, desc: 'Type of the drink', nameable: false)

def create_item(name, price, size:, type:)
  item = Item.create!(
    name: name,
    price: price,
    item_properties: [
      ItemProperty.new(property: PROP_SIZE, value: size),
      ItemProperty.new(property: PROP_TYPE, value: type)
    ]
  )
  puts "Created: #{item.name} - #{item.price}"
  item
end

create_item('Espresso', 1.95, size: PropertyOptions::SIZE_TALL, type: PropertyOptions::TYPE_COFFEE)
create_item('Espresso', 2.05, size: PropertyOptions::SIZE_GRANDE, type: PropertyOptions::TYPE_COFFEE)
create_item('Espresso', 2.35, size: PropertyOptions::SIZE_VENTI, type: PropertyOptions::TYPE_COFFEE)

create_item('Latte', 3.4, size: PropertyOptions::SIZE_TALL, type: PropertyOptions::TYPE_COFFEE)
create_item('Latte', 4.45, size: PropertyOptions::SIZE_GRANDE, type: PropertyOptions::TYPE_COFFEE)
create_item('Latte', 4.65, size: PropertyOptions::SIZE_VENTI, type: PropertyOptions::TYPE_COFFEE)

create_item('Cappuccino', 3.4, size: PropertyOptions::SIZE_TALL, type: PropertyOptions::TYPE_COFFEE)
create_item('Cappuccino', 4.45, size: PropertyOptions::SIZE_GRANDE, type: PropertyOptions::TYPE_COFFEE)
create_item('Cappuccino', 4.65, size: PropertyOptions::SIZE_VENTI, type: PropertyOptions::TYPE_COFFEE)

create_item('Green Tea', 3.45, size: PropertyOptions::SIZE_TALL, type: PropertyOptions::TYPE_TEA)
create_item('Green Tea', 4.25, size: PropertyOptions::SIZE_GRANDE, type: PropertyOptions::TYPE_TEA)
create_item('Green Tea', 4.45, size: PropertyOptions::SIZE_VENTI, type: PropertyOptions::TYPE_TEA)

create_item('Hot Tea', 1.95, size: PropertyOptions::SIZE_GRANDE, type: PropertyOptions::TYPE_TEA)
