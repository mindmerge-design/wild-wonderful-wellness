import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import tailwindcss from "@tailwindcss/vite";
import favicons from 'astro-favicons';
import icon from "astro-icon";
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.wildandwonderfulwellness.com',
  output: 'server',
  image: {
    domains: ['cdn.sanity.io']
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sanity({
    projectId: 'v8ngbpl7',
    dataset: 'production',
    apiVersion: '2025-03-23',
    useCdn: true,
    studioUrl: '/studio'
  }), sitemap(), icon(), react(), favicons()],
  adapter: netlify()
});
