<template>
	<div>
		<modal @modalSaved="saveTask" modalText="Input the task" type='task' :modalInput='modalInput' @editDone="editDone"></modal>
		<div class="panel panel-primary">
			<div class="panel-heading">
				<div class="btn-group btn-group-xs pull-left" role="group" aria-label="edit-task">
					<button type="button" class="btn btn-primary btn-xs" @click="addTask">
						<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
					</button>
					<button type="button" class="btn btn-primary btn-xs" @click="editPanel">
						<span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
					</button>
				</div>
			{{title}}
			<button type="button" class="btn btn-primary btn-xs pull-right" @click="removePanel">
				<span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
			</div>
			<draggable class="panel-body" :list="tasks" :options="{group:'tasks', dragClass:'task-drag'}" @start="drag=true" @end="drag=false">
				<task v-for='(task, index) in tasks' :body='task' :key='index' @editTask="editTask(index)" @removeTask="removeTask(index)">{{task}}</task>
			</draggable>
		</div>
	</div>
</template>
<script>
import draggable from 'vuedraggable'; 
import task from './task.vue'; 
import modal from './modal.vue'; 
import {storage} from '../utilities/utils.js';

export default {
		name: 'panel',
		props: ['title', 'panelIndex'],
		components: {
			draggable, task, modal
		},
		data() {
			return {
				tasks: storage.fetch('tasks', this.panelIndex),
				'modalInput': null
			}
		},
		watch: {
		    tasks: {
		      handler: function (tasks) {
		        storage.save('tasks', this.panelIndex, tasks);
		      },
		      deep: true
		    }
		  },
		methods: {
			addTask() {
			this.modalInput = null;
			$(this.$children[0].$el).modal('show');
			},

			editTask(index) {
				this.modalInput = { value: this.tasks[index], index: index };
				$(this.$children[0].$el).modal('show');
			},

			removeTask(index){
				this.tasks.splice(index,1);
			},

			saveTask(task) {
				this.tasks.push(task);
			},

			editDone(value, index) {
				this.tasks.splice(index, 1, value);
			},

			removePanel() {
				this.$emit('removePanel');
			},
			savePanel() {
				this.$emit('savePanel');
			},
			editPanel() {
				this.$emit('editPanel');
			}
	}
}
</script>

<style scoped>
	.sortable-chosen .panel-heading {
		background-color: #192E7C;
	}
	.panel-heading {
		text-align: center;
	}
</style>