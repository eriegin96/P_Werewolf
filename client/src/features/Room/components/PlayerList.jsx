import React, { useState } from 'react';
import { Typography, Grid, Avatar, Stack, TextField } from '@mui/material';

export default function PlayerList({user}) {
	const [isEditMode, setIsEditMode] = useState(false);
	const [username, setUsername] = useState(user);

	return (
		<Grid item xs={6} md={3}>
			<Stack direction="row" spacing={2}>
				<Avatar />
				{isEditMode ? (
					<TextField
						variant="outlined"
						size="small"
						value={username}
            autoFocus
						onChange={(e) => setUsername(e.target.value)}
            onBlur={() => setIsEditMode(false)}
					></TextField>
				) : (
					<Typography
						variant="body1"
						component="span"
						onClick={() => setIsEditMode(true)}
						className='player-list__name'
					>
						{username}
					</Typography>
				)}
			</Stack>
		</Grid>
	);
}
