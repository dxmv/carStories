import React from "react";
import Field from "../../components/AccountField/Field";
import { BsFillKeyFill } from "react-icons/bs";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";

export default function FirstPage({ nextPage }: { nextPage: () => void }) {
	return (
		<>
			<Field
				type="text"
				icon={<AiOutlineUser className="absolute top-2 left-2" size={32} />}
				placeholder="Username ..."
			/>
			<Field
				type="email"
				icon={<AiOutlineMail className="absolute top-2 left-2" size={32} />}
				placeholder="Email ..."
			/>
			<Field
				type="password"
				icon={<BsFillKeyFill className="absolute top-2 left-2" size={32} />}
				placeholder="Password ..."
			/>
			<button
				className="mb-6 bg-orange-400 w-1/4 p-3 font-bold text-white rounded-lg text-lg"
				onClick={nextPage}
			>
				NEXT
			</button>
		</>
	);
}
