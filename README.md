# wxapp-vedux-webpack

使用 `webpack`, `scss`, `vedux`(redux), `redux-thunk` 开发的微信小程序项目脚手架

## 功能

* 支持引用 `node_modules` 模块
* 合成vedux库，使用类redux开发方式开发小程序
* 异步action支持redux-thunk开发，也可以视实际情况删除
* 支持通过配置 `alias` 来避免 `../../../` 之类的模块引用
* 通过 `babel` 支持更丰富的 `ES6` 兼容，包括 `async/await`
* 使用 `scss` 编写 `.wxss` 文件，内置了一些有用的 `mixins` 和 `extends`
* 提供 `__DEV__` 和 `process.env.NODE_ENV` 全局常量辅助开发
* 通过命令行快速创建微信小程序页面
* 支持在 `production` 环境下压缩代码


## 开始使用

确保安装了 [Node.js](https://nodejs.org/) (>= `v4.2`) 和 [yarn](https://yarnpkg.com) 或 [npm](https://www.npmjs.com/package/npm)

1.  `git clone` 此项目
2.  通过命令行工具 `cd` 到这个目录，执行 `yarn` 安装依赖模块
3.  执行 `yarn start` 开始开发
4.  通过微信开发者工具，添加 `dist` 目录到项目上

## 内置命令

* `yarn start` 启动 `webpack` 开发微信小程序项目，能监听文件变化自动重新编译
* `yarn build` 编译生成 `production` 环境的代码到 `release` 文件夹
* `yarn lint:build` 执行 `yarn build` 命令，并使用 eslint 和 stylelint 来校验代码规范
* `yarn prettier` 执行 `prettier` 来格式化 src 目录下的代码
* `yarn create-page` 快速创建微信小程序页面（更多 `create-page` 的用法，请查看 [create-wxapp-page](https://github.com/cantonjs/create-wxapp-page)）

## 文件复制

如果 `wxml` 或 `axml` 有动态引入文件（如 `src="{{'images/' + type + '.png'}}"`），webpack 将不能动态引入，因此会导致打包后可能会存在缺失文件问题。

遇到这种情况，可以通过 [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin) 解决，把整个 `images` 目录复制到 `dist` 下即可。

本脚手架已经内置这个插件。为了方便使用，还可以通过在 `package.json` 里增加一个 `copyWebpack` 的字符串数组，来实现目录或文件自动复制。例如：

**package.json**

```json5
{
  // ...
  "copyWebpack": ["images", "icons"]
}
```

通过执行 `yarn start` 或 `yarn build`，`src/images` 和 `src/icons` 目录会自动复制到 `dist/wechat/images` 和 `dist/wechat/icons` 目录（支付宝小程序同理）。

## 更新日志

[Changelog](/CHANGELOG.md)

## 相关项目

* [create-wxapp-page](https://github.com/cantonjs/create-wxapp-page)
* [react-lib-boilerplate](https://github.com/cantonjs/react-lib-boilerplate)

## License

MIT
