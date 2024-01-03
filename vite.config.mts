import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
  define: {
    VITE_APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  build: {
    manifest: true,
  },
  server: {
    open: true,
    port: 8081,
  },
});
