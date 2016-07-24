var main = function() {
	var userArray = [];
	var page = 1, numberOfElementsPerPage = 5, numberOfPages = 1;

	function userClass(_name, _surname, _age){
		this.name = _name;
		this.surname = _surname;
		this.age = _age;
	}

	userClass.prototype.printPerson = function (){
		console.log(this.name, this.surname, this.age);
	};

	// var addToList = function(){
	// 	var tempUserObject = {
	// 		name: $('#name').val(),
	// 		surname: $('#surname').val(),
	// 		age: parseInt($('#age').val())
	// 	}
	// 	userArray.push(tempUserObject);
	// };

	var addToList = function(){
		var tempUserObject = new userClass($('#name').val(), $('#surname').val(), parseInt($('#age').val()));
		userArray.push(tempUserObject);
		numberOfPages = Math.ceil(userArray.length/numberOfElementsPerPage);
		printList();
	};

	var printList = function (){

		$('#list_of_users').empty();
		userArray.forEach(function(user, i){
			if(i >= (page-1)*numberOfElementsPerPage && i<page*numberOfElementsPerPage){
				var button = $('<button>REMOVE</button>').click(function(){
					console.log(user);
					removeUser(user);
				})

				var upButton = $('<button>UP</button>').click(function(){
					console.log(user);
					moveUp(user);
				})

				var downButton = $('<button>DOWN</button>').click(function(){
					console.log(user);
					moveDown(user);
				})		 	

				$('#list_of_users').append('<p>' + user.name + ' ' + user.surname + '</p>').append(button).append(upButton).append(downButton);
			}
		})

		$('#page').text(page);
		$('#number_of_pages').text(numberOfPages);
	}

	var moveUp = function (user) {
		var elementPosition = userArray.indexOf(user);
		if(elementPosition>0){
			var zabieramy = userArray[elementPosition];
			userArray[elementPosition] = userArray[elementPosition-1];
			userArray[elementPosition-1] = zabieramy;
			printList();
		}
	}

	var moveDown = function (user) {
		var elementPosition = userArray.indexOf(user);
		var lastIndex = userArray.length-1;
		if(elementPosition<lastIndex){
			var zabieramy = userArray[elementPosition];
			userArray[elementPosition] = userArray[elementPosition+1];
			userArray[elementPosition+1] = zabieramy;
			printList();
		}
	}

	var removeUser = function (user) {
		userArray.splice(userArray.indexOf(user), 1);
		numberOfPages = Math.ceil(userArray.length/numberOfElementsPerPage);
		if(page>numberOfPages){
			page = numberOfPages;
		} 
		if(numberOfPages==0){
			page = 1;
			numberOfPages = 1;
		}
		printList();
	};

	var addInput = function(){
		userClass.prototype.newValue = '445';
		printList();
	}

	$('#next_page').click(function(){
		if(page < numberOfPages) {
			page++;
			printList();
		}
	})

	$('#previous_page').click(function(){
		if(page > 1){
			page--;
			printList();
		}
	})

	$('#first_page').click(function(){
		page = 1;
		printList();
	})

	$('#last_page').click(function(){
		page = numberOfPages;
		printList();
	})

	$('#add_to_list').click(addToList);
	$('#print_list').click(printList);
	$('#add_input').click(addInput);
};

$(document).ready(main);