import React, { useContext, useEffect, useState } from 'react';
import { Paper, Typography, TextField, Button, Box } from '@mui/material';
import { AppContext } from '../../../context/AppProvider';
import { useHistory } from 'react-router-dom';

export default function CreateUsername() {
	const { socket, username } = useContext(AppContext);
	const [roomName, setRoomName] = useState('');
	const history = useHistory();

	const changeRoomName = (e) => {
		setRoomName(e.target.value);
	};

	const handleClick = () => {
		socket.emit('create-room');
	};

	useEffect(() => {
		socket.on('create-room-success', (id) => {
			history.push(`/room/${id}`);
		});
	}, []);

	return (
		<>
			<Button
				variant="text"
				onClick={() => {
					history.goBack();
				}}
			>
				Back
			</Button>
			<Paper elevation={3} className="paper">
				<Typography variant="h5" component="h5">
					Tạo phòng
				</Typography>
				<Box>
					<Typography variant="subtitle1" component="div" sx={{ fontSize: '20px' }}>
						Tên phòng
					</Typography>
					<TextField
						size="small"
						variant="outlined"
						fullWidth
						value={roomName}
						onChange={changeRoomName}
					></TextField>
				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
					<Button variant="contained" onClick={handleClick}>
						Tạo phòng
					</Button>
				</Box>
			</Paper>
		</>
	);
}
