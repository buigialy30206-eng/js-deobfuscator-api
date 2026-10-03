const ENDPOINT =
  "https://prod.api.market/api/v1/viv-data/javascript-deobfuscator/deobfuscate";

/**
 * Deobfuscate JavaScript source code via AST transformation.
 * Never evals the input — string decryption runs in a sandboxed VM.
 *
 * @param {string} code - the obfuscated JavaScript
 * @param {{ apiKey?: string, mode?: string }} [options]
 * @returns {Promise<{ ok: boolean, code?: string, error?: string|null, stats?: object }>}
 */
export async function deobfuscate(code, options = {}) {
  const apiKey = options.apiKey || process.env.API_MARKET_KEY || "";
  const headers = { "Content-Type": "application/json" };
  if (apiKey) headers["x-api-key"] = apiKey;

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify({ code, mode: options.mode || "auto" }),
  });

  if (!res.ok) {
    const err = new Error(`Deobfuscation failed (HTTP ${res.status})`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export default deobfuscate;
