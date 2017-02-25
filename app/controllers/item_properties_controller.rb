class ItemPropertiesController < ApplicationController
  def index
    item_properties = {}
    ItemProperty.all.each do |v|
      item_properties[v.property_id] ||= []
      item_properties[v.property_id] << {
        id: v.id,
        item_id: v.item_id,
        value: v.value
      }
    end
    respond_to do |format|
      format.json { render json: item_properties }
    end
  end
end
