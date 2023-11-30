import React, { useEffect, useState } from 'react'
import services from '../../services/services';

const CurrVideoTimeLeft = (props) => {
    const [timeLeft, setTimeLeft] = useState();

    useEffect(()=>{
        const timer = setTimeout(()=>{
            const timeLeft = services.getTimeRemaining(props.due_date)
            setTimeLeft(`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}min ${timeLeft.seconds}s`);
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft])

    return (
        <>
            {timeLeft}
        </>
    )
}

export default CurrVideoTimeLeft
