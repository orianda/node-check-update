#!/usr/bin/env node

import {exit} from 'node:process';
import {compare, verify} from '../lib/index.mjs';

try {
  const code = verify();
  compare();
  exit(code);
} catch (error) {
  console.error(error);
  exit(1);
}
