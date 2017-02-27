class Order < ApplicationRecord
  self.primary_key = :id
  before_create { self.id = SecureRandom.uuid }

  has_many :order_items
end
