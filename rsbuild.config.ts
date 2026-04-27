import process from "node:process";
import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginLess } from "@rsbuild/plugin-less";
import { pluginReact } from "@rsbuild/plugin-react";
import { RsdoctorRspackPlugin } from "@rsdoctor/rspack-plugin";
import tailwind from "@tailwindcss/postcss";
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
const useSubpath = basePath !== "/";

const enableRsdoctor = Boolean(process.env.RSDOCTOR);
const enableTurboConsole = process.env.NODE_ENV === "development";

export default defineConfig({
  ...(useSubpath
    ? {
        server: { base: basePath },
        output: { assetPrefix: basePath },
      }
    : {}),
  performance: {
    ...(enableRsdoctor ? { buildCache: false } : {}),
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
        if (enableTurboConsole) {
          config.plugins.push(TurboConsole());
        }
        if (enableRsdoctor) {
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
