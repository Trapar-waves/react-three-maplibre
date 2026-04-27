import antfu from "@antfu/eslint-config";

export default antfu({
  stylistic: {
    quotes: "double",
    semi: true,
  },
  markdown: true,
  jsonc: true,
  typescript: true,
  yaml: true,
  react: true,
  formatters: {
    markdown: "prettier",
  },
}, {
  name: "trapar/pnpm-workspace-yaml-trust-policy",
  files: ["pnpm-workspace.yaml"],
  rules: {
    "pnpm/yaml-enforce-settings": "off",
  },
});
