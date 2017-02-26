(function(global) {
    global.j('document').ready(function() {
        if (global.j('#order-cart').length != 1) { return; }
        var cart = new Vue({
            el: '#order-cart',

            data: function() {
                return {
                    sharedData: global.store.state
                }
            },

            computed: {
                orderedItems: function() {
                    return this.sharedData.orderedItems
                },

                salesAmount: function() {
                    var grossAmount = 0;

                    Object.keys(this.orderedItems).forEach(function(itemId) {
                        var items = this.orderedItems[itemId];
                        if (items.length > 0) {
                            var qty = items.length;
                            grossAmount += (qty * items[0].price);
                        }
                    }.bind(this));

                    grossAmount = Number(Math.round(grossAmount.toString() + 'e2') + 'e-2').toFixed(2);
                    return grossAmount;
                }
            },

            methods: {
                removeItem: function(itemId) {
                    this.orderedItems[itemId].pop();
                    if (this.orderedItems[itemId].length == 0) {
                        delete this.orderedItems[itemId];
                    }
                    global.store.saveState();
                },

                placeOrder: function() {
                    var ordersData = [];

                    Object.keys(this.orderedItems).forEach(function(itemId) {
                        var items = this.orderedItems[itemId];
                        var qty = items.length;
                        if (qty > 0) {
                            var item = items[0];
                            var itemJson = {
                                id: item.id,
                                quantity: qty
                            }
                            ordersData.push(itemJson);
                        }
                    }.bind(this));

                    global.j.ajax({
                        url: '/orders',
                        method: 'POST',
                        dataType: 'json',
                        data: {orders: ordersData},
                        success: function(resp) {
                            if (resp && resp.order && resp.order.id) {
                                alert('Order placed successfully');
                                Vue.set(global.store.state, 'orderedItems', {});
                                global.store.saveState();
                            }
                        }
                    });
                },
            }
        });
    });
})(window.gl);
