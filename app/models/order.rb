class Order < ApplicationRecord
  self.primary_key = :id
  before_create { self.primary_key = SecureRandom.uuid }
end
