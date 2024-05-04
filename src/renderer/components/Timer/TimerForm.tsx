import { useForm } from "react-hook-form";
import TimerModel from "../../../models/timer-model";

function TimerForm() {
  const { register, handleSubmit } = useForm<TimerModel>();

  const onSubmit = (data: TimerModel) => {
    const timer = new TimerModel(
      data.hours as number,
      data.minutes as number,
      data.seconds as number
    );
    window.timerApi.setTimer(timer);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor={`timer_hours`}>Hours:</label>
        <input
          type="number"
          id={`timer_hours`}
          name={`timer_hours`}
          defaultValue={0}
          min={0}
          max={4}
          {...register(`hours`)}
        />
        <label htmlFor={`timer_minutes`}>Minutes:</label>
        <input
          type="number"
          id={`timer_minutes`}
          name={`timer_minutes`}
          defaultValue={0}
          min={0}
          max={59}
          {...register(`minutes`)}
        />
        <label htmlFor={`timer_seconds`}>Seconds:</label>
        <input
          type="number"
          id={`timer_seconds`}
          name={`timer_seconds`}
          defaultValue={0}
          min={0}
          max={59}
          {...register(`seconds`)}
        />
      </div>

      <button type="submit">Set timer</button>
    </form>
  );
}

export default TimerForm;
