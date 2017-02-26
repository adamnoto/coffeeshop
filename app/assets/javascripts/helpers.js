(function(global) {
    // given item properties, and the property ID in question, return all set
    // of possible values
    global.h.propertyPossibleChoices = function(propertyId, itemProperties) {
        var values = [];
        var items = itemProperties[propertyId];

        if (items) {
            for(var i=0; i<items.length; i++) {
                var item = items[i].value;
                if (values.indexOf(item) < 0) {
                    values.push(item)
                }
            }
        }

        return values;
    }
})(window.gl);
