import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import Profile from "./pages/Profile.tsx";
import Workouts from "./pages/Workouts.tsx";
import NotFound from "./pages/NotFound.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "workouts",
        element: <Workouts />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
