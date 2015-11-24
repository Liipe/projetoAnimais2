var PetService = {

	list: [],
	
	add: function(task, callback) {
		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			url: 'api/guests',
			data: JSON.stringify(task),
			success: function(addedTask) {
				console.log('Task created!');
				callback(addedTask);
			},
			error: function() {
				console.log('Error to add guest ' + task.name);
			}
		});
	},
	
	remove: function(id, callback) {
		$.ajax({
			type: 'DELETE',
			url: 'api/guests/' + id,
			success: function(response) {
				console.log('Task deleted!');
				callback(true);
			},
			error: function(jqXHR) {
				console.log('Error to delete guest with id ' + id);
				callback(false);
			}
		});
	},
	
	getList: function(callback) {
		$.ajax({
			type: 'GET',
			url: 'api/guests',
			dataType: 'json',
			success: function(list) {
				callback(list);
			}
		});
	}
}