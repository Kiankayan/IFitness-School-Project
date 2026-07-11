import type { Workout, Exercise, Set } from "../types/types";

const workouts: Workout[] = [
  {
    id: 1,
    title: "Push Day",
    date: "2026-07-08",
    exercises: [
      {
        id: 1,
        name: "Bench Press",
        sets: [
          { id: 1, reps: 8, weight: 80 },
          { id: 2, reps: 8, weight: 80 },
          { id: 3, reps: 6, weight: 85 },
        ],
      },
      {
        id: 2,
        name: "Incline Dumbbell Press",
        sets: [
          { id: 1, reps: 10, weight: 26 },
          { id: 2, reps: 10, weight: 26 },
          { id: 3, reps: 8, weight: 28 },
        ],
      },
      {
        id: 3,
        name: "Shoulder Press",
        sets: [
          { id: 1, reps: 10, weight: 20 },
          { id: 2, reps: 10, weight: 20 },
          { id: 3, reps: 8, weight: 22 },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Pull Day",
    date: "2026-07-09",
    exercises: [
      {
        id: 1,
        name: "Pull Ups",
        sets: [
          { id: 1, reps: 8, weight: 0 },
          { id: 2, reps: 8, weight: 0 },
          { id: 3, reps: 6, weight: 5 },
        ],
      },
      {
        id: 2,
        name: "Barbell Row",
        sets: [
          { id: 1, reps: 10, weight: 60 },
          { id: 2, reps: 10, weight: 60 },
          { id: 3, reps: 8, weight: 65 },
        ],
      },
      {
        id: 3,
        name: "Lat Pulldown",
        sets: [
          { id: 1, reps: 12, weight: 55 },
          { id: 2, reps: 10, weight: 60 },
          { id: 3, reps: 8, weight: 65 },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Leg Day",
    date: "2026-07-10",
    exercises: [
      {
        id: 1,
        name: "Squat",
        sets: [
          { id: 1, reps: 8, weight: 100 },
          { id: 2, reps: 8, weight: 100 },
          { id: 3, reps: 6, weight: 110 },
        ],
      },
      {
        id: 2,
        name: "Romanian Deadlift",
        sets: [
          { id: 1, reps: 10, weight: 80 },
          { id: 2, reps: 10, weight: 80 },
          { id: 3, reps: 8, weight: 90 },
        ],
      },
      {
        id: 3,
        name: "Leg Press",
        sets: [
          { id: 1, reps: 12, weight: 180 },
          { id: 2, reps: 12, weight: 180 },
          { id: 3, reps: 10, weight: 200 },
        ],
      },
    ],
  },
];

export function getWorkouts() {
  return workouts;
}

export function getWorkout(id: number) {
  return workouts.find((workout) => workout.id === id);
}

export function getExercise(workoutId: number, exerciseId: number) {
  const workout = getWorkout(workoutId);
  return workout?.exercises.find((exercise) => exercise.id === exerciseId);
}

export function getSet(workoutId: number, exerciseId: number, setId: number) {
  const exercise = getExercise(workoutId, exerciseId);
  return exercise?.sets.find((set) => set.id === setId);
}

export function saveWorkout(workout: Workout) {
  const workoutInDb = workouts.find((w) => w.id === workout.id);

  if (workoutInDb) {
    workoutInDb.title = workout.title;
    workoutInDb.date = workout.date;
    workoutInDb.exercises = workout.exercises;
    return workoutInDb;
  }

  const newWorkout = {
    ...workout,
    id: workouts.length + 1,
  };

  workouts.push(newWorkout);

  return newWorkout;
}

export function deleteWorkout(id: number) {
  const index = workouts.findIndex((workout) => workout.id === id);

  if (index !== -1) workouts.splice(index, 1);
}

export function saveExercise(workoutId: number, exercise: Exercise) {
  const workout = workouts.find((w) => w.id === workoutId);

  if (!workout) return;

  const exerciseInDb = workout.exercises.find((e) => e.id === exercise.id);

  if (exerciseInDb) {
    exerciseInDb.name = exercise.name;
    exerciseInDb.sets = exercise.sets;

    return exerciseInDb;
  }

  const newExercise = {
    ...exercise,
    id: workout.exercises.length + 1,
  };

  workout.exercises.push(newExercise);

  return newExercise;
}

export function saveSet(workoutId: number, exerciseId: number, set: Set) {
  const workout = getWorkout(workoutId);

  if (!workout) return;

  const exercise = workout.exercises.find((e) => e.id === exerciseId);

  if (!exercise) return;

  const setInDb = exercise.sets.find((s) => s.id === set.id);

  if (setInDb) {
    setInDb.reps = set.reps;
    setInDb.weight = set.weight;

    return setInDb;
  }

  const newSet = {
    ...set,
    id: exercise.sets.length + 1,
  };

  exercise.sets.push(newSet);

  return newSet;
}

export function deleteExercise(workoutId: number, exerciseId: number) {
  const workout = getWorkout(workoutId);

  if (!workout) return;

  const index = workout.exercises.findIndex(
    (exercise) => exercise.id === exerciseId,
  );

  if (index !== -1) {
    workout.exercises.splice(index, 1);
  }
}
