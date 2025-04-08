import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import tailwind from "@tailwindcss/postcss";

export default defineConfig({
  plugins: [pluginReact()],
  tools:{
    postcss:{
      postcssOptions:{
        plugins:[tailwind]
      }
    }
  }
});
