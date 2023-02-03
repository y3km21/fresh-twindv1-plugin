// Original Code
// https://github.com/denoland/fresh/blob/main/plugins/twind/main.ts
//
import { cssom, stringify, setup, Sheet, SheetRule } from "twind";
import { STYLE_ELEMENT_ID, Options } from "./shared.ts";

type State = string[];

/**
 * Setup a twind dynamically inserted in Islands.
 * @param options - TwindUserConfig extended with selfURL.
 */
export function hydrate(options: Options) {
  const el = document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement;
  //const target = el.sheet!;

  //const virtualCssSheetSet = new Set(stringify(target).split("\n"));

  const cssom_sheet = cssom(el);
  cssom_sheet.resume = resume.bind(cssom_sheet);

  //cssom_sheet.insert = (cssText, index) => {
  //  // https://github.com/tw-in-js/twind/blob/main/packages/core/src/sheets.ts#L61
  //  try {
  //    // Filter cssrule set by virtual.
  //    // Add only the cssrule that first appears in island.
  //    //if (!virtualCssSheetSet.has(cssText)) {
  //    //cssom_sheet.target.insertRule(
  //    //cssText,
  //    //cssom_sheet.target.cssRules.length
  //    //);
  //    //}
  //    target.insertRule(cssText, index);
  //  } catch (error) {
  //    // Empty rule to keep index valid — not using `*{}` as that would show up in all rules (DX)
  //    cssom_sheet.target.insertRule(":root{}", index);

  //    // Some thrown errors are because of specific pseudo classes
  //    // lets filter them to prevent unnecessary warnings
  //    // ::-moz-focus-inner
  //    // :-moz-focusring
  //    if (!/:-[mwo]/.test(cssText)) {
  //      console.warn((error as Error).message, "TWIND_INVALID_CSS", cssText);
  //    }
  //  }
  //};

  setup(options, cssom_sheet);
}

function resume(
  this: Sheet,
  addClassName: (className: string) => void,
  insert: (cssText: string, rule: SheetRule) => void
) {
  // hydration from SSR sheet
  const textContent = stringify(this.target);
  console.log(textContent);
  const RE = /\/\*!([\da-z]+),([\da-z]+)(?:,(.+?))?\*\//g;

  // only if this is a hydratable sheet
  if (RE.test(textContent)) {
    // RE has global flag — reset index to get the first match as well
    RE.lastIndex = 0;

    // 1. start with a fresh sheet
    this.clear();

    // 2. add all existing class attributes to the token/className cache
    if (typeof document != "undefined") {
      // deno-lint-ignore no-explicit-any
      for (const el of document.querySelectorAll("[class]") as any) {
        addClassName(el.getAttribute("class") as string);
      }
    }

    // 3. parse SSR styles
    let lastMatch: RegExpExecArray | null | undefined;

    while (
      (function commit(match?: RegExpExecArray | null) {
        if (lastMatch) {
          // const tc = textContent.slice(
          //   lastMatch.index + lastMatch[0].length,
          //   match?.index
          // );
          // console.log(tc);

          insert(
            // grep the cssText from the previous match end up to this match start
            textContent.slice(
              lastMatch.index + lastMatch[0].length,
              match?.index
            ),
            {
              p: parseInt(lastMatch[1], 36),
              o: parseInt(lastMatch[2], 36) / 2,
              n: lastMatch[3],
            }
          );
        }

        return (lastMatch = match);
      })(RE.exec(textContent))
    ) {
      /* no-op */
    }
  }
}
