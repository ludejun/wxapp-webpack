import { resolve } from 'path';
import { execFileSync } from 'child_process';
import rimraf from 'rimraf';
import glob from 'glob';

// The dev build writes to dist/ (the production build writes to release/).
// An older, multi-platform version of this scaffold nested the output under
// dist/wechat/, which is why this test used to look there and always failed.
const inDist = (...args) => resolve('dist', ...args);
const exist = (...paths) => !!glob.sync(inDist(...paths))[0];
const clear = () => rimraf.sync(inDist());

beforeEach(clear);
afterEach(clear);

test('the development build emits every mini-program file', () => {
  // Call the local webpack directly rather than going through a package
  // manager, so the test does not depend on which one is installed.
  execFileSync(resolve('node_modules', '.bin', 'webpack'), { stdio: 'pipe' });

  expect(exist('app.js')).toBe(true);
  expect(exist('app.json')).toBe(true);
  expect(exist('app.wxss')).toBe(true);
  expect(exist('common.js')).toBe(true);
  expect(exist('wxml/motto/motto.wxml')).toBe(true);
  expect(exist('pages/index/index.js')).toBe(true);
  expect(exist('pages/index/index.wxml')).toBe(true);
  expect(exist('pages/index/index.wxss')).toBe(true);
  expect(exist('pages/logs/logs.js')).toBe(true);
  expect(exist('pages/logs/logs.wxml')).toBe(true);
  expect(exist('pages/logs/logs.wxss')).toBe(true);
});
