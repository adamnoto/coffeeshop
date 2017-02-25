class PropertiesController < ApplicationController
  def index
    properties = Property.all
    respond_to do |format|
      format.json { render json: properties }
    end
  end
end
