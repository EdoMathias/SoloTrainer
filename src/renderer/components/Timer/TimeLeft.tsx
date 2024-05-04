import React, { useEffect, useMemo, useState } from "react";
import TimerModel from "../../../models/timer-model";

function TimeLeft() {
  const [allotedTime, setAllotedTime] = useState<TimerModel>(
    new TimerModel(0, 0, 0)
  );
  const [timeLeft, setTimeLeft] = useState<TimerModel>(new TimerModel(0, 0, 0));
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const getTimer = async () => {
      try {
        const timer = await window.timerApi.getTimer();
        setAllotedTime(timer);
        setTimeLeft(timer);
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
    <div>
      <h2>
        TIME LEFT: {timeLeft.hours} HOURS, {timeLeft.minutes} MINUTES,
        {timeLeft.seconds} SECONDS
      </h2>
      <button onClick={handleStartStop}>{isActive ? "Pause" : "Start"}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default TimeLeft;
