# js-deobfuscator-api

Deobfuscate JavaScript source code with one API call — AST-based, sandboxed,
never `eval`s untrusted input.

Seven automated passes: string-array decryption, constant folding, boolean
reduction, dead-code removal, escape-sequence restore, numeric-literal restore,
bracket-to-dot.

## Install

```bash
npm install js-deobfuscator-api
# or directly from GitHub:
npm install github:buigialy30206-eng/js-deobfuscator-api
```

## Usage

```js
import { deobfuscate } from "js-deobfuscator-api";

const { ok, code } = await deobfuscate(
  `var _0x4a2b=['log','Hello\\x20World'];console[_0x4a2b[0]](_0x4a2b[1]);`,
  { apiKey: process.env.API_MARKET_KEY }
);

console.log(code); // console.log("Hello World");
```

## API key

Get an API key (free tier available) at:
https://api.market/store/viv-data/javascript-deobfuscator

Or set it as an environment variable and omit `options.apiKey`:

```bash
export API_MARKET_KEY=your_key
```

## What it does

- **String-array decryption** — resolves obfuscator.io-style rotated arrays to plain strings
- **Constant folding** — `1 + 2 * 3` → `7`
- **Boolean reduction** — `![]` → `false`
- **Dead-code removal** — unreachable branches, empty statements
- **Escape-sequence restore** — `\x48\x69` → `"Hi"`
- **Numeric-literal restore** — `0x12` → `18`
- **Bracket-to-dot** — `obj["prop"]` → `obj.prop`

## Safety

Every pass runs on the AST (Babel). String decryption executes inside a
sandboxed VM with hard timeouts. Malformed input returns a clean error — it
never executes your code.

## License

MIT
