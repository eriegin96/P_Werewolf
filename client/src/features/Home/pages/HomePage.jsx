import React from 'react';
import { Grid } from '@mui/material';
import CreateUsername from '../components/CreateUsername';

export default function HomePage() {
	return (
		<React.Fragment>
			<Grid container spacing={3}>
				<Grid item sm={3}></Grid>
				<Grid item xs={12} sm={6}>
					<CreateUsername />
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
