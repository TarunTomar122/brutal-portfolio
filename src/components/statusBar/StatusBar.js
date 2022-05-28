import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./StatusBar.module.css";

import music from "./lofi.mp3";

const StatusBar = ({ toggleAppleMenu, toggleSearchTab, toggleWallpaper }) => {
  const [currentTime, setCurrentTime] = useState("");

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    } // add zero in front of numbers < 10
    return i;
  }

  const getTime = useCallback(() => {
    // console.log("worked");
    var date = new Date();
    var d = date.getDay();
    var h = date.getHours();
    var m = date.getMinutes();
    m = checkTime(m);
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    var currentDayAndTime = `${days[d].substr(0, 3)} ${h}:${m}`;
    setCurrentTime(currentDayAndTime);
  }, []);

  useEffect(() => {
    setInterval(() => {
      getTime();
    }, 1000);
  }, [getTime]);

  const ref = useRef(null);
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);

    if (!click) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  };

  return (
    <>
     <audio src={music} ref={ref} loop />
      <div className={styles.wrapper}>
        <div className={styles.wrapper_inner_left}>
          <img
            onClick={toggleAppleMenu}
            className={styles.appleIcon}
            src="/svgs/apple.svg"
            alt="apple_icon"
          />
          <ul className={styles.left_ul}>
            <li>
              <span>Finder</span>
            </li>
            {/* <li>
              <span>File</span>
            </li>
            <li>
              <span>Edit</span>
            </li>
            <li>
              <span>View</span>
            </li>
            <li>
              <span>Go</span>
            </li>
            <li>
              <span>Window</span>
            </li>
            <li>
              <span>Help</span>
            </li> */}
          </ul>
        </div>
        <div className={styles.wrapper_inner_right}>
          <ul className={styles.right_ul}>
            <li>
              <img src="/images/statusicons/1.png" alt="s1" onClick={toggleWallpaper}/>
            </li>
            <li>
              <img src="/images/statusicons/2.png" alt="s2" />
            </li>
            <li>
              {click && (<img src="/images/statusicons/s.png" alt="s3" onClick={handleClick}/>)}
              {!click && (<img src="/images/statusicons/3.png" alt="s3" onClick={handleClick}/>)}   
            </li>
            <li>
              <img src="/images/statusicons/4.png" alt="s4" />
            </li>
            <li>
              <img src="/images/statusicons/5.png" alt="s5" />
            </li>
            <li>
              <p>Tarun Tomar</p>
            </li>
            <li>
              <img src="/images/statusicons/6.png" alt="s6" onClick={toggleSearchTab}/>
            </li>
            <li>
              <span className={styles.date} onClick={toggleSearchTab}>{currentTime}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default StatusBar;
