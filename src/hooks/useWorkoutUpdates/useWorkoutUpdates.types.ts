
import { UpdateWorkoutProps } from "types";
import { WorkoutLog } from "types/WorkoutLog";


export interface WorkoutCompleteProps {

  workoutLog: WorkoutLog;
  workoutUpdate: UpdateWorkoutProps;
}

export interface UseWorkoutUpdatesData {

  updateWorkout: (props: WorkoutCompleteProps) => Promise<void>;
}

