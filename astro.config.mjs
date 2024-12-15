// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://lab.x7md.net/albobah-jeddah/',
  base: '/albobah-jeddah/',
  integrations: [
    react(), 
    tailwind({
      applyBaseStyles: false,
    })
  ]
});