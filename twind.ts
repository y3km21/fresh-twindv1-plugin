// Original Code
// https://github.com/denoland/fresh/blob/main/plugins/twind.ts
//
import { Plugin } from "$fresh/server.ts";
import { STYLE_ELEMENT_ID, Options, setup } from "./twind/shared.ts";
import { virtual } from "twind";
export type { Options };

/**
 * TwindPlugin
 * @param options TwindConfig extended with selfURL.
 * @returns
 */
export default function twind(options: Options): Plugin {
  const virtual_sheet = virtual();

  setup(options, virtual_sheet);

  const main = `data:application/javascript,import {hydrate} from "${
    new URL("./twind/main.ts", import.meta.url).href
  }";
import options from "${options.selfURL}";
export default function(state) { hydrate(options, state);}`;
  return {
    name: "twind",
    entrypoints: { main: main },
    render(ctx) {
      const _res = ctx.render();
      const cssTexts = [...virtual_sheet.target];

      // No precedence
      const cssText = cssTexts.join("\n");

      const scripts = [];
      scripts.push({ entrypoint: "main", state: cssTexts });
      const ret = {
        scripts,
        styles: [{ cssText: cssText, id: STYLE_ELEMENT_ID }],
      };

      return ret;
    },
  };
}
