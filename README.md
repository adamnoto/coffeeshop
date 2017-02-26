# Coffeeshop

This support:

- Adding multiple quantity of product by adding-to-cart the item more than 1
  - Design consideration: adding item with quantity is very rare to happen, customer usually only order a single item, therefore it'll be tiring and UI will be cluttered to add input box to accept quantity not to mention the code becoming much more complex than necessary to serve the common need
- Removing item by hovering on cart and click 'x'
- Displaying image of the product

## Limitation

This software codes has some known limitation (that can easily be fixed):

- It fetched all data for all filtering features, for small dataset it is ok, but for a lot, a lot bigger ones, refactoring is needed
  - Possible fix: using pagination, process query/filtering in SQL, use caching
