# Coffeeshop

This support:

- Adding multiple quantity of product by adding-to-cart the item more than 1
  - Design consideration: adding item with quantity is very rare to happen, customer usually only order a single item, therefore it'll be tiring and UI will be cluttered to add input box to accept quantity not to mention the code becoming much more complex than necessary to serve the common need
- Removing item by hovering on cart and click 'x'
- Displaying image of the product
- Filtering sales, with proper sales amount reporting

## Stack used

- Rails
- PostgreSQL
- Vue.js
- Slim

## Limitation

This software codes has some known limitation (that can easily be fixed):

- It fetched all data for all filtering features, for small dataset it is ok, but for a lot, a lot bigger ones, refactoring is needed
  - Possible fix: using pagination, process query/filtering in SQL, use caching

## FAQ

### How to add a new type of coffee/tea/item?

Each item is represented by the `Item` object, which data is persisted on the database.
To add a new item, simply create data on the `Item` table. Using Rails, this could
be done by doing:

```ruby
  item = Item.create!(
    name: name,
    price: price,
    description: description,
    image_name: "/images/items/tea-image.jpg",
    item_properties: [
      ItemProperty.new(property: prop_size, value: 'grande'),
      ItemProperty.new(property: prop_type, value: 'tea')
    ]
  )
```

### How if we want a new size?

The app is made modular, therefore all Properties are not hard-coded. Like item,
properties are persisted into the database. To add a new size, it is as easy
as creating a new `ItemProperty` with the new value that you want.

In this case, create `ItemProperty` with `type` set to `'size'` and then set
the value to any new size intended.

### How would you change the model to add hot/cold options?

We want to achieve as low dependency as possible, thus data like this are
not to be hard-coded. Since the property is not hard-coded, we can simply create
a new `Property` and modify the item that will want to have that property:

```ruby
PROP_ICED = Property.create!(name: 'iced', desc: 'If the drink is iced', nameable: true)
my_item = Item.first
my_item.item_properties << ItemProperty.new(
  property: PROP_ICED,
  value: 'hot'
)
my_item.save!
```

As the `nameable` of the `PROP_ICED` is set to `true`, the value `'Hot'`
will be embedded into the item's name upon creation, eg: Latte Grande Hot.

In this way, no model is need to change, we just have to add more data.

### How would you change the model to support adding condiments to drinks

As all filters, all selections, are dynamically created based on existing properties
and items at the time. Therefore, no much effort is needed, in fact, the way
to add a new condiment and its options are exactly the same with the above, and very extensible:

1. Create the new property
2. Create a new item with all properties intended (including condiments)

If there are more than 1 condiment possible, than we need to create each condiment
as a new property: Jelly Topping, Cream Topping, etc.
