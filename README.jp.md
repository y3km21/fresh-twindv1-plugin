# fresh Twind(v1) Plugin

[![Demo](https://img.shields.io/badge/Demo-Online-success.svg?style=for-the-badge&logo=deno)](https://y3km21-fresh-demo-twindv1.deno.dev/)

fresh Twind(v1) Plugin は[Twind(v1)](https://github.com/tw-in-js/twind)を[fresh](https://github.com/denoland/fresh)で使用できるようにするプラグインです。

現在、fresh には [Twind(v0.16)](https://github.com/tw-in-js/twind/tree/v0.16)を使用するための 公式プラグインが存在しますが Twind(v1)には対応していません。
このプラグインを公式の Twind プラグインの代わりに使用することで Twind(v1)を fresh で使用することができます。

## Usage

はじめに fresh の 新しいプロジェクトを作成しましょう。
[詳細は fresh の公式リポジトリを見てください](https://github.com/denoland/fresh)

```sh
deno run -A -r https://fresh.deno.dev deno-fresh-demo
```

では作成した Project の設定ファイルをいくつか変更します。

### import_map.json

Twind(v1)、最低限の Twind プリセット（さらにプリセットが必要ならば[ここ](https://twind.style/presets)を参照してください。）、この fresh プラグインをインポートします。

```json
{
  {
  "imports": {
    "$fresh/": "https://deno.land/x/fresh@1.1.2/",
    "preact": "https://esm.sh/preact@10.11.0",
    "preact/": "https://esm.sh/preact@10.11.0/",
    "preact-render-to-string": "https://esm.sh/*preact-render-to-string@5.2.4",
    "@preact/signals": "https://esm.sh/*@preact/signals@1.0.3",
    "@preact/signals-core": "https://esm.sh/*@preact/signals-core@1.0.1",
    "twind": "https://esm.sh/@twind/core@1.1.1",
    "twind-preset-autoprefix": "https://esm.sh/@twind/preset-autoprefix@1.0.5",
    "twind-preset-tailwind": "https://esm.sh/@twind/preset-tailwind@1.1.1",
    "twind_fresh_plugin/": "https://raw.githubusercontent.com/y3km21/fresh_twind-v1_plugin/main/"
  }
}
```

### twind.config.ts

`Options`のインポートパスを`twind_fresh_plugin/twind.ts`に変更します。
そして使用する Twind のプリセットをインポートして `Options` の`presets`フィールドに array で追加します。

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

`twindPlugin`のインポートパスを `twind_fresh_plugin/twind.ts`に変更します。

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

以上です！

これで Twind(v1）を fresh で使用することができます！

## Example

`example` に設定を変更した fresh デモがあります。

```sh
git clone "https://github.com/y3km21/fresh_twind-v1_plugin"
cd fresh_twind-v1_plugin/example
deno task start
```
