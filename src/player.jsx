/* eslint-disable react/prop-types */
// import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
// import { TimelineState } from "@xzdarcy/react-timeline-editor";
import { Select } from "antd";
import { useEffect, useState } from "react";
import lottieControl from "./lottieControl";
import { scale, scaleWidth, startLeft } from "./mock";

const { Option } = Select;
export const Rates = [0.2, 0.5, 1.0, 1.5, 2.0];

const TimelinePlayer = ({ timelineState, autoScrollWhenPlay }) => {
   const [isPlaying, setIsPlaying] = useState(false);
   const [time, setTime] = useState(0);

   useEffect(() => {
      if (!timelineState.current) return;
      const engine = timelineState.current;
      engine.listener.on("play", () => setIsPlaying(true));
      engine.listener.on("paused", () => setIsPlaying(false));
      engine.listener.on("afterSetTime", ({ time }) => setTime(time));
      engine.listener.on("setTimeByTick", ({ time }) => {
         setTime(time);

         if (autoScrollWhenPlay.current) {
            const autoScrollFrom = 500;
            const left =
               time * (scaleWidth / scale) + startLeft - autoScrollFrom;
            timelineState.current.setScrollLeft(left);
         }
      });

      return () => {
         if (!engine) return;
         engine.pause();
         engine.listener.offAll();
         lottieControl.destroy();
      };
   }, []);

   const handlePlayOrPause = () => {
      if (!timelineState.current) return;
      if (timelineState.current.isPlaying) {
         timelineState.current.pause();
      } else {
         timelineState.current.play({ autoEnd: true });
      }
   };

   const handleRateChange = (rate) => {
      if (!timelineState.current) return;
      timelineState.current.setPlayRate(rate);
   };

   const timeRender = (time) => {
      const float = (parseInt((time % 1) * 100 + "") + "").padStart(2, "0");
      const min = (parseInt(time / 60 + "") + "").padStart(2, "0");
      const second = (parseInt((time % 60) + "") + "").padStart(2, "0");
      return <>{`${min}:${second}.${float.replace("0.", "")}`}</>;
   };

   return (
      <div className='timeline-player'>
         <div className='play-control' onClick={handlePlayOrPause}>
            {/* {isPlaying ? <PauseOutlined /> : <CaretRightOutlined />} */}
            {isPlaying ? <h1>Play</h1> : <h1>Pause</h1>}
         </div>
         <div className='time'>{timeRender(time)}</div>
         <div className='rate-control'>
            <Select
               size={"small"}
               defaultValue={1}
               style={{ width: 120 }}
               onChange={handleRateChange}
            >
               {Rates.map((rate) => (
                  <Option key={rate} value={rate} className="bg-white z-50">{`${rate.toFixed(
                     1
                  )} speed`}</Option>
               ))}
            </Select>
         </div>
      </div>
   );
};

export default TimelinePlayer;
