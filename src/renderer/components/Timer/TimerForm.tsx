import { useEffect } from "react";
import { useForm } from "react-hook-form";
import TimerModel from "../../../models/timer-model";
import "./TimerForm.css";

function TimerForm() {
  const { register, handleSubmit, setValue } = useForm<TimerModel>();

  useEffect(() => {
    const getTimer = async () => {
      try {
        const timer = await window.timerApi.getTimer();
        if (!timer) {
          return;
        }
        setValue("hours", timer.hours);
        setValue("minutes", timer.minutes);
        setValue("seconds", timer.seconds);
      } catch (error) {
        console.error("Error fetching timer:", error);
      }
    };

    getTimer();
  }, []);

  const onSubmit = (data: TimerModel) => {
    // Check if data contains NaN and convert to 0
    for (let timeKey in data) {
      if (isNaN(data[timeKey])) {
        data[timeKey] = 0;
      }
    }

    const timer = new TimerModel(
      data.hours as number,
      data.minutes as number,
      data.seconds as number
    );

    window.timerApi.setTimer(timer);
  };

  return (
    <form className="time-form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="time-form-header">TIMER</h1>
      <div>
        <label className="time-form-label" htmlFor={`timer_hours`}>
          HOURS:
        </label>
        <input
          className="time-form-input"
          type="number"
          id={`timer_hours`}
          name={`timer_hours`}
          defaultValue={0}
          min={0}
          max={4}
          {...register(`hours`)}
        />
        <label className="time-form-label" htmlFor={`timer_minutes`}>
          MINUTES:
        </label>
        <input
          className="time-form-input"
          type="number"
          id={`timer_minutes`}
          name={`timer_minutes`}
          defaultValue={0}
          min={0}
          max={59}
          {...register(`minutes`)}
        />
        <label className="time-form-label" htmlFor={`timer_seconds`}>
          SECONDS:
        </label>
        <input
          className="time-form-input"
          type="number"
          id={`timer_seconds`}
          name={`timer_seconds`}
          defaultValue={0}
          min={0}
          max={59}
          {...register(`seconds`)}
        />
      </div>

      <button className="timer-submit-button" type="submit">
        Set timer
      </button>
    </form>
  );
}

export default TimerForm;
