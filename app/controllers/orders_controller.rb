class OrdersController < ApplicationController
  def index
  end

  def create
    order = Order.new

    params[:orders].each do |item_id, item|
      qty = item[:quantity]
      order.order_items << OrderItem.new(
        item_id: item_id,
        quantity: qty
      )
    end

    order.save!
    render json: {order: {id: order.id}}
  end

  def show
  end
end
