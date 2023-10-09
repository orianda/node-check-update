import {args} from './args.mjs';
import fetch from 'node-fetch';
import {HttpsProxyAgent} from 'https-proxy-agent';

export interface Release {
  version: string;
  date: string;
  files: ReadonlyArray<string>;
  npm?: string;
  v8: string;
  uv?: string;
  zlib?: string;
  openssl?: string;
  modules?: string;
  lts: string | boolean;
  security: boolean;
}

const {lts, proxy} = args;
const agent = proxy ? new HttpsProxyAgent(proxy) : undefined;
const res = await fetch('https://nodejs.org/download/release/index.json', {agent});
if (!res.ok) {
  throw res;
}

const releases = await res.json() as ReadonlyArray<Release>;

export const release = releases
  .find((release) => !lts || release.lts);
