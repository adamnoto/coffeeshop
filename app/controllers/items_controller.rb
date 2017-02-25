class ItemsController < ApplicationController
  def index
    items = Item.all
    respond_to do |format|
      format.json { render json: items }
    end
  end
end
