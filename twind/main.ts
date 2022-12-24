import { cssom } from "twind";
import { STYLE_ELEMENT_ID, setup, Options } from "./shared.ts";

type State = string[];

/**
 * hydrate
 * @param options
 * @param state
 */
export function hydrate(options: Options, state: State) {
  const el = document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement;
  const target = el.sheet!;

  const virtualCssSheetSet = new Set(state);

  const cssom_sheet = cssom(target);
  cssom_sheet.insert = (cssText, index) => {
    // https://github.com/tw-in-js/twind/blob/main/packages/core/src/sheets.ts#L61
    // Virtual側でセットアップされたCssruleと重複するCssruleをstateを使用してフィルターする。
    try {
      // Insert
      if (!virtualCssSheetSet.has(cssText)) {
        target.insertRule(cssText, target.cssRules.length);
      }
    } catch (error) {
      // Empty rule to keep index valid — not using `*{}` as that would show up in all rules (DX)
      target.insertRule(":root{}", index);

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
