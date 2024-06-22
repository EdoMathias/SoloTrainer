class ExerciseModel {
  constructor(
    public id: number,
    public name: string,
    public completed: boolean,
    public repetitions: number,
    public notificationSent: boolean,
    public currentRepetitions: number = 0
  ) {}

  // [key: string]: string | number | boolean;
}

export default ExerciseModel;
