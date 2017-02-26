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

            methods: {
                propertyPossibleChoices: function(propertyId) {
                    return global.h.propertyPossibleChoices(propertyId, this.itemProperties)
                },

                itemName: function(itemId) {
                    if (this.items) {
                        return this.items[itemId].name;
                    }
                } 
            }

        });
    });
})(window.gl);
