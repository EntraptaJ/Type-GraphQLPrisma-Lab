// bin/build.ts
import { promises as fs } from 'fs';

await Promise.all([
  fs.copyFile(
    'Extras/findFiles.js',
    'node_modules/@k-foss/ts-esnode/out/dist/findFiles.js',
  ),
]);

export {};
