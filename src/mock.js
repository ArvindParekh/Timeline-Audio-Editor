import audioControl from './audioControl';

export const scaleWidth = 260;
export const scale = 5;
export const startLeft = 20;

export const mockEffect = {
  effect0: {
    id: 'effect0',
    name: 'Audio Effect',
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
  },
};

export const mockData = [
  {
    id: '0',
    actions: [
      {
        id: 'action0',
        start: 0,
        end: 10,
        effectId: 'effect0',
        data: {
          src: '/concat.wav',
          name: 'Random Noise',
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
          name: 'Random Noise',
        },
      },
    ],
  },
];
