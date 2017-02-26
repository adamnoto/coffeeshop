(function(global) {
    global.j('document').ready(function() {
        if (global.j('#items-chooser').length != 1) { return; }
        var itemsChooser = new Vue({
            el: '#items-chooser',

            data: function() {
                return {
                    properties: [],
                    itemProperties: {},
                    propertyIndex: 0,
                    items: {},
                    sharedState: global.store.state,
                };
            },

            computed: {
                selectedProperties: function() {
                    return this.sharedState.selectedProperties;
                },

                currentProperty: function() {
                    return this.properties[this.propertyIndex];
                },

                currentPropertyPossibleValues: function() {
                    var values = [];
                    var items = this.itemProperties[this.currentProperty.id];

                    if (items) {
                        for(var i=0; i<items.length; i++) {
                            var item = items[i].value;
                            if (values.indexOf(item) < 0) {
                                values.push(item)
                            }
                        }
                    }

                    return values;
                },
            },

            beforeMount: function() {
                var that = this;

                // load properties
                global.j.ajax({
                    url: '/properties.json',
                    success: function(res) {
                        that.properties = res;
                        global.store.state.propertyCount = that.properties.length;
                        global.store.saveState();
                    },
                });

                // load item properties
                global.j.ajax({
                    url: '/item_properties.json',
                    success: function(res) { that.itemProperties = res; }
                });

                // load all items
                global.j.ajax({
                    url: '/items.json',
                    success: function(res) { that.items = res; },
                });
            },

            methods: {
                allPropertiesSpecified: function() {
                    var selPropCount = Object.keys(this.selectedProperties).length;
                    return selPropCount == this.properties.length;
                },

                nextProperty: function() {
                    this.propertyIndex += 1;
                },

                previousProperty: function() {
                    delete this.sharedState.selectedProperties[this.propertyIndex];
                    this.propertyIndex -= 1;
                },

                selectProperty: function(propertyId, value) {
                    this.selectedProperties[propertyId] = value;
                    this.nextProperty();
                },

                addItemToCart: function(itemId) {
                    var item = this.items[itemId];
                    var orderedItems = global.store.state.orderedItems;

                    if (!orderedItems[itemId]) {
                        Vue.set(orderedItems, itemId, []);
                    }

                    orderedItems[itemId].push(item);
                    global.store.saveState();
                },

                filteredItems: function() {
                    var itemIds = [];
                    var propertyKeys = Object.keys(this.selectedProperties);

                    for(var i=0; i<propertyKeys.length; i++) {
                        var propKey = propertyKeys[i];
                        var selectedValue = this.selectedProperties[propKey];
                        var allItemsOnThatProperty = this.itemProperties[propKey];
                        var allItemsSatisfying = [];

                        if (allItemsOnThatProperty) {
                            allItemsOnThatProperty.forEach(function(item) {
                                if (item.value === selectedValue) {
                                    allItemsSatisfying.push(item.item_id);
                                }
                            });
                        }

                        if (itemIds.length === 0) { itemIds = allItemsSatisfying; }
                        else {
                            itemIds.forEach(function(itemId) {
                                if (allItemsSatisfying.indexOf(itemId) < 0) {
                                    delete itemIds[itemIds.indexOf(itemId)];
                                }
                            });
                        }
                    }

                    var items = [];
                    itemIds.forEach(function(itemId) {
                        items.push(this.items[itemId]);
                    }.bind(this));

                    return items;
                },
            },
        });
    });
})(window.gl);
