import React from 'react';
import { Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Header() {
	return (
		<Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
			<Link underline="none" component={RouterLink} to="/">
				{/* <Link underline="none" href="/"> */}
				Werewolf OneNight
			</Link>
		</Typography>
	);
}
