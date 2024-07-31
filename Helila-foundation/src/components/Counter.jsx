import React, { useState, useEffect } from 'react';

export default function Counter({ target, speed }) {
    const [count, setCount] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount + 1 === target) {
                    setIsRunning(false);
                    return prevCount + 1;
                }
                return prevCount + 1;
            });
        }, speed);

        return () => clearInterval(interval);
    }, [isRunning, target]);

    return (
        <div>
            {count}
        </div>
    );
};