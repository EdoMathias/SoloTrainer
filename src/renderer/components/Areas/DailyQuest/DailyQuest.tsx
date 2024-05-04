import { useEffect, useState } from "react";
import ExerciseModel from "../../../../models/exercise-model";
import AllotedTime from "../../Timer/AllotedTime";
import TimeLeft from "../../Timer/TimeLeft";
import ExerciseList from "./ExerciseList";

function DailyQuest() {
  const [dailyQuest, setDailyQuest] = useState<ExerciseModel[]>([]);

  useEffect(() => {
    const getExercises = async () => {
      try {
        const exercises = await window.trainerApi.getExercises();
        console.log("Exercises:", exercises);

        setDailyQuest(exercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    getExercises();
  }, []);

  return (
    <div>
      <h3>{"[Daily Quest: Strength Training has arrived.]"}</h3>
      <h2>GOAL</h2>
      <hr />
      <ExerciseList exercises={dailyQuest} />
      <AllotedTime />
      <TimeLeft />
    </div>
  );
}

export default DailyQuest;
