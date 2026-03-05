import { createBrowserRouter } from "react-router-dom";
import Posts from "../pages/Posts/Posts";
import Login from "../pages/Login/Login";
import SingUp from "../pages/SingUp/SingUp";
import Profile from "../pages/Profile/Profile";
import Layout from "../components/Layout/Layout";
import AuthGuard from "../Guard/AuthGuard";
import PostsGuard from "../Guard/PostsGuard";
import SinglePost from "../pages/SinglePost/SinglePost";
import Settings from "../pages/Settings/Settings";
import UserProfile from "../pages/UserProfile/UserProfile";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <PostsGuard>
            <Posts />
          </PostsGuard>
        ),
      },
      {
        path: "login",
        element: (
          <AuthGuard>
            <Login />
          </AuthGuard>
        ),
      },
      {
        path: "singUp",
        element: (
          <AuthGuard>
            <SingUp />
          </AuthGuard>
        ),
      },
      {
        path: "profile",
        element: (
          <PostsGuard>
            <Profile />
          </PostsGuard>
        ),
      },
      {
        path: "settings",
        element: (
          <PostsGuard>
            <Settings />
          </PostsGuard>
        ),
      },
      {
        path: "singlePost/:id",
        element: (
          <PostsGuard>
            <SinglePost />
          </PostsGuard>
        ),
      },
      {
        path: "userProfile/:id",
        element: (
          <PostsGuard>
            <UserProfile />
          </PostsGuard>
        ),
      },
    ],
  },
]);
