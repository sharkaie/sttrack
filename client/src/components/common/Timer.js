import { useState } from 'react'
import services from '../../services/auth';

const CurrentTime = () => {

    let time = 0;
    function getCurrTime(){
        console.log('called');
        return new Date().getTime();
    }
    setInterval(getCurrTime, 1000);

    
}

const functions = {
    CurrentTime
}

export default functions;
