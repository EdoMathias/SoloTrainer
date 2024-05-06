import { stat } from 'original-fs';
import React, { useEffect, useMemo, useRef, useState } from 'react';

interface Exercise {
  id: number;
  name: string;
  repetitions: number;
  completed: boolean;
}

interface ExerciseState extends Exercise {
  count: number;
  notificationSent?: boolean;
}

interface Props {
  exercises: Exercise[];
}

const ExerciseList: React.FC<Props> = ({ exercises }) => {
  const [states, setStates] = useState<ExerciseState[]>([]);
  const [allCompleted, setAllCompleted] = useState(false);

  useEffect(() => {
    if (!exercises) {
      return;
    }

    const initialStates: ExerciseState[] = exercises.map((exercise) => {
      return {
        ...exercise,
        repetitions: parseInt(String(exercise.repetitions), 10),
        count: 0,
        completed: false,
        notificationSent: false,
      };
    });
    setStates(initialStates);
  }, [exercises]);

  useEffect(() => {
    states.forEach((state, index) => {
      if (state.completed && !state.notificationSent) {
        window.trainerApi.exerciseComplete(exercises[index].name);
        setStates((prevStates) => {
          return prevStates.map((prevState, i) => {
            if (i === index) {
              return { ...prevState, notificationSent: true };
            }
            return prevState;
          });
        });
      }
    });
  }, [states]);

  useEffect(() => {
    if (states.length === 0) {
      return;
    }
    const isAllComplete = states.every((state) => {
      state.completed && state.notificationSent;
    });
    console.log('completed: ', isAllComplete);
    setAllCompleted(isAllComplete);
  }, [states]);

  useEffect(() => {
    if (allCompleted) {
      window.trainerApi.allExercisesComplete();
    }
  }, [allCompleted]);

  const handleIncrement = (index: number) => {
    setStates((prevStates) => {
      return prevStates.map((prevState, i) => {
        if (i === index) {
          const updatedState = { ...prevState, count: prevState.count + 1 };
          if (
            updatedState.count === updatedState.repetitions &&
            !updatedState.completed
          ) {
            updatedState.completed = true; // Set completed flag to true
          }
          return updatedState;
        }
        return prevState;
      });
    });
  };

  const handleDecrement = (index: number) => {
    setStates((prevStates) => {
      return prevStates.map((prevState, i) => {
        if (i === index) {
          return { ...prevState, count: prevState.count - 1 };
        }
        return prevState;
      });
    });
  };

  return (
    <div>
      {states.map((state, index) => (
        <div key={index}>
          <p>
            {state.name}{' '}
            <button
              disabled={state.count === 0 || state.completed}
              onClick={() => handleDecrement(index)}
            >
              -
            </button>
            <button
              disabled={state.count === state.repetitions}
              onClick={() => handleIncrement(index)}
            >
              +
            </button>{' '}
            {`[${state.count}/${state.repetitions}]`}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ExerciseList;
