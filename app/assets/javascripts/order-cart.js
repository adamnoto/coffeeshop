(function(global) {
    global.j('document').ready(function() {
        var cart = new Vue({
            el: '#order-cart',

            data: function() {
                return {
                    sharedData: global.store.state,
                    orderedItems: global.store.state.orderedItems
                }
            },

            computed: {
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
                    global.store.saveState();
                },
            }
        });
    });
})(window.gl);
