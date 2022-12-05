import React, { useRef, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useChangeCaptionMutation } from "../../redux/api/postSlice";

export default function UserDescription({
	id,
	text,
	refetch,
}: {
	id: string;
	text: string;
	refetch: () => void;
}) {
	const [edit, setEdit] = useState<boolean>(false);
	const editRef = useRef<HTMLInputElement | null>(null);
	const [trigger] = useChangeCaptionMutation();

	const handleEdit = () => setEdit(prev => !prev);

	const handleChange = async () => {
		if (editRef.current) {
			await trigger({ id: id, caption: editRef.current.value });
			await refetch();
			handleEdit();
		}
	};

	return (
		<div className="border-b-4 pb-2 flex justify-between  text-lg">
			{edit ? (
				<div className="flex flex-col">
					<input type="text" ref={editRef} />
					<div>
						<button className="mr-2" onClick={handleChange}>
							Save
						</button>
						<button onClick={handleEdit}>Cancel</button>
					</div>
				</div>
			) : (
				<p
					id="description"
					className="font-semibold text-2xl"
					style={{ height: "6%" }}
				>
					{text}
				</p>
			)}

			<AiOutlineEdit size={32} onClick={handleEdit} />
		</div>
	);
}
