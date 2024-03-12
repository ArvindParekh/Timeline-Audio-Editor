/* eslint-disable react/prop-types */
// import { CustomTimelineAction, CusTomTimelineRow } from './mock';

export const CustomRender0 = ({ action, row }) => {
  return (
    <div className={'effect0'}>
      {/* <div className={`effect0-text`}>{`Audio: ${action.data.name}`}</div> */}
      <div className={`effect0-text`}>{`Audio: ${(action.end - action.start).toFixed(2)}s`}</div>
    </div>
  );
};

// export const CustomRender1 = ({ action, row }) => {
//   return (
//     <div className={'effect1'}>
//       <div className={`effect1-text`}>{`播放动画: ${action.data.name}`}</div>
//     </div>
//   );
// };
