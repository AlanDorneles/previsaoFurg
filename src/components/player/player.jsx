import { IoPlayCircleSharp,IoPlayForward,IoPlayBack,IoPauseCircleSharp  } from "react-icons/io5";
import { useState } from "react";
import PropTypes from 'prop-types'; 
import styles from  './player.module.css'

export const Player = ({playGif, pauseGif}) => {
    const [isPlay, setIsPlay] = useState(true)

    const handleToggleIcon= () => {
        if(isPlay === false){
            setIsPlay(true)
        }else{
            setIsPlay(false)
        }
    }
    return(
    <div className={`block ${styles.block}`}>
        <div className={styles.container}>
            <IoPlayBack/>
            {isPlay ? <IoPlayCircleSharp onClick={() => {playGif(), handleToggleIcon()}}/>
            : <IoPauseCircleSharp onClick={() => {handleToggleIcon(), pauseGif()}}/>}
            <IoPlayForward/>
        </div>
    </div>
    )
}

Player.propTypes = {
    playGif:PropTypes.func,
    pauseGif:PropTypes.func
}