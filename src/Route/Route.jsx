import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Member from "../pages/Member/Member";
import PrivateRoute from "./PrivateRoute";
import Root from "./Root";
import Login from "../pages/private/public/login";
import Register from "../pages/private/public/Register";
import Setting from "../pages/Setting/Setting";
import Profile from "../pages/Profile/Profile";
import MemberSummary from "../pages/Summary/MemberSummary";
import Members from "../pages/Members/Members";
import Users from "../pages/Users/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Root />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/member",
        element: <Member />,
      },
      {
        path: "/memberSummary",
        element: <MemberSummary />,
      },
      // {
      //     path:"/members",
      //     element:<Members/>,
      // },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/setting",
        element: <Setting />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
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

export default router;
