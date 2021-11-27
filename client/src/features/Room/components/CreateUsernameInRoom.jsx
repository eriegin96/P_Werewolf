import React, { useContext, useEffect, useState } from 'react';
import { Paper, Typography, TextField, Button, Box } from '@mui/material';
import { AppContext } from '../../../context/AppProvider';
import { useHistory } from 'react-router-dom';

export default function CreateUsernameInRoom() {
	const { socket, setUsername } = useContext(AppContext);
	const [usernameInput, setUsernameInput] = useState('');
	const history = useHistory();

	const changeUsername = (e) => {
		setUsernameInput(e.target.value);
	};

	const handleClick = () => {
		socket.emit('create-username-in-room', usernameInput);
	};

	useEffect(() => {
		socket.on('create-username-fail', () => {
			alert('Tên tài khoản đã được sử dụng. Vui lòng tạo tài khoản khác');
		});

		socket.on('create-username-in-room-success', (username) => {
			setUsername(username);
		});
	}, []);
	

	return (
		<>
			<Paper elevation={3} className="paper">
				<Typography variant="h5" component="h5">
					Tạo tài khoản
				</Typography>
				<Box>
					<Typography variant="subtitle1" component="div" sx={{ fontSize: '20px' }}>
						Tên tài khoản
					</Typography>
					<TextField
						size="small"
						variant="outlined"
						fullWidth
						value={usernameInput}
						onChange={changeUsername}
					></TextField>
				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
					<Button variant="contained" onClick={handleClick}>
						Tạo tài khoản
					</Button>
				</Box>
			</Paper>
		</>
	);
}
