import { Timeline } from "@xzdarcy/react-timeline-editor";
import { cloneDeep } from "lodash";
import { useRef, useState } from "react";
import { CustomRender0 } from "./custom";
import { mockData, mockEffect, scale, scaleWidth, startLeft } from "./mock";
import TimelinePlayer from "./player";
import { useEffect } from "react";

const defaultEditorData = cloneDeep(mockData);
console.log(defaultEditorData);
const TimelineEditor = () => {
   const [data, setData] = useState(defaultEditorData);
   const timelineState = useRef();
   const playerPanel = useRef();
   const autoScrollWhenPlay = useRef(true);
   const inputRef = useRef();

   useEffect(() => {
      console.log(data);
   }, [data]);

   function getFileFromDevice() {
      inputRef.current.click();
   }


   function handleChange(e) {
      const files = e.target.files;
      const newAudioArr = Array.from(files).map((file, index) => {
         const audio = new Audio(URL.createObjectURL(file));
         audio.onloadedmetadata = () => {
            // console.log(audio.duration);
         };
         // console.log(file);
         return {
            id: `${index+2}`,
            actions: [
               {
                  id: `action${index}`,
                  start: 0,
                  end: 20,
                  effectId: "effect0",
                  data: {
                     src: '/concat.wav',
                     name: file.name,
                  },
               },
            ],
         };
      });

      console.log(newAudioArr);
      setData([...data, ...newAudioArr]);
   }

   return (
      <div className='timeline-editor-engine'>
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
            // gridSnap={true}
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
         <div>
            <input
               type='file'
               accept='audio/*'
               style={{ display: "none" }}
               ref={inputRef}
               onChange={handleChange}
               multiple
            />
            <button
               className='mt-5 rounded-md bg-gray-800 p-2 text-base font-medium text-white hover:bg-white hover:text-gray-800 transition-all hover:border hover:border-gray-800'
               onClick={getFileFromDevice}
            >
               Select a file or drop it here
            </button>
         </div>
      </div>
   );
};

export default TimelineEditor;
