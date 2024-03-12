import { Timeline } from "@xzdarcy/react-timeline-editor";
import { Switch } from "antd";
import { cloneDeep } from "lodash";
import { useRef, useState } from "react";
import { CustomRender0 } from "./custom";
import "./index.css";
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
         {/* <div className='player-config'>
            <Switch
               checkedChildren='开启运行时自动滚动'
               unCheckedChildren='禁用运行时自动滚动'
               defaultChecked={autoScrollWhenPlay.current}
               onChange={(e) => (autoScrollWhenPlay.current = e)}
               style={{ marginBottom: 20 }}
            />
         </div> */}
         <div
            className='player-panel'
            id='player-ground-1'
            ref={playerPanel}
         ></div>
         <div className='flex bg-black text-white w-full'>
            <TimelinePlayer
               timelineState={timelineState}
               autoScrollWhenPlay={autoScrollWhenPlay}
               className='bg-red-700'
            />
         </div>
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
