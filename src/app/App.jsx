import { Timeline } from "@xzdarcy/react-timeline-editor";
import { useRef, useState } from "react";
import { CustomRender0 } from "../components/custom";
import { scale, scaleWidth, startLeft } from "../lib/mock";
import TimelinePlayer from "../components/player";
import audioControl from "../lib/audioControl";

const TimelineEditor = () => {
   const preloadedData = [
      {
         id: "0",
         actions: [
            {
               id: "action0",
               start: 0,
               end: 50,
               effectId: "effect0",
               data: {
                  src: "/pehla-nasha.mp3",
                  name: "Pehla Nasha",
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
      // {
      //    id: "1",
      //    actions: [
      //       {
      //          id: "action1",
      //          start: 10,
      //          end: 15,
      //          effectId: "effect0",
      //          data: {
      //             // src: '/audio/bg.mp3',
      //             src: "/concat.wav",
      //             name: "Random Noise",
      //          },
      //       },
      //    ],
      // },
   ];
   const preloadedEffect = {
      effect0: {
         id: "effect0",
         name: "Audio Effect",
         source: {
            start: ({ action, engine, isPlaying, time }) => {
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
               // const src = action.data.src;
               const id = action.id;
               audioControl.stop({ id: id, engine });
            },
            stop: ({ action, engine }) => {
               // const src = action.data.src;
               const id = action.id;
               audioControl.stop({ id: id, engine });
            },
         },
      },
   };
   const [data, setData] = useState(preloadedData);
   const [effect] = useState(preloadedEffect);
   const timelineState = useRef();
   const playerPanel = useRef();
   const autoScrollWhenPlay = useRef(true);
   const inputRef = useRef();
   const idRef = useRef(4);
   const doubleClickRef = useRef();
   const [doubleClickData, setDoubleClickData] = useState({
      row: null,
      time: null,
   });

   function getFileFromDevice() {
      inputRef.current.click();
   }

   function handleChange(e) {
      const files = e.target.files;
      const newAudioArr = Array.from(files).map((file, index) => {
         return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = function (event) {
               const dataUrl = event.target.result;
               const audio = new Audio(dataUrl);
               audio.oncanplaythrough = () => {
                  const duration = Math.ceil(audio.duration);
                  console.log("Duration is: ", duration);
                  resolve({
                     id: `${index + 2}`,
                     actions: [
                        {
                           id: `action${index + 2}`,
                           start: 0,
                           end: Math.ceil(duration),
                           // end: 7,
                           effectId: "effect0",
                           data: {
                              src: dataUrl,
                              name: file.name,
                           },
                        },
                     ],
                  });
               };
            };
            reader.readAsDataURL(file);
         });
      });

      Promise.all(newAudioArr).then((resolvedAudioArr) => {
         setData([...data, ...resolvedAudioArr]);
      });
   }

   // Called when uploading a new file on Double Click
   function handleDoubleClick(e) {
      const { row, time } = doubleClickData;
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
         const dataUrl = event.target.result;
         const audio = new Audio(dataUrl);

         audio.oncanplaythrough = () => {
            const duration = Math.ceil(audio.duration);
            console.log("Duration is: ", duration);

            setData((pre) => {
               const rowIndex = pre.findIndex((item) => item.id === row.id);
               const newAction = {
                  id: `action${idRef.current++}`,
                  start: time,
                  end: time + duration, // Set end time as start time + duration
                  effectId: "effect0",
                  data: {
                     src: dataUrl,
                     name: file.name,
                  },
               };
               pre[rowIndex] = {
                  ...row,
                  actions: row.actions.concat(newAction),
               };
               return [...pre];
            });
         };
      };

      reader.readAsDataURL(file);
   }

   return (
      <div className='timeline-editor-engine'>
         <div
            className='player-panel'
            id='player-ground-1'
            ref={playerPanel}
         ></div>
         <div className='flex py-5 bg-black text-white w-full items-center justify-center gap-10 timeline-player-container'>
            <TimelinePlayer
               timelineState={timelineState}
               autoScrollWhenPlay={autoScrollWhenPlay}
            />
            <div>
               <input
                  type='file'
                  accept='audio/*'
                  style={{ display: "none" }}
                  ref={doubleClickRef}
                  onChange={handleDoubleClick}
               />
               <input
                  type='file'
                  accept='audio/*'
                  style={{ display: "none" }}
                  ref={inputRef}
                  onChange={handleChange}
                  multiple
               />
               <button
                  className='rounded-md bg-white p-2 text-base font-medium text-black'
                  onClick={getFileFromDevice}
               >
                  Load a local file
               </button>
            </div>
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
               setDoubleClickData({ row: row, time: time });
               doubleClickRef.current.click();
            }}
         />
      </div>
   );
};

export default TimelineEditor;
