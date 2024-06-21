import React, { useEffect, useState } from "react";
import TimerModel from "../../../models/timer-model";
import "./AllotedTime.css";

function AllotedTime() {
  const [allotedTime, setAllotedTime] = useState<TimerModel>(
    new TimerModel(0, 0, 0)
  );

  useEffect(() => {
    const getTimer = async () => {
      try {
        const timer = await window.timerApi.getTimer();
        if (!timer) {
          return;
        }
        setAllotedTime(timer);
      } catch (error) {
        console.error("Error fetching timer:", error);
      }
    };

    getTimer();
  }, []);

  return (
    <div>
      <h2 className="alloted-time-title">
        ALLOTED TIME: {allotedTime.hours} HOURS, {allotedTime.minutes} MINUTES,
        {allotedTime.seconds} SECONDS
      </h2>
    </div>
  );
}

export default AllotedTime;
