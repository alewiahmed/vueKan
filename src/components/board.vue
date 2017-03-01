<template>
	<div class="panel-container">
		<modal modalText="Input panel name" @modalSaved="savePanel" type='panel' :modalInput='modalInput' @editDone="editDone"></modal>
		<draggable :list="panels" :options="{group:'my-panels', handle: '.panel-heading'}" @update="update">	
			<panel class="col-md-3 col-sm-4 single-panel" v-for="(panel, index) in panels" :title="panel" :key="index" :panelIndex="index" @removePanel="removePanel(index)" @savePanel="savePanel" @editPanel="editPanel(index)"></panel>
		</draggable>
		<button type="button" class="btn btn-primary glyphicon glyphicon-plus pull-left" @click="addPanel"></button>
	</div>	
</template>
<script>
	import draggable from 'vuedraggable';
	import panel from './panel.vue';
	import modal from './modal.vue';
	import {storage} from '../utilities/utils.js';

	export default {
		data(){
			return {
				panels: storage.fetch('panels'),
				modalInput: null
			}
		},

		components: {
			draggable,
			panel, 
			modal,
		},

		watch: {
		    panels: {
		      handler: function (panels) {
		        storage.save('panels', null, panels);
		      },
		      deep: true
		    }
		  },

		methods: {

			update(evt){

				let sourceTask = this.$children[1].$children[evt.oldIndex].tasks;
				let temp = [];

				this.$children[1].$children.forEach(function(element, index){
					if(index != evt.oldIndex)
					temp.push(element.tasks);
				})

				temp.splice(evt.newIndex,0, sourceTask );
				
				this.$children[1].$children.forEach(function(element, index){
					element.tasks = temp[index];
				});

			},

			removePanel(theIndex) {

				let temp = [];

				this.$children[1].$children.forEach(function(element, index){
					if(index != theIndex)
					temp.push(element.tasks);
				});
				
				this.panels.splice(theIndex, 1);

				this.$children[1].$children.forEach(function(element, index){
					element.tasks = temp[index];
				});
			},

			addPanel() {
				this.modalInput = null;
				$(this.$children[0].$el).modal('show');
			},

			savePanel(panel){
				this.panels.push(panel);
			},

			editPanel(index) {
				this.modalInput = { value: this.panels[index], index: index };
				$(this.$children[0].$el).modal('show');
			},

			editDone(value, index) {
				this.panels.splice(index, 1, value);
			},
		}
	}

</script>
<style>
	.panel-container .panel-heading {
		cursor: move;
	}
</style>