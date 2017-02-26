# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

PROP_TYPE = Property.create!(name: Property::TYPE, desc: 'Type of the drink', nameable: false)
PROP_SIZE = Property.create!(name: Property::SIZE, desc: 'The size of the drink')

def create_item(name, price, size:, type:, image_name:, description:)
  item = Item.create!(
    name: name,
    price: price,
    description: description,
    image_name: "/images/items/#{image_name}",
    item_properties: [
      ItemProperty.new(property: PROP_SIZE, value: size),
      ItemProperty.new(property: PROP_TYPE, value: type)
    ]
  )
  puts "Created: #{item.name} - #{item.price}"
  item
end

desc = 'Coffee brewed by forcing a small amount of nearly boiling water through our finely ground coffee beans.'
create_item('Espresso', 1.95, size: PropertyOptions::SIZE_TALL, type: PropertyOptions::TYPE_COFFEE, image_name: 'espresso.jpg', description: desc)
create_item('Espresso', 2.05, size: PropertyOptions::SIZE_GRANDE, type: PropertyOptions::TYPE_COFFEE, image_name: 'espresso.jpg', description: desc)
create_item('Espresso', 2.35, size: PropertyOptions::SIZE_VENTI, type: PropertyOptions::TYPE_COFFEE, image_name: 'espresso.jpg', description: desc)

desc = 'Milk steamed to microfoam, served in a glass with a half shot of espresso poured gently through the foamy top layer'
create_item('Latte', 3.4, size: PropertyOptions::SIZE_TALL, type: PropertyOptions::TYPE_COFFEE, image_name: 'latte.jpg', description: desc)
create_item('Latte', 4.45, size: PropertyOptions::SIZE_GRANDE, type: PropertyOptions::TYPE_COFFEE, image_name: 'latte.jpg', description: desc)
create_item('Latte', 4.65, size: PropertyOptions::SIZE_VENTI, type: PropertyOptions::TYPE_COFFEE, image_name: 'latte.jpg', description: desc)

desc = 'Double espresso and hot milk well blended, with the surface topped with foamed creamy milk'
create_item('Cappuccino', 3.4, size: PropertyOptions::SIZE_TALL, type: PropertyOptions::TYPE_COFFEE, image_name: 'cappuccino.jpg', description: desc)
create_item('Cappuccino', 4.45, size: PropertyOptions::SIZE_GRANDE, type: PropertyOptions::TYPE_COFFEE, image_name: 'cappuccino.jpg', description: desc)
create_item('Cappuccino', 4.65, size: PropertyOptions::SIZE_VENTI, type: PropertyOptions::TYPE_COFFEE, image_name: 'cappuccino.jpg', description: desc)

desc = 'Smooth and creamy matcha lightly sweetened for perfection'
create_item('Green Tea', 3.45, size: PropertyOptions::SIZE_TALL, type: PropertyOptions::TYPE_TEA, image_name: 'gtea.jpg', description: desc)
create_item('Green Tea', 4.25, size: PropertyOptions::SIZE_GRANDE, type: PropertyOptions::TYPE_TEA, image_name: 'gtea.jpg', description: desc)
create_item('Green Tea', 4.45, size: PropertyOptions::SIZE_VENTI, type: PropertyOptions::TYPE_TEA, image_name: 'gtea.jpg', description: desc)

desc = 'Each sip of the time-honored classic black tea will unreveal the complexity of high grown tea leaves'
create_item('Hot Tea', 1.95, size: PropertyOptions::SIZE_GRANDE, type: PropertyOptions::TYPE_TEA, image_name: 'tea.jpg', description: desc)
