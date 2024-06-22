import React, { useEffect, useMemo, useRef, useState } from "react";
import "./ExerciseList.css";

interface Exercise {
  id: number;
  name: string;
  completed: boolean;
  repetitions: number;
  currentRepetitions?: number;
  notificationSent: boolean;
}

interface Props {
  exercises: Exercise[];
}

const ExerciseList: React.FC<Props> = ({ exercises }) => {
  const [states, setStates] = useState<Exercise[]>([]);
  const [allCompleted, setAllCompleted] = useState(false);

  useEffect(() => {
    if (!exercises) {
      return;
    }

    const initialStates: Exercise[] = exercises.map((exercise) => {
      return {
        ...exercise,
        repetitions: parseInt(String(exercise.repetitions), 10),
        currentRepetitions: exercise.currentRepetitions,
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
              return { ...prevState, completed: true, notificationSent: true };
            }
            console.log(prevState);

            return prevState;
          });
        });
      }
    });
  }, [states]);

  const handleIncrement = (index: number) => {
    setStates((prevStates) => {
      return prevStates.map((prevState, i) => {
        if (i === index) {
          const updatedState = {
            ...prevState,
            currentRepetitions: prevState.currentRepetitions + 1,
          };
          if (
            updatedState.currentRepetitions === updatedState.repetitions &&
            !updatedState.completed
          ) {
            updatedState.completed = true; // Set completed flag to true
          }
          window.trainerApi.incrementRepetitions(updatedState.name);
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
          return {
            ...prevState,
            currentRepetitions: prevState.currentRepetitions - 1,
          };
        }
        return prevState;
      });
    });
  };

  if (states.length === 0) {
    return <div className="exercise-name-label">{`[NO EXERCISES SET]`}</div>;
  }

  return (
    <div className="exercise-list-container">
      {states.map((state, index) => (
        <div className="exercise-container" key={index}>
          <p className="exercise-name-label">{state.name}</p>
          <div className="exercise-state-container">
            <div className="exercise-state-button-container">
              <button
                className="exercise-state-button"
                disabled={state.currentRepetitions === 0 || state.completed}
                onClick={() => handleDecrement(index)}
              >
                -
              </button>
              <button
                className="exercise-state-button"
                disabled={
                  state.currentRepetitions === state.repetitions ||
                  state.completed
                }
                onClick={() => handleIncrement(index)}
              >
                +
              </button>
            </div>
            <p className="exercise-state-label">{`[${state.currentRepetitions}/${state.repetitions}]`}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExerciseList;
