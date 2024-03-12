import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"

const resolveFixup = {
   name: "resolve-fixup",
   setup(build) {
      build.onResolve({ filter: /react-virtualized/ }, async () => {
         return {
            // eslint-disable-next-line no-undef
            path: path.resolve(
               "./node_modules/react-virtualized/dist/umd/react-virtualized.js"
            ),
         };
      });
   },
};
// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   optimizeDeps: {
      esbuildOptions: {
         plugins: [resolveFixup],
      },
   },
});
