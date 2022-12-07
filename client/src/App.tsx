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
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<PrivateRoute
				component={
					<>
						<Nav />
						<Home />
					</>
				}
			/>
		),
	},
	{
		path: "/posts/:id",
		element: (
			<PrivateRoute
				component={
					<>
						<Nav />
						<PostPage />
					</>
				}
			/>
		),
	},
	{
		path: "/new_post",
		element: (
			<PrivateRoute
				component={
					<>
						<Nav />
						<NewPost />
					</>
				}
			/>
		),
	},
	{
		path: "/users/:id",
		element: (
			<PrivateRoute
				component={
					<>
						<Nav />
						<Profile />
					</>
				}
			/>
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
			<PrivateRoute
				component={
					<>
						<Nav />
						<EditProfile />
					</>
				}
			/>
		),
	},
	{
		path: "/reset_password/:token",
		element: <PrivateRoute component={<ResetPassword />} />,
	},
]);

function App() {
	const dispatch = useDispatch();
	const [trigger] = useLazyGetCurrentUserQuery();
	useEffect(() => {
		trigger().then(r => {
			if (r.data) {
				dispatch(setUser(r.data));
				console.log(r.data);
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
