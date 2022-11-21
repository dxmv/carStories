import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { useAppSelector } from "../../hooks";
import { useLazyGetUserByIdQuery } from "../../redux/api/userSlice";
import CurrentProfile from "./CurrentProfile";

import UserProfile from "./UserProfile";

export default function Profile() {
	const { id } = useParams();
	const reduxUser = useAppSelector(state => state.user.user);
	const [isCurrent, setIsCurrent] = useState<boolean>(false);

	useEffect(() => {
		if (id == reduxUser?.userId) {
			setIsCurrent(true);
		}
	}, [reduxUser, id]);

	if (!reduxUser) {
		return <Loading />;
	}

	if (isCurrent) {
		return <CurrentProfile user={reduxUser} />;
	}

	return <UserProfile id={`${id}`} />;
}
