import { Timeline } from "@xzdarcy/react-timeline-editor";
import { Switch } from "antd";
import { cloneDeep } from "lodash";
import { useRef, useState } from "react";
import { CustomRender0 } from "./custom";
import "./index.less";
import { mockData, mockEffect, scale, scaleWidth, startLeft } from "./mock";
import TimelinePlayer from "./player";

const defaultEditorData = cloneDeep(mockData);

const TimelineEditor = () => {
   const [data, setData] = useState(defaultEditorData);
   const timelineState = useRef();
   const playerPanel = useRef();
   const autoScrollWhenPlay = useRef(true);

   return (
      <div className='timeline-editor-engine'>
         <div className='player-config'>{/* <Switch开启运行时自动滚动 */}</div>
         <div
            className='player-panel'
            id='player-ground-1'
            ref={playerPanel}
         ></div>
         <TimelinePlayer
            timelineState={timelineState}
            autoScrollWhenPlay={autoScrollWhenPlay}
         />
         <Timeline
            scale={scale}
            scaleWidth={scaleWidth}
            startLeft={startLeft}
            autoScroll={true}
            ref={timelineState}
            editorData={data}
            effects={mockEffect}
            gridSnap={true}
            dragLine={true}
            onChange={(data) => {
               setData(data);
            }}
            getActionRender={(action, row) => {
               if (action.effectId === "effect0") {
                  return <CustomRender0 action={action} row={row} />;
               } 
            }}
         />
      </div>
   );
};

export default TimelineEditor;
