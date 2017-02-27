(function(global) {
    global.j('document').ready(function() {
        if (global.j('#sales-monitor').length != 1) { return; }
        var salesMonitor = new Vue({
            el: '#sales-monitor',

            data: function() {
                return {
                    properties: [], // list of all properties
                    itemProperties: {}, // k/v property of the item
                    filterProperties: {}, // property used for filtering
                    orders: {}, // all orders data that we have
                    items: {}, // dictionary of all items
                }
            },

            beforeMount: function() {
                var that = this;

                // load properties
                global.j.ajax({
                    url: '/properties.json',
                    success: function(res) {
                        that.properties = res;
                    },
                });

                // load item properties
                global.j.ajax({
                    url: '/item_properties.json',
                    success: function(res) { that.itemProperties = res; }
                });

                // load orders
                global.j.ajax({
                    url: '/orders.json',
                    success: function(res) { that.orders = res; }
                });

                // load all items
                global.j.ajax({
                    url: '/items.json',
                    success: function(res) { that.items = res; },
                });
            },

            computed: {
                anyFilteredOrders: function() {
                    var hasAnyOrder = false;

                    Object.keys(this.filteredOrders).forEach(function(orderId) {
                        var order = this.filteredOrders[orderId];
                        if (order.items.length > 0) {
                            hasAnyOrder = true;
                        }
                    }.bind(this));

                    return hasAnyOrder;
                },

                filteredOrders: function() {
                    var filPropKeys = Object.keys(this.filterProperties);
                    var filteredOrders = {};
                    if (filPropKeys.length > 0) {
                        Object.keys(this.orders).forEach(function(orderId) {
                            var order = this.orders[orderId];
                            var filteredItems = [];
                            order.items.forEach(function(item) {
                                var orderSatisfyProperties = true;
                                var itemId = item.id;
                                filPropKeys.forEach(function(propertyId) {
                                    this.itemProperties[propertyId].forEach(function(itemProperty) {
                                        if (itemProperty.item_id == itemId) {
                                            orderSatisfyProperties = orderSatisfyProperties && (
                                                this.filterProperties[propertyId] == itemProperty.value
                                            )
                                        }
                                    }.bind(this));
                                }.bind(this));

                                if (orderSatisfyProperties) {
                                    filteredItems.push(item);
                                }
                                filteredOrders[orderId] = {
                                    items: filteredItems
                                };
                            }.bind(this));
                        }.bind(this));
                        return filteredOrders;
                    } else {
                        filteredOrders = this.orders;
                    }

                    return filteredOrders;
                }
            },

            methods: {
                propertyPossibleChoices: function(propertyId) {
                    return global.h.propertyPossibleChoices(propertyId, this.itemProperties)
                },

                itemName: function(itemId) {
                    if (this.items && this.items[itemId]) {
                        return this.items[itemId].name;
                    }
                },

                salesGrossAmount: function(orderData) {
                    var amount = 0;

                    if (this.items && Object.keys(this.items).length > 0) {
                        orderData.items.forEach(function(item) {
                            var qty = item.quantity;
                            var price = this.items[item.id].price;
                            amount += (qty * price);
                        }.bind(this));
                    }

                    return amount;
                },

                applyFilter: function(propertyId, choice) {
                    Vue.set(this.filterProperties, propertyId, choice);
                },

                deleteFilter: function(propertyId) {
                    var newProperties = Object.assign({}, this.filterProperties);
                    delete newProperties[propertyId];
                    this.filterProperties = newProperties;
                },

                clearFilters: function() {
                    this.filterProperties = {};
                },

                isActiveFilter: function(propertyId, value) {
                    var implementedValue = this.filterProperties[propertyId];
                    if (implementedValue) {
                        return implementedValue == value ? 'active' : '';
                    } else {
                        return '__all' == value ? 'active' : '';
                    }
                },
            }

        });
    });
})(window.gl);
