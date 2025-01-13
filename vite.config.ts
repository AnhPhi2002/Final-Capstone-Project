import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server: {
  //   host: true,
  //   port: 9000, // This is the port which we will use in docker
  //   // Thanks @sergiomoura for the window fix
  //   // add the next lines if you're using windows and hot reload doesn't work
  //   watch: {
  //     usePolling: true,
  //   },
  // },
})
