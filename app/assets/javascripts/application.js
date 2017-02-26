// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require_self
//= require jquery_ujs
//= require tether
//= require bootstrap
//= require vue
//= require_tree .

if (!window.gl) {
    window.gl = {}; // instantiate the holder for user-defined functions scoped to Coffeeshop
    window.gl.j = jQuery; // aliasing jQuery, less dependent in case we want to switch using jQuery alternative
    window.gl.h = {}; // user-defined helper methods
}
