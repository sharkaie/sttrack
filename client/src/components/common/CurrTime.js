import React, { useEffect, useState } from 'react'

const CurrTime = () => {
    const [time, setTime] = useState();

    useEffect(()=>{
        const timer = setTimeout(()=>{
            // console.log('timeout run');
            let date = new Date();
            setTime(`${("0" + date.getHours()).slice(-2)}:${("0"+date.getMinutes()).slice(-2)} ${("0" + date.getSeconds()).slice(-2)}s`);
            
        }, 1000);
        return () => clearTimeout(timer);
    }, [time])

    return (
        <>
            {time}
        </>
    )
}

export default CurrTime
