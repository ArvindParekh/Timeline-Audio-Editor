/* eslint-disable react/prop-types */


export const CustomRender0 = ({ action, row }) => {
  return (
    <div className={'effect0'}>
      <div className={`effect0-text`}>{`${action.data.name}: ${(action.end - action.start).toFixed(2)}s`}</div>
    </div>
  );
};

