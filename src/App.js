import React, { useState, useEffect } from 'react';
import './App.css'; // Optional for custom styling

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Update time every 10 ms
      }, 10);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const startStopwatch = () => setIsRunning(true);
  const stopStopwatch = () => setIsRunning(false);
  const resetStopwatch = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (time) => {
    const milliseconds = String((time % 1000) / 10).padStart(2, '0');
    const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, '0');
    const minutes = String(Math.floor((time / (1000 * 60)) % 60)).padStart(2, '0');
    const hours = String(Math.floor(time / (1000 * 60 * 60))).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="time-display">{formatTime(time)}</div>
      <div className="controls">
        <button onClick={isRunning ? stopStopwatch : startStopwatch}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={resetStopwatch}>Reset</button>
        <button onClick={recordLap} disabled={!isRunning}>Lap</button>
      </div>
      <ul className="lap-list">
        {laps.map((lap, index) => (
          <li key={index}>{formatTime(lap)}</li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Stopwatch />
    </div>
  );
}

export default App;
