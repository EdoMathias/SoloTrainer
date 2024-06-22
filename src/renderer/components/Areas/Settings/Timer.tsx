import { useEffect, useState } from "react";

function Timer() {
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        if (
          duration.hours === 0 &&
          duration.minutes === 0 &&
          duration.seconds === 0
        ) {
          clearInterval(interval);
          setIsActive(false);
          window.timerApi.timerComplete();
        } else {
          setDuration((prevDuration) => {
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
  }, [isActive, duration]);

  const handleStartStop = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setDuration({ hours: 0, minutes: 0, seconds: 0 });
  };

  return (
    <div>
      <div>
        <label>
          Hours:
          <input
            type="number"
            value={duration.hours}
            onChange={(e) =>
              setDuration({ ...duration, hours: parseInt(e.target.value) })
            }
          />
        </label>
        <br />
        <label>
          Minutes:
          <input
            type="number"
            value={duration.minutes}
            onChange={(e) =>
              setDuration({ ...duration, minutes: parseInt(e.target.value) })
            }
          />
        </label>
        <br />
        <label>
          Seconds:
          <input
            type="number"
            value={duration.seconds}
            onChange={(e) =>
              setDuration({ ...duration, seconds: parseInt(e.target.value) })
            }
          />
        </label>
      </div>
      <div>
        <button onClick={handleStartStop}>
          {isActive ? "Pause" : "Start"}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        <p>
          {String(duration.hours).padStart(2, "0")}:
          {String(duration.minutes).padStart(2, "0")}:
          {String(duration.seconds).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}

export default Timer;
