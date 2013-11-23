(function() {
	var EventSystem = new Events();
	new Manager(EventSystem);
	new UI(
		document.querySelector('.menu'),
		document.querySelector('.start-game'),
		EventSystem
	);
}());
