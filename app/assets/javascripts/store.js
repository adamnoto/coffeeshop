(function(global) {
    var store = {
        STORAGE_KEY: 'COFFEESHOP_STORAGE',

        state: {
            propertyCount: 0,
            // mapping of propertyId with the value for that property
            selectedProperties: {},
        },

        saveState: function() {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
            return true;
        },

        loadState: function() {
            var stateData = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
            if (stateData) { this.state = stateData; }
        }
    };

    store.loadState();
    global.store = new Vue({
        data: store
    });

    console.log("Loaded state", global.store.state);
})(window.gl);
