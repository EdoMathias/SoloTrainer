import { useEffect, useState } from "react";
import ExerciseModel from "../../../../models/exercise-model";
import MenuButton from "../../MenuButton/MenuButton";
import TimeLeft from "../../Timer/TimeLeft";
import "./DailyQuest.css";
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
    <div className="daily-quest-container">
      <h3 className="daily-quest-title">
        {"[Daily Quest: Strength Training has arrived.]"}
      </h3>
      <h2 className="daily-quest-title goal-title">GOAL</h2>
      <ExerciseList exercises={dailyQuest} />
      {/* <AllotedTime /> */}
      <TimeLeft />
      <hr />
      <div>
        <MenuButton name="SETTINGS" navTo="settings" />
        <MenuButton name="MAIN MENU" navTo="mainMenu" />
      </div>
    </div>
  );
}

export default DailyQuest;
