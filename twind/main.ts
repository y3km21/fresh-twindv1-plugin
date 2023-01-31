// Original Code
// https://github.com/denoland/fresh/blob/main/plugins/twind/main.ts
//
import { cssom } from "twind";
import { STYLE_ELEMENT_ID, setup, Options } from "./shared.ts";

type State = string[];

/**
 * hydrate
 * @param options TwindConfig extended with selfURL.
 * @param state Virtual Cssrules
 */
export function hydrate(options: Options, state: State) {
  const el = document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement;
  const target = el.sheet!;
  const virtualCssSheetSet = new Set(state);

  const cssom_sheet = cssom(target);
  cssom_sheet.insert = (cssText, index) => {
    // https://github.com/tw-in-js/twind/blob/main/packages/core/src/sheets.ts#L61
    try {
      // Filter cssrule set by virtual.
      // Add only the cssrule that first appears in island.
      if (!virtualCssSheetSet.has(cssText)) {
        cssom_sheet.target.insertRule(
          cssText,
          cssom_sheet.target.cssRules.length
        );
      }
    } catch (error) {
      // Empty rule to keep index valid — not using `*{}` as that would show up in all rules (DX)
      cssom_sheet.target.insertRule(":root{}", index);

      // Some thrown errors are because of specific pseudo classes
      // lets filter them to prevent unnecessary warnings
      // ::-moz-focus-inner
      // :-moz-focusring
      if (!/:-[mwo]/.test(cssText)) {
        console.warn((error as Error).message, "TWIND_INVALID_CSS", cssText);
      }
    }
  };

  setup(options, cssom_sheet);
}
