class Item < ApplicationRecord
  has_many :item_properties
  has_many :properties, through: :item_properties

  before_save :alter_name_with_properties, if: :new_record?

  private

  def alter_name_with_properties
    new_name = name
    item_properties.each do |iproperty|
      if iproperty.property.nameable?
        new_name += " #{iproperty.value.capitalize}"
      end
    end

    self.name = new_name 
  end
end
