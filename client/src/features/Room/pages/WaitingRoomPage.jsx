import React, { useContext, useEffect, useState } from 'react';
import { Paper, Typography, Grid, Card } from '@mui/material';
import { AppContext } from '../../../context/AppProvider';
import PlayerList from '../components/PlayerList';
import { useParams } from 'react-router-dom';
import CreateUsernameInRoom from '../components/CreateUsernameInRoom';

export default function WaitingRoomPage() {
	const { socket, username, setUsername } = useContext(AppContext);
	const { id: params } = useParams();
	const [roomName, setRoomName] = useState('');
	const [usersList, setUsersList] = useState([]);

	useEffect(() => {
		socket.emit('join-room', params);

		if (username) {
			socket.emit('get-room-info', params);
			socket.on('new event', () => {})
			// socket.on('room-info', (data) => {
				// setRoomName(data.roomName);
				// setUsersList(data.usernamesList);
			// 	setUsersList(data)
			// });
		}
	}, [username, params, socket]);

	return (
		<div>
			{username ? (
				<>
					<Paper elevation={3} className="paper">
						<Typography variant="h5" component="h5">
							{/* {roomName} */}
							Room name
						</Typography>
						Người chơi ({usersList.length}/10)
						<Grid container spacing={2}>
							{usersList.map((user) => (
								<PlayerList key={user} user={user} />
							))}
						</Grid>
					</Paper>
					<Card sx={{ marginTop: '20px' }}>{username}</Card>
				</>
			) : (
				<CreateUsernameInRoom />
			)}
		</div>
	);
}
