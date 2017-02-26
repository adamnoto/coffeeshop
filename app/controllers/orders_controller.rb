class OrdersController < ApplicationController
  def new
  end

  def index
    all_orders = Order.all.order('created_at DESC').
      includes(:order_items)

    all_orders = all_orders.map do |order|
      items = order.order_items.map do |order_item|
        {id: order_item.item_id, quantity: order_item.quantity}
      end
      order.attributes.merge({
        items: items,
        sales_gross_amount: order.sales_gross_amount
      })
    end

    all_orders = all_orders.map do |order_hash|
      order_hash.delete('created_at')
      order_hash.delete('updated_at')
      [order_hash.delete('id'), order_hash]
    end.to_h

    respond_to do |format|
      format.html { }
      format.json { render json: all_orders }
    end
  end

  def create
    order = Order.new

    params[:orders].each do |_, item|
      qty = item[:quantity]
      order.order_items << OrderItem.new(
        item_id: item['id'],
        quantity: qty
      )
    end

    order.save!
    render json: {order: {id: order.id}}
  end

  def show
  end
end
