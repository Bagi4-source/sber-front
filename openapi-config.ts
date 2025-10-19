import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "./openapi.yaml",
  apiFile: "./src/store/emptyApi.ts",
  outputFiles: {
    "./src/store/optionsApi.ts": {
      filterEndpoints: [/option/i],
    },
  },
  hooks: true,
};

export default config;
