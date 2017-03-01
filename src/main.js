import Vue from 'vue';

import jQuery from 'jquery';
global.jQuery = jQuery;
global.$ = jQuery;

// import App from './App.vue';
import board from './components/board.vue';
import modal from './components/modal.vue';

import {storage} from './utilities/utils.js';

import draggable from 'vuedraggable';

var Bootstrap = require('bootstrap');
import './assets/css/app.css';

new Vue({
  el: '#app',
  components: {
  	board, modal
  },
  methods: {
  	createPanel(){
  		this.$children[0].addPanel();
  	}
  },
});
