import React from "react";
import Home from "./pages/Home/Home";
import "./index.css";
import Nav from "./components/Nav/Nav";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostPage from "./pages/Post/PostPage";
import NewPost from "./pages/CreatePost/NewPost";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

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
		path: "/post/:id",
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
		path: "/user",
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
]);

function App() {
	return (
		<div className="w-screen h-screen">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;