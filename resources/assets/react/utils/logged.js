import React from 'react';
import { Route } from 'react-router-dom';

class LoggedRoute extends React.Component {
	isAllowed() {
		let token = localStorage.getItem('token');

		// On ne redirige pas tant qu'on ne possède pas les données de l'utilisateur.
		if (token) {
			return <Route {...props} />;
		}

		window.location.pathname = "/";
	}

}

export default LoggedRoute;
