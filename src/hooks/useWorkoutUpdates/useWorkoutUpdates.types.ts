
import { ApiResponse } from "api";
import { UpdateWorkoutProps } from "types";
import { WorkoutLog } from "types/WorkoutLog";


export interface WorkoutCompleteProps {

  workoutLog: WorkoutLog;
  workoutUpdate: UpdateWorkoutProps;
}

export interface UseWorkoutUpdatesData {

  updateWorkout: (props: UpdateWorkoutProps) => Promise<ApiResponse<{}>>;
  logWorkout: (props: WorkoutLog) => Promise<ApiResponse<{}>>;
}

