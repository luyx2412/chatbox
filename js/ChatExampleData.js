module.exports = {
	init: function() {
		localStorage.clear();
		localStorage.setItem('chatdb', JSON.stringify({
			users: {
				dang: {
					name: "Dang",
					avatar: 'http://orig10.deviantart.net/c0e0/f/2014/215/7/e/renniimarco_by_rennii_marco-d7til5w.jpg',
					uid: 'u_1',
					email: 'luyxtran264@gmail.com',
					threads: ['t_1', 't_2', 't_3']
				},
				superman: {
					name: "Super man",
					avatar: 'http://orig10.deviantart.net/c0e0/f/2014/215/7/e/renniimarco_by_rennii_marco-d7til5w.jpg',
					uid: 'u_2',
					email: 'superman@gmail.com',
					threads: ['t_1', 't_2']
				}
			},
			threads: {
				t_1: {
					name: 'Super Man & Dang',
					users: ['dang', 'superman'],
					messages: [{
						id: 'm_1',
						name: 'Super Man',
						avatar: 'http://orig10.deviantart.net/c0e0/f/2014/215/7/e/renniimarco_by_rennii_marco-d7til5w.jpg',
						text: 'Hey Dang, do u super hero?',
						timestamp: Date.now()
					}, {
						id: 'm_2',
						name: 'Dang',
						avatar: 'http://orig10.deviantart.net/c0e0/f/2014/215/7/e/renniimarco_by_rennii_marco-d7til5w.jpg',
						text: 'Yeah, Of courses.',
						timestamp: Date.now()
					}]
				},
				t_2: {
					name: "Bat Man & Dang",
					users: ['dang', 'superman'],
					messages: [{
						id: 'm_3',
						name: 'Bat Man',
						avatar: 'http://orig10.deviantart.net/c0e0/f/2014/215/7/e/renniimarco_by_rennii_marco-d7til5w.jpg',
						text: 'Do u want to become Bat Man?',
						timestamp: Date.now()
					}, {
						id: 'm_4',
						name: 'Dang',
						avatar: 'http://orig10.deviantart.net/c0e0/f/2014/215/7/e/renniimarco_by_rennii_marco-d7til5w.jpg',
						text: 'Yeah',
						timestamp: Date.now()
					}, {
						id: 'm_5',
						name: 'Bat Man',
						avatar: 'http://orig10.deviantart.net/c0e0/f/2014/215/7/e/renniimarco_by_rennii_marco-d7til5w.jpg',
						text: 'Thanks u so much, My god',
						timestamp: Date.now()
					}]
				},
				t_3: {
					name: 'Captain American & Dang',
					users: ['dang'],
					messages: [{
						id: 'm_6',
						name: 'Captain American',
						avatar: 'http://orig10.deviantart.net/c0e0/f/2014/215/7/e/renniimarco_by_rennii_marco-d7til5w.jpg',
						text: 'Hey my Captain Dang, Are u really Captain Vietnam.',
						timestamp: Date.now()
					}, {
						id: 'm_7',
						name: 'Dang',
						avatar: 'http://orig10.deviantart.net/c0e0/f/2014/215/7/e/renniimarco_by_rennii_marco-d7til5w.jpg',
						text: 'Hehehe',
						timestamp: Date.now()
					}]
				}
			}
		}));
	}
};