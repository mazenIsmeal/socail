import { Navigate } from "react-router-dom";

export default function PostsGuard({ children }) {
  if (localStorage.getItem("token") == null) {
    return <Navigate to={"/login"} />;
  } else {
    return children;
  }
}
