import { Howl } from "howler";

const createAudioControl = () => {
   const cacheMap = {};
   const listenerMap = {};

   const start = (data) => {
      const { id, src, startTime, time, engine } = data;
      let item;
      if (cacheMap[id]) {
         item = cacheMap[id];
         item.rate(engine.getPlayRate());
         item.seek((time - startTime) % item.duration());
         item.play();
      } else {
         item = new Howl({ src: [src], loop: false, autoplay: true });
         cacheMap[id] = item;
         item.on("load", () => {
            item.rate(engine.getPlayRate());
            item.seek((time - startTime) % item.duration());
         });
      }

      const timeListener = (data) => {
         const { time } = data;
         item.seek(time);
      };
      const rateListener = (data) => {
         const { rate } = data;
         item.rate(rate);
      };
      if (!listenerMap[id]) listenerMap[id] = {};
      engine.on("afterSetTime", timeListener);
      engine.on("afterSetPlayRate", rateListener);
      listenerMap[id].time = timeListener;
      listenerMap[id].rate = rateListener;
   };

   const stop = (data) => {
      const { id, engine } = data;
      if (cacheMap[id]) {
         const item = cacheMap[id];
         item.stop();
         if (listenerMap[id]) {
            listenerMap[id].time &&
               engine.off("afterSetTime", listenerMap[id].time);
            listenerMap[id].rate &&
               engine.off("afterSetPlayRate", listenerMap[id].rate);
            delete listenerMap[id];
         }
      }
   };

   return { start, stop };
};

export default createAudioControl();
