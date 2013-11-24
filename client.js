cloak.configure({
	messages: {
		'joinLobby': function(e) {
			console.log(e + 'world');
		}
	}
});

cloak.run('http://localhost:8090');
