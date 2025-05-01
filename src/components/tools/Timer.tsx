'use client';

import { useState, useEffect } from 'react';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-5xl font-bold">{formatTime(seconds)}</div>
      <div className="flex gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:scale-105 transition"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="bg-red-500 text-white px-4 py-2 rounded hover:scale-105 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

