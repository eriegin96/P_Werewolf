import React from 'react';
import { Card, Grid } from '@mui/material';

export default function RoomList({ roomList }) {
	return (
		<div>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					Room List
				</Grid>
				{roomList.length === 0 ? (
					<Grid item xs={12}>
						No rooms
					</Grid>
				) : (
					roomList.map((room) => (
						<Grid item xs={6} md={3} key={room}>
							<Card variant="outlined">{room}</Card>
						</Grid>
					))
				)}
			</Grid>
		</div>
	);
}
