const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const { makeId, getActiveRooms, getUserInRoom } = require('./utils');

const app = express();
app.use(cors());

const port = process.env.PORT || 3001;
const server = app.listen(port, console.log(`Server is running on port: ${port}`));
const io = new Server(server);

const usernames = [];
const serverRooms = {};

io.on('connection', (socket) => {
	console.log(socket.id + 'has connected');
	console.log('serverRooms', serverRooms);
	console.log('usernames', usernames);

	// socket.createdRooms = [];

	socket.on('create-username', (username) => {
		if (usernames.includes(username)) {
			socket.emit('create-username-fail');
		} else {
			usernames.push(username);
			// const userInfo = { username };
			// userInfo.id = socket.id;
			// usernames.push(userInfo);

			socket.username = username;
			socket.emit('create-username-success', socket.username);
		}
	});

	socket.on('get-roomList', () => {
		// const rooms = getActiveRooms(socket);
		const rooms = ['phòng 1', 'phòng 2', 'phòng 3'];
		io.emit('send-roomList', rooms);
	});

	socket.on('create-room', (data) => {
		const roomId = makeId(10);
		socket.join(roomId);

		socket.activeRoom = roomId;


		var mang = [];
		for (let room of socket.adapter.rooms) {
			mang.push(room[0]);
			console.log(room[0]);
		}

		io.emit('server-send-rooms', mang);
		// const roomInfo = {
		// 	roomId,
		// 	roomName: data.roomName,
		// 	usernamesList: [data.username],
		// };

		// socket.username = data.username;
		// serverRooms[roomId] = roomInfo;
		// data = {username: 'tk1', roomName: 'p1' }
		// console.log('serverRooms create-room', serverRooms);
		socket.emit('create-room-success', roomId);
	});

	socket.on('join-room', (params) => {
		console.log('usernames join-room', usernames);

		if (!socket.username) {
			socket.on('create-username-in-room', (username) => {
				if (usernames.includes(username)) {
					socket.emit('create-username-fail');
				} else {
					usernames.push(username);
					socket.username = username;
					socket.emit('create-username-in-room-success', socket.username);
					// serverRooms[params] && serverRooms[params].usernamesList.push(socket.username);
				}
			});
		}
		const usersList = getUserInRoom(socket, params);

		socket.join(params);
		io.to(params).emit('room-info', usersList);
	});

	socket.on('get-room-info', (params) => {
		// const usersList = getUserInRoom(socket, params);
		

		// const usernamesList = [socket.username];

		// console.log('serverRooms[params]', serverRooms[params]);

		// io.to(params).emit('room-info', usersList);
	});

	socket.on('disconnect', () => {
		const idx = usernames.indexOf(socket.username);
		const activeRooms = getActiveRooms(socket);

		for (let i = 0, len = usernames.length; i < len; ++i) {
			var c = usernames[i];
			if (c.username === socket.id) {
				usernames.splice(i, 1);
				break;
			}
		}

		if (!activeRooms.includes(socket.activeRoom)) {
			delete serverRooms[socket.activeRoom];
		}

		if (idx > -1) {
			usernames.splice(idx, 1);
		}

		console.log(socket.id + 'has disconnected');
	});
});
