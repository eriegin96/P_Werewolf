import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import '@fontsource/roboto';

import { AppContext } from './context/AppProvider';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';
import HomePage from './features/Home/pages/HomePage';
import LobbyPage from './features/Room/pages/LobbyPage';
import WaitingRoomPage from './features/Room/pages/WaitingRoomPage';
import CreateRoom from './features/Room/components/CreateRoom';

function App() {
	return (
		<React.Fragment>
			<Header />
			<Container>
				<Switch>
					<Route path="/room/:id" component={WaitingRoomPage} />
					<Route path="/rooms" component={LobbyPage} />
					<Route path="/create" component={CreateRoom} />
					<Route path="/game/:id" component={HomePage} />
					<Route exact path="/" component={HomePage} />
					<Route component={NotFound} />
				</Switch>
			</Container>
		</React.Fragment>
	);
}

export default App;
