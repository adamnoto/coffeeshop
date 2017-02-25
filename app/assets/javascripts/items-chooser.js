(function(global) {
    global.j('document').ready(function() {
        var itemsChooser = new Vue({
            el: '#items-chooser',

            data: function() {
                return {
                    properties: [],
                    itemProperties: {},
                    propertyIndex: 0,
                    items: []
                };
            },

            computed: {
                allPropertiesSpecified: function() {
                    var selPropCount = global.store.state.selectedProperties.length;
                    return selPropCount == this.properties.length;
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
                nextProperty: function() {
                    this.propertyIndex += 1;
                },

                selectProperty: function(propertyId, value) {
                    global.store.state.selectedProperties[propertyId] = value;
                    global.store.saveState();
                    this.nextProperty();
                },
            },
        });
    });
})(window.gl);
