// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.

import React from "react";
import Login from "../../pages/Login/Login";
import { getToken } from "../../utils/jwtTokenHandle";

export default function PrivateRoute({
	component,
}: {
	component: React.ReactElement<any, any>;
}) {
	const token = getToken();

	if (!token) {
		return <Login />;
	}

	return component;
}
