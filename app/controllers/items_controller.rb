class ItemsController < ApplicationController
  def index
    items = {}

    Item.all.each do |item|
      items[item.id] = item.attributes
    end

    respond_to do |format|
      format.json { render json: items }
    end
  end
end
