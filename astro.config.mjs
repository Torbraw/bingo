import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
const { SITE_URL } = loadEnv(import.meta.env.MODE, process.cwd(), '');
import tailwind from '@astrojs/tailwind';
import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    solidJs(),
  ]
});
