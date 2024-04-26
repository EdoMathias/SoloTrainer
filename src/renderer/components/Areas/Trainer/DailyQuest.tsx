import React, { useEffect, useState } from 'react';
import ExerciseModel from '../../../../models/exercise-model';

function DailyQuest() {
  const [dailyQuest, setDailyQuest] = useState<ExerciseModel[]>([]);

  useEffect(() => {
    const getExercises = async () => {
      try {
        const exercises = await window.trainerApi.getExercises();
        console.log('Exercises:', exercises);
        setDailyQuest(exercises);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    getExercises();
  }, []);

  return (
    <div>
      <h1>DAILY QUEST: Strength Training</h1>
      <hr />
      <ol>
        {dailyQuest?.map((exercise, index) => (
          <li key={index}>
            {exercise.name} - {exercise.repetitions} reps
          </li>
        ))}
      </ol>
    </div>
  );
}

export default DailyQuest;
