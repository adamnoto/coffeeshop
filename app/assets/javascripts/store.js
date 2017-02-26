(function(global) {
    // when updating/changing the shared schema, increase the data version
    // inspired by Erlang/Elixir.
    var DATA_VERSION = 3;

    var store = {
        STORAGE_KEY: 'COFFEESHOP_STORAGE',

        // list of properties that not supposed to be persisted, thus,
        // reversed back to its original value
        transientProperties: [
            'selectedProperties',
        ],

        state: {
            orderedItems: {},
            dataVersion: DATA_VERSION,
            selectedProperties: {},
        },

        originalState: {},

        init: function() {
            Object.keys(this.state).forEach(function(key) {
                var stateVal = this.state[key];
                this.originalState[key] = this.state[key];
            }.bind(this));
        },

        saveState: function() {
            var state = this.state;
            // no need to save transient properties
            this.transientProperties.forEach(function(propertyName) {
                this.state[propertyName] = this.originalState[propertyName];
            }.bind(this));

            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
            return true;
        },

        loadState: function() {
            var stateData = JSON.parse(localStorage.getItem(this.STORAGE_KEY));

            console.log("Current schema: ", this.state.dataVersion, " needed schema version: ", DATA_VERSION);
            if (stateData && stateData.dataVersion === DATA_VERSION) {
                this.state = stateData;
                console.log("State loaded", this.state);
            } else {
                console.error("Unable to load state, different schema versioning");
            }
        }
    };

    store.init();
    store.loadState();
    global.store = new Vue({
        data: store
    });
    console.log("STATE USED", store.state);
})(window.gl);
