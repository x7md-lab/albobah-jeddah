// @ts-check
import { loadEnv } from "vite";
// @ts-ignore
const { PUBLIC_PATH } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';


// https://astro.build/config
export default defineConfig({
  site: 'https://lab.x7md.net/albobah-jeddah/',
  ...PUBLIC_PATH && {base: PUBLIC_PATH},
  integrations: [
    react(), 
    tailwind({
      applyBaseStyles: false,
    })
  ]
});
// console.log(PUBLIC_PATH)
