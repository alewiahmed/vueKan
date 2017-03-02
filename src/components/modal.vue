<template>
	<div class="modal fade" tabindex="-1" role="dialog" id="myModal">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">{{title}}</h4>
				</div>
				<div class="modal-body">
					<form>
						<div class="form-group">
							<template v-if="!isPanel">
								<label for="task" class="control-label">{{modalText}}</label>
								<input class="form-control" id="taskInput" v-model="input" @keydown.enter.prevent.stop="modalSaved">
							</template>
							<template v-if="isPanel">
								<label for="panel" class="control-label">{{modalText}}</label>
								<input class="form-control" id="panelInput" v-model="input" @keydown.enter.prevent.stop="modalSaved">
							</template>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary" @click.stop="modalSaved" :disabled="isDisabled">Create</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'modal',
	props: ['title', 'modalText', 'type', 'modalInput'],

	data() {
		return {
			input: ''
		}
	},

	mounted(){
		let theModal = $(this.$el);

		theModal.on('shown.bs.modal', () => {
				this.input = (this.modalInput == null) ? '': this.modalInput.value;
				
				theModal.find('#taskInput').focus();
				theModal.find('#panelInput').focus();
		});

		theModal.on('hide.bs.modal', () => {
				this.input = '';
		});
	},

	methods: {

		modalSaved() {
			if(this.input == ''){
				$(this.$el).modal('hide');
				return;
			}

			if(this.modalInput === null){
				this.$emit('modalSaved', this.input);						
			}
			else {
				this.$emit('editDone', this.input, this.modalInput.index);
			}

			this.input = '';
			$(this.$el).modal('hide');
		},
	},

	computed: {

		isDisabled(){
			if(this.input == '')
				return true;
			return false;
		},

		isPanel() {
			if(this.type == 'panel')
				return true;
			return false;
		}
	}
}

</script>
<style>

</style>
