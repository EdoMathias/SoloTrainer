import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ExerciseModel from '../../../../models/exercise-model';

function ExerciseForm() {
  const { register, handleSubmit } = useForm<ExerciseModel>();

  const onSubmit = (data: ExerciseModel) => {
    const exercises: ExerciseModel[] = [];
    for (let i = 0; i < 5; i++) {
      const name = data[`exercise${i + 1}`] as string;
      const repetitions = data[`exercise${i + 1}_number`] as number;
      if (name && repetitions) {
        exercises.push(new ExerciseModel(name, repetitions));
      }
    }
    window.trainerApi.setExercises(exercises);
    console.log(exercises);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {[...Array(5)].map((_, index) => (
        <div key={index}>
          <label htmlFor={`exercise${index + 1}`}>Exercise #{index + 1}</label>
          <input
            type="text"
            id={`exercise${index + 1}`}
            name={`exercise${index + 1}`}
            {...register(`exercise${index + 1}`)}
          />
          <input
            type="number"
            id={`exercise${index + 1}_number`}
            name={`exercise${index + 1}_number`}
            {...register(`exercise${index + 1}_number`)}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default ExerciseForm;
