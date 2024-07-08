import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw, Coffee, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const PomodoroTimer = () => {
    const [timer, setTimer] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [isWork, setIsWork] = useState(true);
    const [workTime, setWorkTime] = useState(25);
    const [breakTime, setBreakTime] = useState(5);
    const [sessions, setSessions] = useState(0);

    useEffect(() => {
        let interval = null;
        if (isActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((timer) => timer - 1);
            }, 1000);
        } else if (isActive && timer === 0) {
            clearInterval(interval);
            setIsActive(false);
            if (isWork) {
                setSessions((sessions) => sessions + 1);
                setIsWork(false);
                setTimer(breakTime * 60);
            } else {
                setIsWork(true);
                setTimer(workTime * 60);
            }
        }
        return () => clearInterval(interval);
    }, [isActive, timer, isWork, workTime, breakTime]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setIsWork(true);
        setTimer(workTime * 60);
        setSessions(0);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const adjustTime = (isWork, increment) => {
        if (isWork) {
            setWorkTime((prev) => Math.max(1, Math.min(60, prev + increment)));
            if (isWork) setTimer(Math.max(1, Math.min(60, workTime + increment)) * 60);
        } else {
            setBreakTime((prev) => Math.max(1, Math.min(30, prev + increment)));
            if (!isWork) setTimer(Math.max(1, Math.min(30, breakTime + increment)) * 60);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="bg-white rounded-lg shadow-lg p-8 w-96">
                <div className="flex items-center justify-center mb-6">
                    <Clock className="w-8 h-8 text-blue-500 mr-2" />
                    <h1 className="text-2xl font-bold text-gray-800">Pomodoro Timer</h1>
                </div>
                <div className="text-6xl font-bold text-center text-gray-800 mb-4">
                    {formatTime(timer)}
                </div>
                <div className="flex justify-center items-center space-x-2 mb-6">
                    <div className={`text-sm font-semibold ${isWork ? 'text-blue-500' : 'text-gray-400'}`}>Work</div>
                    <div className="w-12 h-6 bg-gray-300 rounded-full p-1 cursor-pointer" onClick={() => {
                        setIsWork(!isWork);
                        setTimer(isWork ? breakTime * 60 : workTime * 60);
                    }}>
                        <div className={`w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${isWork ? 'bg-blue-500 transform translate-x-0' : 'bg-green-500 transform translate-x-6'}`} />
                    </div>
                    <div className={`text-sm font-semibold ${!isWork ? 'text-green-500' : 'text-gray-400'}`}>Break</div>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col items-center">
                        <div className="text-sm font-semibold text-gray-600 mb-1">Work Time</div>
                        <div className="flex items-center">
                            <Button onClick={() => adjustTime(true, -1)} className="p-1 bg-gray-200 hover:bg-gray-300 text-gray-700" variant="ghost">
                                <ChevronDown className="w-4 h-4" />
                            </Button>
                            <span className="mx-2 text-lg font-semibold">{workTime}</span>
                            <Button onClick={() => adjustTime(true, 1)} className="p-1 bg-gray-200 hover:bg-gray-300 text-gray-700" variant="ghost">
                                <ChevronUp className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-sm font-semibold text-gray-600 mb-1">Break Time</div>
                        <div className="flex items-center">
                            <Button onClick={() => adjustTime(false, -1)} className="p-1 bg-gray-200 hover:bg-gray-300 text-gray-700"
                                variant="ghost">
                                <ChevronDown className="w-4 h-4" />
                            </Button>
                            <span className="mx-2 text-lg font-semibold">{breakTime}</span>
                            <Button onClick={() => adjustTime(false, 1)} className="p-1 bg-gray-200 hover:bg-gray-300 text-gray-700" variant="ghost">
                                <ChevronUp className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center space-x-4 mb-6">
                    <Button
                        onClick={toggleTimer}
                        className={`px-6 py-2 rounded-full ${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                            } text-white font-semibold transition duration-300`}
                    >
                        {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                    <Button
                        onClick={resetTimer}
                        className="px-6 py-2 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold transition duration-300"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </Button>
                </div>
                <div className="flex justify-center items-center">
                    <Coffee className="w-5 h-5 text-yellow-500 mr-2" />
                    <span className="text-lg font-semibold text-gray-700">Sessions: {sessions}</span>
                </div>
            </div>
        </div>
    );
};

export default PomodoroTimer;