# fresh Twind(v1) Plugin

[![Demo](https://img.shields.io/badge/Demo-Online-success.svg?style=for-the-badge&logo=deno)](https://y3km21-fresh-demo-twindv1.deno.dev/)

fresh Twind(v1) Plugin is a thirdparty plugin that allows [Twind(v1)](https://github.com/tw-in-js/twind) to be used with [fresh](https://github.com/denoland/fresh).

Currently(2022/12/26), there is [an official fresh twind plugin](https://github.com/denoland/fresh/tree/main/plugins) using [Twind(v0.16)](https://github.com/tw-in-js/twind/tree/v0.16), but Twind(v1) is not supported.

This plugin can be used in place of the official Twind plugin to use Twind(v1) with fresh.

## Usage

First, create a new fresh project.
[See the official fresh repository for details](https://github.com/denoland/fresh)

```sh
deno run -A -r https://fresh.deno.dev deno-fresh-demo
```

Now let's make a few changes to the Project configuration file.

### import_map.json

You need to import Twind(v1), a minimal Twind preset (if you need more presets, see [here](https://twind.style/presets)) and this fresh plugin.

```json
{
  "imports": {
    "$fresh/": "https://deno.land/x/fresh@1.1.2/",
    "preact": "https://esm.sh/preact@10.11.3",
    "preact/": "https://esm.sh/preact@10.11.3/",
    "preact-render-to-string": "https://esm.sh/*preact-render-to-string@5.2.6",
    "@preact/signals": "https://esm.sh/*@preact/signals@1.1.3",
    "@preact/signals-core": "https://esm.sh/*@preact/signals-core@1.2.3",
    "twind": "https://esm.sh/@twind/core@1.1.3",
    "twind-preset-autoprefix": "https://esm.sh/@twind/preset-autoprefix@1.0.7",
    "twind-preset-tailwind": "https://esm.sh/@twind/preset-tailwind@1.1.4",
    "twind_fresh_plugin/": "https://raw.githubusercontent.com/y3km21/fresh_twind-v1_plugin/main/"
  }
}
```

### twind.config.ts

Change `Options` to import from `twind_fresh_plugin/twind.ts`.
Import the Twind preset and add it to the `presets` field of the `Options` with an array.

```ts
import { Options } from "twind_fresh_plugin/twind.ts";

// twind preset
import presetAutoPrefix from "twind-preset-autoprefix";
import presetTailWind from "twind-preset-tailwind";

export default {
  presets: [presetAutoPrefix, presetTailWind],
  selfURL: import.meta.url,
} as Options;
```

### main.ts

Change `twindPlugin` to import from `twind_fresh_plugin/twind.ts`

```ts
/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import twindPlugin from "twind_fresh_plugin/twind.ts";
import twindConfig from "./twind.config.ts";

await start(manifest, { plugins: [twindPlugin(twindConfig)] });
```

That's all!
Now you can use Twind(v1) in fresh!

## Example

There is a fresh demo in `example`.

```sh
git clone "https://github.com/y3km21/fresh_twind-v1_plugin"
cd fresh_twind-v1_plugin/example
deno task start
```
