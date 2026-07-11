import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import Profile from "./pages/Profile.tsx";
import NotFound from "./pages/NotFound.tsx";

import {
  Workouts,
  WorkoutsDetails,
  WorkoutForm,
} from "./pages/workouts/index.ts";

import { ExerciseForm, ExerciseDetails } from "./pages/exercises/index.ts";

import { SetDetails, SetForm } from "./pages/sets/index.ts";

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
        path: "workouts/:id/exercises/:exerciseId/edit",
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
      {
        path: "workouts/:id/exercises/:exerciseId/sets/:setId/edit",
        element: <SetForm />,
      },
      {
        path: "workouts/:id/exercises/:exerciseId/sets/:setId",
        element: <SetDetails />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
