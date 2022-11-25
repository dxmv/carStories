import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import "./index.css";
import Nav from "./components/Nav/Nav";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostPage from "./pages/Post/PostPage";
import NewPost from "./pages/CreatePost/NewPost";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
import { useLazyGetCurrentUserQuery } from "./redux/api/userSlice";
import EditProfile from "./pages/EditProfile/EditProfile";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<>
				<Nav />
				<Home />
			</>
		),
	},
	{
		path: "/posts/:id",
		element: (
			<>
				<Nav />
				<PostPage />
			</>
		),
	},
	{
		path: "/new_post",
		element: (
			<>
				<Nav />
				<NewPost />
			</>
		),
	},
	{
		path: "/users/:id",
		element: (
			<>
				<Nav />
				<Profile />
			</>
		),
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/edit_user",
		element: (
			<>
				<Nav />
				<EditProfile />
			</>
		),
	},
]);

function App() {
	const dispatch = useDispatch();
	const [trigger, data] = useLazyGetCurrentUserQuery();
	useEffect(() => {
		trigger().then(r => {
			if (r.data) {
				dispatch(setUser(r.data));
			}
		});
	}, []);

	return (
		<div className="w-screen h-screen">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
