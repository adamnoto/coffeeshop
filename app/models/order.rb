class Order < ApplicationRecord
  self.primary_key = :id
  before_create { self.id = SecureRandom.uuid }

  has_many :order_items

  def sales_gross_amount
    order_items.inject(0) { |sum, order_item| sum + order_item.item.price }.to_f
  end
end
