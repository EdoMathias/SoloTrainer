import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import ExerciseModel from "../../../models/exercise-model";
import "./ExerciseForm.css";

function ExerciseForm() {
  const { register, handleSubmit, setValue } = useForm<ExerciseModel>();

  // Change to set the amount of exercises
  const exerciseArrayLength: number = 4;

  useEffect(() => {
    const getExercises = async () => {
      try {
        const exercises = await window.trainerApi.getExercises();
        if (!exercises) {
          return;
        }
        exercises.forEach((exercise) => {
          setValue(`exercise${exercise.id}`, exercise.name);
          setValue(`exercise${exercise.id}_number`, exercise.repetitions);
        });
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    getExercises();
  }, []);

  const onSubmit = (data: ExerciseModel) => {
    const exercises: ExerciseModel[] = [];
    for (let i = 0; i < exerciseArrayLength; i++) {
      const name = data[`exercise${i + 1}`] as string;
      const repetitions = data[`exercise${i + 1}_number`] as number;
      if (name && repetitions) {
        exercises.push(new ExerciseModel(i + 1, name, repetitions, false));
      }
    }
    window.trainerApi.setExercises(exercises);
    console.log(exercises);
  };

  return (
    <form className="exercises-form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="exercises-form-header">EXERCISES</h1>
      <div className="label-container">
        <label className="exercises-form-label">Exercises</label>
        <label className="exercises-form-label">Repetitions</label>
      </div>
      {[...Array(exerciseArrayLength)].map((_, index) => (
        <div key={index}>
          <input
            className="exercises-form-input"
            type="text"
            id={`exercise${index + 1}`}
            name={`exercise${index + 1}`}
            {...register(`exercise${index + 1}`)}
          />
          <input
            className="exercises-form-input"
            type="number"
            id={`exercise${index + 1}_number`}
            name={`exercise${index + 1}_number`}
            {...register(`exercise${index + 1}_number`)}
          />
        </div>
      ))}
      <button className="exercises-submit-button" type="submit">
        Set Exercises
      </button>
    </form>
  );
}

export default ExerciseForm;
