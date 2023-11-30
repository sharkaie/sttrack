import React, { useEffect, useState } from 'react'
import services from '../../services/services';

const TimeLeft = () => {
    const [timeLeft, setTimeLeft] = useState();

    useEffect(()=>{
        const timer = setTimeout(()=>{
            const timeLeft = services.getTimeRemaining(new Date())
            setTimeLeft(`${timeLeft.hours}h ${timeLeft.minutes}min ${timeLeft.seconds}s`);
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft])

    return (
        <>
            {timeLeft}
        </>
    )
}

export default TimeLeft
