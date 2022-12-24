import { JSX, options as preactOptions, VNode } from "preact";
import { TwindConfig, setup as twSetup, Sheet, tw } from "twind";

export const STYLE_ELEMENT_ID = "__FRSH_TWIND";

/**
 * TwindConfig extended with selfURL.
 */
export interface Options extends TwindConfig {
  /** The import.meta.url of the module defining these options. */
  selfURL: string;
}

declare module "preact" {
  namespace JSX {
    interface DOMAttributes<Target extends EventTarget> {
      class?: string;
      className?: string;
    }
  }
}

/**
 * twind setup
 * @param options
 * @param sheet
 */
export function setup(options: Options, sheet: Sheet) {
  twSetup(options, sheet);

  // twSetupなしでtwするとエラー

  const originalHook = preactOptions.vnode;
  // deno-lint-ignore no-explicit-any
  preactOptions.vnode = (vnode: VNode<JSX.DOMAttributes<any>>) => {
    if (typeof vnode.type === "string" && typeof vnode.props === "object") {
      const { props } = vnode;
      const classes: string[] = [];
      if (props.class) {
        classes.push(tw(props.class));
        props.class = undefined;
      }
      if (props.className) {
        classes.push(tw(props.className));
      }
      if (classes.length) {
        props.class = classes.join(" ");
      }
    }

    originalHook?.(vnode);
  };
}
