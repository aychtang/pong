(function() {
	var EventSystem = new Events();
	var manager = new Manager(EventSystem);
	var gameUI = new UI(
		document.querySelector('.menu'),
		document.querySelector('.start-game'),
		EventSystem
	);
}());
