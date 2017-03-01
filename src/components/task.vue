<template>
	<transition name='single-task'>
		<div class="panel panel-default task-component">
			<div class="panel-heading">
				<div class="btn-group pull-right btn-group-xs" role="group" aria-label="edit-task">
					<button type="button" class="btn btn-default" @click='editTask'>
						<span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
					</button>
					<button type="button" class="btn btn-default" @click='removeTask'>
						<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
					</button>
				</div>
			</div>
			<div class="panel-body">
						{{body}}
			</div>
		</div>
	</transition>
</template>
<script>
	export default {
		name: 'task',
		props: ['body'],
		methods: {

			removeTask(){
				this.$emit('removeTask');
			},
			
			editTask(){
				this.$emit('editTask');
			}
		}
	}
</script>
<style scoped>
	.task-component {
		cursor: move;
	}

	.sortable-chosen {
		background-color: #337AB7;
		opacity: 0.5;
		color: white;
	}

	.task-drag {
		background: #337AB7;
		opacity: 1 !important;
	}
</style>