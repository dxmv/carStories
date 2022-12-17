// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.

import React from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/jwtTokenHandle";

export default function PrivateRoute({
	component,
}: {
	component: React.ReactElement<any, any>;
}) {
	const user = getToken();
	const navigate = useNavigate();

	if (!user) {
		navigate("/login");
	}

	return component;
}
