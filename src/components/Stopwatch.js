import React, { useState, useRef } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [recordedTimes, setRecordedTimes] = useState([]);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10); // Increment time every 10ms
      }, 10);
    }
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setRecordedTimes(prevTimes => {
      const newTimes = [...prevTimes, time];
      return newTimes.length > 5 ? newTimes.slice(newTimes.length - 5) : newTimes;
    });
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (time) => {
    const milliseconds = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
  };

  return (
    <div className="stopwatch-container">
      <div className="stopwatch-display">{formatTime(time)}</div>
      <div className="stopwatch-controls">
        <button onClick={startTimer} className="start-button" disabled={isRunning}>Start</button>
        <button onClick={stopTimer} className="stop-button" disabled={!isRunning}>Stop</button>
        <button onClick={resetTimer} className="reset-button">Reset</button>
      </div>
      {recordedTimes.length > 0 && (
        <div className="recorded-times">
          <h3>Last 5 Time Records</h3>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recordedTimes.map((record, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{formatTime(record)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
