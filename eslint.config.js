import { rentonReact } from "@renton/eslint-config-react";

export default rentonReact({
  stylistic: {
    quotes: "double",
    semi: true,
  },
}, {
  files: ["pnpm-workspace.yaml"],
  name: "trapar/pnpm-workspace-yaml-trust-policy",
  rules: {
    "pnpm/yaml-enforce-settings": "off",
  },
});
