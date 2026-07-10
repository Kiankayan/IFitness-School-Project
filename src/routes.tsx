import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import Profile from "./pages/Profile.tsx";
import Workouts from "./pages/Workouts.tsx";
import NotFound from "./pages/NotFound.tsx";
import WorkoutsDetails from "./pages/WorkoutDetails.tsx";
import WorkoutForm from "./pages/WorkoutForm.tsx";
import ExerciseForm from "./pages/ExerciseForm.tsx";
import ExerciseDetails from "./pages/ExerciseDetails.tsx";
import SetForm from "./pages/SetForm.tsx";

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
      {
        path: "workouts/:id",
        element: <WorkoutsDetails />,
      },
      {
        path: "workouts/new",
        element: <WorkoutForm />,
      },
      {
        path: "workouts/:id/edit",
        element: <WorkoutForm />,
      },
      {
        path: "workouts/:id/exercises/new",
        element: <ExerciseForm />,
      },
      {
        path: "workouts/:id/exercises/:exerciseId",
        element: <ExerciseDetails />,
      },
      {
        path: "workouts/:id/exercises/:exerciseId/sets/new",
        element: <SetForm />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
