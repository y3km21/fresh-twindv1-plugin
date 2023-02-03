import { Options } from "twind_fresh_plugin/twind.ts";
import { defineConfig } from "twind";
// twind preset
import presetAutoPrefix from "twind-preset-autoprefix";
import presetTailWind from "twind-preset-tailwind";

export default {
  ...defineConfig({
    presets: [presetAutoPrefix, presetTailWind],
  }),
  selfURL: import.meta.url,
} as Options;
