<h1 align="center">wxapp-webpack-wedux</h1>

<p align="center">
  A WeChat Mini Program scaffold built on <code>webpack</code>, <code>scss</code>,
  <code>redux</code>, <a href="https://github.com/ludejun/vedux">vedux</a> (a redux binding
  library) and <code>redux-thunk</code>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/webpack-3-8dd6f9?logo=webpack&logoColor=black" alt="webpack 3" />
  <img src="https://img.shields.io/badge/redux-4-764abc?logo=redux&logoColor=white" alt="redux 4" />
  <img src="https://img.shields.io/badge/sass-dart--sass-cc6699?logo=sass&logoColor=white" alt="dart sass" />
  <img src="https://img.shields.io/badge/platform-WeChat%20Mini%20Program-07c160?logo=wechat&logoColor=white" alt="WeChat Mini Program" />
  <a href="https://github.com/ludejun/wxapp-webpack/blob/master/LICENSE"><img src="https://img.shields.io/github/license/ludejun/wxapp-webpack?color=blue" alt="license" /></a>
</p>

<p align="center">
  <a href="./CHANGELOG.md">Changelog</a>
  ·
  <a href="./README_CN.md">中文文档</a>
</p>

---

In practice it is worth dropping lodash to keep the bundle small (newer repos already have);
`pnpm analyze` shows where the weight is.

**Dynamic image paths:** `wxml-loader` cannot resolve a dynamically built image URL, so those files
have to be copied verbatim with `copy-webpack-plugin`. List the paths under the `copyWebpack` field
in `package.json`.

For cloud-hosted mini programs, see [**miniprogram-thirty**](https://github.com/ludejun/miniprogram-thirty).

## Features

- Import modules straight from `node_modules`.
- [vedux](https://github.com/ludejun/vedux) built in — write a mini program the way you write Redux.
- Async actions through redux-thunk, removable if you do not need them.
- Bundle analysis on demand (`pnpm analyze`).
- `alias` support, so no more `../../../` imports.
- Babel for fuller ES6 support, `async/await` included.
- Write `.wxss` as `scss`, with a set of useful mixins and extends included.
- `__DEV__` and `process.env.NODE_ENV` available as globals.
- Create a new mini program page from the command line.
- Minified output in `production`.

## vedux

[vedux](https://github.com/ludejun/vedux) is a Redux binding library for WeChat Mini Programs, in
the spirit of react-redux.

It builds on [wechat-weapp-redux](https://github.com/charleyw/wechat-weapp-redux), cutting how often
`setData` runs and how often the page re-renders: 50–80% fewer `setData` calls during interaction,
loading and navigation, and roughly half the render time.

- Background pages do not `setData` when the store changes; their updates are batched into the
  page's next `onLoad`.
- An improved state-diff algorithm.
- Changes unrelated to the current page are filtered out.
- Actions are throttled internally by default, and throttling can be turned off.
- Actions accept a callback, run once the action has fired.
- `mapStateToData` accepts `options` (the `onLoad` options).
- `connect` takes a `mergeProps` argument, to post-process what `mapStateToData` returns.
- `connect` takes an `extraOptions` argument, passed through to `mergeProps`.

## Getting started

You need [Node.js](https://nodejs.org/) >= 18 and [pnpm](https://pnpm.io/).

1. `git clone` this repo
2. `cd` into it and run `pnpm install`
3. Run `pnpm start`
4. In the WeChat devtools, point the project at `dist/` (development) or `release/` (production).
   If your project is simple, collapse the two by editing `output` in the webpack config.

## Commands

| | |
| --- | --- |
| `pnpm start` | Development build with file watching, into `dist/` |
| `pnpm build` | Production build, into `release/` |
| `pnpm analyze` | Production build plus the bundle analyzer (long-lived server; Ctrl+C to stop) |
| `pnpm lint` / `pnpm lint:build` | eslint and stylelint |
| `pnpm test` | Smoke test: checks the build emits every expected mini-program file |
| `pnpm prettier` | Format everything under `src` |
| `pnpm create-page` | Scaffold a new page — see [create-wxapp-page](https://github.com/cantonjs/create-wxapp-page) |

## Copying files

If a `wxml` or `axml` template builds a path dynamically (e.g. `src="{{'images/' + type + '.png'}}"`),
webpack cannot follow it, and the file will be missing from the build.

[copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin) solves this by copying
the whole directory across. It is already wired up: add the paths to a `copyWebpack` array in
`package.json`.

```json5
{
  // ...
  "copyWebpack": ["images", "icons"]
}
```

`pnpm start` and `pnpm build` then copy `src/images` and `src/icons` into `images` and `icons` under
the output directory.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## Related

- [create-wxapp-page](https://github.com/cantonjs/create-wxapp-page)
- [vedux](https://github.com/ludejun/vedux)
- [miniprogram-thirty](https://github.com/ludejun/miniprogram-thirty)

## License

MIT
