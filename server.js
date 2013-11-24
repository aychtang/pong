var cloak = require('cloak');

cloak.configure({
  port: 8090,
  autoJoinLobby: false,
	messages: {
	}
});

cloak.run();
