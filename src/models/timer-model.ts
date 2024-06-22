class TimerModel {
  [key: string]: number;
  constructor(
    public hours: number,
    public minutes: number,
    public seconds: number
  ) {}
}

export default TimerModel;
