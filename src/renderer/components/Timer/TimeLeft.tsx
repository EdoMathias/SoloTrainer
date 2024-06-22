import React, { useEffect, useMemo, useState } from "react";
import TimerModel from "../../../models/timer-model";
import "./TimeLeft.css";

function TimeLeft() {
  const [allotedTime, setAllotedTime] = useState<TimerModel>(
    new TimerModel(0, 0, 0)
  );
  const [timeLeft, setTimeLeft] = useState<TimerModel>(new TimerModel(0, 0, 0));
  const [isActive, setIsActive] = useState(false);
  const [isTimerSet, setIsTimerSet] = useState(false);

  useEffect(() => {
    const getTimer = async () => {
      try {
        const timer = await window.timerApi.getTimer();
        if (!timer) {
          return;
        }
        setAllotedTime(timer);
        setTimeLeft(timer);

        Object.values(timer).every((timeKey) => timeKey === 0)
          ? setIsTimerSet(true)
          : setIsTimerSet(false);
      } catch (error) {
        console.error("Error fetching timer:", error);
      }
    };

    getTimer();
  }, []);

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        if (
          timeLeft.hours === 0 &&
          timeLeft.minutes === 0 &&
          timeLeft.seconds === 0
        ) {
          clearInterval(interval);
          setIsActive(false);
          window.timerApi.timerComplete();
          handleReset();
        } else {
          setTimeLeft((prevDuration) => {
            let hours = prevDuration.hours;
            let minutes = prevDuration.minutes;
            let seconds = prevDuration.seconds - 1;
            if (seconds < 0) {
              seconds = 59;
              minutes -= 1;
              if (minutes < 0) {
                minutes = 59;
                hours -= 1;
              }
            }
            return { hours, minutes, seconds };
          });
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const handleStartStop = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(allotedTime);
  };

  return (
    <div className="time-left-container">
      <h2 className="time-left-title">
        TIME LEFT: {<br />} {timeLeft.hours} HOURS, {timeLeft.minutes} MINUTES,
        {timeLeft.seconds} SECONDS
      </h2>
      <div className="time-left-buttons-container">
        <button
          className="time-left-button"
          disabled={isTimerSet}
          onClick={handleStartStop}
        >
          {isActive ? "PAUSE TIMER" : "START TIMER"}
        </button>
        <button
          className="time-left-button"
          disabled={isTimerSet}
          onClick={handleReset}
        >
          RESET TIMER
        </button>
      </div>
    </div>
  );
}

export default TimeLeft;
