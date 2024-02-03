import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true, tsconfigPath: './tsconfig.build.json' })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'fuct-ui',
      fileName: 'index',
    },
    rollupOptions: {
      // 번들에서 제외
      external: ['react', 'react-dom', 'styled-components'],
      output: {
        // 빌드 결과물에서 아래 글로벌 변수를 사용
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
        },
      },
    },
  },
});
