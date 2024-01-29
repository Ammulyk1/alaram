import React, { useState, useEffect } from 'react';
import './PomodoroTimer.css';
import sound from './assests/sound1.mp3';
import sound2 from './assests/alaram.mp3'; 
const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const [customTime, setCustomTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            playAlarm(sound2); 
            resetTimer();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }

        playAlarm(sound);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(0);
    setSeconds(0);
    setIsCustomizing(false);
  };

  const playAlarm = (alarmSound) => {
    const audio = new Audio(alarmSound);
    audio.play().then(() => {
    }).catch((error) => {
      console.error('Error playing audio:', error);
    });
  };

  const handleCustomTimeChange = (event) => {
    const time = parseInt(event.target.value, 10);
    setCustomTime(isNaN(time) || time < 0 ? '' : time);
  };

  const applyCustomTime = () => {
    if (customTime >= 60) {
      const newMinutes = Math.floor(customTime / 60);
      const newSeconds = customTime % 60;
      setMinutes(newMinutes);
      setSeconds(newSeconds);
    } else {
      setMinutes(0);
      setSeconds(customTime);
    }
    setIsCustomizing(false);
  };

  return (
    <center>
      <div className="pomodoro-timer">
        <h1>Pomodoro Timer</h1>
        <div className="timer-display">
          <h1>
            <span>{String(minutes).padStart('0')}:{String(seconds).padStart(2, '0')}</span>
          </h1>
        </div>
        <div className="timer-controls">
          <button onClick={toggleTimer} className={isActive ? 'active' : ''}>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button className='timer-controls reset' onClick={resetTimer}>Reset</button>
        </div>
        <div className="custom-time-input">
          {isCustomizing ? (
            <div>
              <label htmlFor="customTime">Custom Time </label>
              <input
                type="number"
                id="customTime"
                value={customTime}
                onChange={handleCustomTimeChange}
                disabled={isActive}
              />
              <button onClick={applyCustomTime}>Apply</button>
            </div>
          ) : (
            <button onClick={() => setIsCustomizing(true)}>Customize</button>
          )}
        </div>
      </div>
    </center>
  );
};

export default PomodoroTimer;
