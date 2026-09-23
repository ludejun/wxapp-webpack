# Changelog

## Unreleased

### Fixed

- **The build emitted no stylesheets.** `node-sass@4` is deprecated and its
  native binding no longer compiles on current Node, so every `.scss` silently
  produced nothing and the packaged mini program shipped with no styles at all.
  Replaced with Dart Sass (`sass`), wired in through `sass-loader`'s
  `implementation` option — `sass-loader@7` still supports webpack 3.
- **Every build hung forever.** `BundleAnalyzerPlugin` ran unconditionally and
  starts a long-lived server on port 7001, so the process never exited. It is
  now opt-in through `ANALYZE=true`, matching the existing `LINT` flag, with a
  `pnpm analyze` script.
- **The only test could never pass.** It looked for the output under
  `dist/wechat/`, a path left over from an older multi-platform version of this
  scaffold, and shelled out to `yarn webpack`. It now calls the local webpack
  directly and checks `dist/`.

### Changed

- The project uses pnpm.
- Both READMEs document `pnpm` commands, and state plainly that the project is
  pinned to webpack 3.

### Added

- `README_EN.md` alongside the Chinese `README.md`.
- This changelog.

### Not changed, deliberately

The webpack 3 toolchain stays as it is.
[`wxapp-webpack-plugin`](https://www.npmjs.com/package/wxapp-webpack-plugin) —
the plugin this scaffold is built around — stopped at 0.19.0 (2022) with a peer
dependency of `webpack ^2 || ^3`, and has no webpack 4/5 successor. Upgrading
webpack would mean rewriting the packaging pipeline around a different plugin,
which is a rewrite rather than maintenance. Everything above was fixed within
that constraint, and the project builds and runs on Node 22.
