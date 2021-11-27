import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from './AuthProvider';

const socket = io('localhost:3001');

export const AppContext = createContext();

export default function AppProvider({ children }) {
	const [username, setUsername] = useState();

	useEffect(() => {
		socket.on('create-username-success', (username) => {
			setUsername(username);
		});
	}, [socket, setUsername]);

	return (
		<AppContext.Provider
			value={{
				socket,
				username,
				setUsername,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
