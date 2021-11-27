import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import RoomList from '../components/RoomList';
import { AppContext } from '../../../context/AppProvider';

export default function LobbyPage() {
	const { socket, username } = useContext(AppContext);
	const history = useHistory();
	const [roomList, setRoomList] = useState([]);

	useEffect(() => {
		socket.emit('get-roomList', () => {});

		socket.on('send-roomList', (roomList) => {
			setRoomList(roomList);
		});
	}, []);

	return (
		<>
			<Typography variant="h5" component="span">
				{username}
			</Typography>
			<Typography variant="h5" component="h5">Lobby</Typography> 
			<RoomList roomList={roomList} />
			<Button
				variant="contained"
				onClick={() => {
					history.push('/create');
				}}
			>
				New Room
			</Button>
		</>
	);
}
