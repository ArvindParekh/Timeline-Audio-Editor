import audioControl from './audioControl';
// import lottieControl from './lottieControl';

export const scaleWidth = 260;
export const scale = 5;
export const startLeft = 20;

export const mockEffect = {
  effect0: {
    id: 'effect0',
    name: '播放音效',
    source: {
      start: ({ action, engine, isPlaying, time }) => {
        if (isPlaying) {
          const src = action.data.src;
          const id = action.id;
          audioControl.start({ id: id, src, startTime: action.start, engine, time });
        }
      },
      enter: ({ action, engine, isPlaying, time }) => {
        if (isPlaying) {
          const src = action.data.src;
          const id = action.id;
          audioControl.start({ id: id, src, startTime: action.start, engine, time });
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
    color:"red"
  },
  // effect1: {
  //   id: 'effect1',
  //   name: '播放动画',
  //   source: {
  //     enter: ({ action, time }) => {
  //       const src = action.data.src;
  //       lottieControl.enter({ id: src, src, startTime: action.start, endTime: action.end, time });
  //     },
  //     update: ({ action, time }) => {
  //       const src = action.data.src;
  //       lottieControl.update({ id: src, src, startTime: action.start, endTime: action.end, time });
  //     },
  //     leave: ({ action, time }) => {
  //       const src = action.data.src;
  //       lottieControl.leave({ id: src, startTime: action.start, endTime: action.end, time });
  //     },
  //   },
  // },
};

export const mockData = [
  // {
  //   id: '0',
  //   actions: [
  //     {
  //       id: 'action0',
  //       start: 9.5,
  //       end: 16,
  //       effectId: 'effect1',
  //       data: {
  //         src: '/lottie/lottie1/data.json',
  //         name: '点赞',
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: '1',
  //   actions: [
  //     {
  //       id: 'action1',
  //       start: 5,
  //       end: 9.5,
  //       effectId: 'effect1',
  //       data: {
  //         src: '/lottie/lottie2/data.json',
  //         name: '工作',
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: '2',
  //   actions: [
  //     {
  //       id: 'action2',
  //       start: 0,
  //       end: 5,
  //       effectId: 'effect1',
  //       data: {
  //         src: '/lottie/lottie3/data.json',
  //         name: '奶牛',
  //       },
  //     },
  //   ],
  // },
  {
    id: '0',
    actions: [
      {
        id: 'action0',
        start: 0,
        end: 20,
        effectId: 'effect0',
        data: {
          // src: '/audio/bg.mp3',
          src: '/concat.wav',
          name: '背景音乐',
        },
      },
    ],
  },
  {
    id: '1',
    actions: [
      {
        id: 'action1',
        start: 10,
        end: 15,
        effectId: 'effect0',
        data: {
          // src: '/audio/bg.mp3',
          src: '/concat.wav',
          name: 'background',
        },
      },
    ],
  },
];
