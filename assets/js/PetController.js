var PetController = {
	
	init: function () {
		PetController.setForm();
		PetController.showList();
	},
	
	setForm: function () {
		var form = document.querySelector('form');
		form.addEventListener('submit', function(event) {
			PetController.addTask(form);
			//it is to avoid form submition
			event.preventDefault();
		});
		PetController.setFocus();
	},
	
	setFocus: function() {
		var inputName = document.getElementById('name');
		inputName.focus();
	},
	
	clearForm: function() {
		var form = document.querySelector('form');
		form.reset();
		PetController.setFocus();
	},
	
	addTask: function(form) {
		var task = {
			name: form.name.value,
			mytask: form.mytask.value
		};
		
		PetService.add(task, function(addedTask) {
			PetController.addToHTML(addedTask);
			PetController.clearForm();
		});
	},
	
	deleteTask: function(imgDelete) {
		var 
			taskName = imgDelete.dataset.taskname,
			taskId = imgDelete.dataset.taskid;
		
		if(confirm('Tem certeza que deseja excluir esta tarefa?')) {
			PetService.remove(taskId, function(isDeleted) {
				if(isDeleted) {
					$(imgDelete).parents('dl').remove();
				}
			})
		}
	},
	
	showList: function () {
		PetService.getList(function(list) {
			list.forEach(function(task) {
				PetController.addToHTML(task);
			});	
		});
	},
	
	addToHTML: function (task) {
		var
			taskList = document.getElementById('taskList'),
			dl = document.createElement('dl'),
			dt = PetController.createDT(task),
			ddName = PetController.createDD(task.name, 'name'),
			imgDelete = PetController.createDelete(task),
			ddmytask = PetController.createDD(task.mytask, 'mytask');
		
		ddName.appendChild(imgDelete);
		
		dl.appendChild(dt);
		dl.appendChild(ddName);
		dl.appendChild(ddmytask);
		
		taskList.appendChild(dl);
	},
	
	createImage: function(imageLocation) {
		var img = document.createElement('img');
		img.src = imageLocation;
		return img;
	},
	
	createDT: function(task) {
		var 
			dt = document.createElement('dt'),
			img = PetController.createImage('http://focusfoto.com.br/wp-content/uploads/2013/08/enio-leite-pets.jpg');
		
		dt.appendChild(img);
		dt.className = "photo";
		
		return dt;
	},
	
	createDD: function(value, className) {
		var dd = document.createElement('dd');
		
		dd.innerHTML = value;
		dd.className = className;
		
		return dd;
	},
	
	createDelete: function(task) {
		var imgDelete = PetController.createImage('assets/images/delete.gif');
		
		imgDelete.setAttribute('data-taskid', task.id);
		imgDelete.setAttribute('taskname', task.name);
		
		imgDelete.addEventListener('click', function() {
			PetController.deleteTask(this);
		});
		
		return imgDelete;
	}

};

//TODO consider to have an HTMLService.js
//initialization
PetController.init();