class ExerciseModel {
  constructor(public name: string, public repetitions: number) {}

  [key: string]: string | number;
}

export default ExerciseModel;
