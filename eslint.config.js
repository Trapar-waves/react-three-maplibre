import antfu from "@antfu/eslint-config";

export default antfu({
  jsonc: true,
  javascript: true,
  yaml: true,
  stylistic: { indent: 2, quotes: "double", semi: true },
});
