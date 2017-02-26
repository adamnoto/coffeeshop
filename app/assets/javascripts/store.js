(function(global) {
    // when updating/changing the shared schema, increase the data version
    // inspired by Erlang/Elixir.
    var DATA_VERSION = 2;

    var store = {
        STORAGE_KEY: 'COFFEESHOP_STORAGE',

        state: {
            orderedItems: {},
            dataVersion: DATA_VERSION,
        },

        saveState: function() {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
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

    store.loadState();
    global.store = new Vue({
        data: store
    });
    console.log("STATE USED", store.state);
})(window.gl);
