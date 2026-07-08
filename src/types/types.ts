export interface Workout {
  id: number;
  title: string;
  date: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: number;
  name: string;
  sets: Set[];
}

export interface Set {
  id: number;
  reps: number;
  weight: number;
}
