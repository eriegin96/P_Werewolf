module.exports = {
	makeId: (length) => {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	},

	getActiveRooms: (socket) => {
		// Convert map into 2D list:
		// ==> [['4ziBKG9XFS06NdtVAAAH', Set(1)], ['room1', Set(2)], ...]
		const arr = Array.from(socket.adapter.rooms);
		// Filter rooms whose name exist in set:
		// ==> [['room1', Set(2)], ['room2', Set(2)]]
		const filtered = arr.filter((room) => !room[1].has(room[0]));
		// Return only the room name:
		// ==> ['room1', 'room2']
		const res = filtered.map((i) => i[0]);
		return res;
	},

	getUserInRoom: (socket, roomName) => {
		const arr = Array.from(socket.adapter.rooms);
		const filtered = arr.filter((room) => !room[1].has(room[0]));

		const roomObj = ((arr) => {
			const obj = {};
			arr.map((i) => {
				obj[i[0]] = [...i[1]];
			});
			return obj;
		})(filtered);

		const userList = roomObj[roomName];
		// const res = Array.from(...set)
		return userList;
	},
};

// //this is an ES6 Set of all client ids in the room
// const clients = io.sockets.adapter.rooms.get(params);

// //to get the number of clients in this room
// const numClients = clients ? clients.size : 0;

// //to just emit the same event to all members of a room
// io.to(params).emit('new event', 'Updates');

// for (const clientId of clients) {
// 	//this is the socket of each client in the room.
// 	const clientSocket = io.sockets.sockets.get(clientId);
// 	console.log(clientSocket.id)
// }
