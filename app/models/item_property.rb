class ItemProperty < ApplicationRecord
  belongs_to :item
  belongs_to :property

  validates_presence_of :value
end
