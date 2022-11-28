import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Field from "../AccountField/Field";

export default function Search() {
	const [searchValue, setSearch] = useState<string>("");

	return (
		<div className="w-1/6 relative">
			<Field
				type="text"
				icon={<AiOutlineSearch className="absolute top-2 left-2" size={32} />}
				placeholder="Search"
				error=""
				value={searchValue}
				setValue={e => {
					setSearch(e.target.value);
				}}
				className="w-full relative h-full"
			/>
		</div>
	);
}
