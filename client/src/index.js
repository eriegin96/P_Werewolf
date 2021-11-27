import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthProvider from './context/AuthProvider';
import AppProvider from './context/AppProvider';

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<AppProvider>
				<BrowserRouter>
					<CssBaseline />
					<App />
				</BrowserRouter>
			</AppProvider>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
