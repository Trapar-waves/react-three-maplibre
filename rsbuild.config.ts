import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginLess } from "@rsbuild/plugin-less";
import { pluginReact } from "@rsbuild/plugin-react";
import { RsdoctorRspackPlugin } from "@rsdoctor/rspack-plugin";
import tailwind from "@tailwindcss/postcss";
import process from "node:process";
import TurboConsole from "unplugin-turbo-console/rspack";

const { publicVars } = loadEnv({ cwd: "./environments" });

function normalizeBasePath(): string {
  const raw = process.env.BASE_PATH?.trim();
  if (!raw || raw === "/") {
    return "/";
  }
  const prefixed = raw.startsWith("/") ? raw : `/${raw}`;
  return prefixed.endsWith("/") ? prefixed : `${prefixed}/`;
}

const basePath = normalizeBasePath();
const isUseSubpath = basePath !== "/";

const isEnableRsdoctor = Boolean(process.env.RSDOCTOR);
const isEnableTurboConsole = process.env.NODE_ENV === "development";

export default defineConfig({
  ...(isUseSubpath && {
    output: { assetPrefix: basePath },
    server: { base: basePath },
  }),
  performance: {
    ...(isEnableRsdoctor && { buildCache: false }),
  },
  plugins: [pluginReact(), pluginLess()],
  source: {
    define: publicVars,
  },
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [tailwind],
      },
    },
    rspack: [
      (config) => {
        if (isEnableTurboConsole) {
          config.plugins.push(TurboConsole());
        }
        if (isEnableRsdoctor) {
          config.plugins.push(
            new RsdoctorRspackPlugin({
              output: {
                mode: "brief",
                options: {
                  type: ["json"],
                },
              },
            }),
          );
        }
      },
    ],
  },
});
