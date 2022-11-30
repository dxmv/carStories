import { original } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import { useGetAllUsersQuery } from "../../redux/api/userSlice";
import { User } from "../../types";
import Field from "../AccountField/Field";
import Loading from "../Loading/Loading";
import UserListItem from "../UserListItem/UserListItem";

export default function Search() {
	const [searchValue, setSearch] = useState<string>("");
	const [originalUsers, setOriginal] = useState<Array<User>>([]);
	const [currentUsers, setCurrent] = useState<Array<User>>([]);
	const { data, isLoading, isError } = useGetAllUsersQuery();
	useEffect(() => {
		if (data) {
			setOriginal(data);
			setCurrent(data);
		}
	}, [data]);

	if (isLoading || !data) {
		return <Loading />;
	}

	if (isError) {
		return <ErrorPage />;
	}

	const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
		await setSearch(e.target.value);
		await setCurrent(
			originalUsers.filter(el => el.username.startsWith(e.target.value))
		);
	};

	return (
		<div className="w-1/6 relative overflow-visible">
			<Field
				type="text"
				icon={<AiOutlineSearch className="absolute top-2 left-2" size={32} />}
				placeholder="Search"
				error=""
				value={searchValue}
				setValue={handleSearch}
				className="w-full relative h-full"
			/>
			{searchValue !== "" && (
				<div
					className="absolute border-2 h-40 w-full left-0 bg-white rounded-md"
					style={{ bottom: "-160px", zIndex: 100 }}
				>
					{currentUsers.map(e => (
						<UserListItem username={e.username} image={e.image} id={e.userId} />
					))}
				</div>
			)}
		</div>
	);
}
