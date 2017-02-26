class OrdersController < ApplicationController
  def new
  end

  def index
    all_orders = Order.all.order('created_at DESC').
      includes(:order_items).
      map do |order|
        order.attributes.merge(items: order.order_items.map do |order_item|
          {
            id: order_item.item_id,
            quantity: order_item.quantity
          }
        end)
      end

    respond_to do |format|
      format.html { }
      format.json { render json: all_orders }
    end
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
