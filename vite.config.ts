import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { pigment } from '@pigment-css/vite-plugin';
import { createTheme } from '@mui/material/styles';
import viteTsconfigPaths from "vite-tsconfig-paths";

const pigmentConfig = {
  theme: createTheme({
    cssVariables: true,
    colorSchemes: { light: true, dark: true },
  }),
  transformLibraries: ['@mui/material'],
};

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      viteTsconfigPaths(),
      pigment(pigmentConfig),
    ],
    resolve: {
      alias: [
        {
          find: /^@mui\/icons-material\/(.*)/,
          replacement: "@mui/icons-material/esm/$1",
        },
      ],
    },
    test: {
      env: {
        VITE_ENV: "Production",
      },
      coverage: {
        provider: "v8",
        exclude: [
          "**/lint-staged.config.mjs",
          "**/vite.config.mjs",
          "**/env.d.ts",
          "**/.versionrc.js",
          "**/types/**",
          "**/shared/utils/**",
          "**/index.tsx",
        ],
      },
      exclude: [
        "**/node_modules/**",
        "**/lint-staged.config.mjs",
        "**/env.d.ts",
        "**/.versionrc.js",
        "**/types/**",
        "**/shared/utils/**",
        "**/index.tsx",
      ],
      environment: "jsdom",
    },
  };
});
