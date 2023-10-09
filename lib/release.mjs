import { args } from './args.mjs';
import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';
const { lts, proxy } = args;
const agent = proxy ? new HttpsProxyAgent(proxy) : undefined;
const res = await fetch('https://nodejs.org/download/release/index.json', { agent });
if (!res.ok) {
    throw res;
}
const releases = await res.json();
export const release = releases
    .find((release) => !lts || release.lts);
//# sourceMappingURL=release.mjs.map