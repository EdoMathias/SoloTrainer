class ExerciseModel {
  constructor(
    public id: number,
    public name: string,
    public repetitions: number,
    public completed: boolean
  ) {}

  [key: string]: string | number | boolean;
}

export default ExerciseModel;
