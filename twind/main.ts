// Original Code
// https://github.com/denoland/fresh/blob/main/plugins/twind/main.ts
//
import { cssom, getSheet, setup } from "twind";
import { STYLE_ELEMENT_ID, Options } from "./shared.ts";

type State = string[];

/**
 * Setup a twind dynamically inserted in Islands.
 * @param options - TwindUserConfig extended with selfURL.
 */
export function hydrate(options: Options) {
  // https://github.com/denoland/fresh/pull/946#issuecomment-1416191106

  const el = document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement;
  const cssom_sheet = cssom(el);

  // https://github.com/tw-in-js/twind/blob/main/packages/core/src/sheets.ts#L177
  const sheetWithResumeFeature = getSheet();
  document.querySelector('[data-twind="claimed"]')?.remove();

  cssom_sheet.resume = sheetWithResumeFeature.resume.bind(cssom_sheet);

  setup(options, cssom_sheet);
}
