import { Timeline } from "@xzdarcy/react-timeline-editor";
// import { cloneDeep } from "lodash";
import { useRef, useState } from "react";
import { CustomRender0 } from "./custom";
import { scale, scaleWidth, startLeft } from "./mock";
import TimelinePlayer from "./player";
import { useEffect } from "react";
import audioControl from "./audioControl";

// const defaultEditorData = cloneDeep(mockData);
// console.log(defaultEditorData);
const TimelineEditor = () => {
   const idRef = useRef(4);
   const [data, setData] = useState([
      {
         id: "0",
         actions: [
            {
               id: "action0",
               start: 0,
               end: 10,
               effectId: "effect0",
               data: {
                  src: "/concat.wav",
                  name: "Random Noise",
               },
            },
            // {
            //   id: 'action1',
            //   start: 15,
            //   end: 20,
            //   effectId: 'effect0',
            //   data: {
            //     src: '/concat.wav',
            //     name: 'Random Noise',
            //   },
            // },
         ],
      },
      {
         id: "1",
         actions: [
            {
               id: "action1",
               start: 10,
               end: 15,
               effectId: "effect0",
               data: {
                  // src: '/audio/bg.mp3',
                  src: "/concat.wav",
                  name: "Random Noise",
               },
            },
         ],
      },
   ]);
   const [effect, setEffect] = useState({
      effect0: {
         id: "effect0",
         name: "Audio Effect",
         source: {
            start: ({ action, engine, isPlaying, time }) => {
               console.log("Entered start");
               if (isPlaying) {
                  const src = action.data.src;
                  const id = action.id;
                  audioControl.start({
                     id: id,
                     src,
                     startTime: action.start,
                     engine,
                     time,
                  });
               }
            },
            enter: ({ action, engine, isPlaying, time }) => {
               console.log("Entered enter");
               if (isPlaying) {
                  const src = action.data.src;
                  const id = action.id;
                  audioControl.start({
                     id: id,
                     src,
                     startTime: action.start,
                     engine,
                     time,
                  });
               }
            },
            leave: ({ action, engine }) => {
               const src = action.data.src;
               const id = action.id;
               audioControl.stop({ id: id, engine });
            },
            stop: ({ action, engine }) => {
               const src = action.data.src;
               const id = action.id;
               audioControl.stop({ id: id, engine });
            },
         },
      },
   });
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
         return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = function (event) {
               // The file's Data URL will be available here
               const dataUrl = event.target.result;
               resolve({
                  id: `${index + 2}`,
                  actions: [
                     {
                        id: `action${index + 2}`,
                        start: 0,
                        end: 20, // You might want to set this based on the actual duration of the audio file
                        effectId: "effect0",
                        data: {
                           src: dataUrl, // Use the Data URL as the src
                           name: file.name,
                        },
                     },
                  ],
               });
            };
            reader.readAsDataURL(file); // Start reading the file as a Data URL
         });
      });

      // Since map returns an array of promises, we use Promise.all to wait for all promises to resolve
      Promise.all(newAudioArr).then((resolvedAudioArr) => {
         console.log(resolvedAudioArr);
         setData([...data, ...resolvedAudioArr]);
      });
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
            effects={effect}
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
            onDoubleClickRow={(e, { row, time }) => {
               console.log(row);
               setData((pre) => {
                  const rowIndex = pre.findIndex((item) => item.id === row.id);
                  console.log(row.actions[0].data.src);
                  const newAction = {
                     id: `action${idRef.current++}`,
                     start: time,
                     end: time + 0.5,
                     effectId: "effect0",
                     data: {
                        src: row.actions[0].data.src,
                     },
                  };
                  pre[rowIndex] = {
                     ...row,
                     actions: row.actions.concat(newAction),
                  };
                  return [...pre];
               });
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
