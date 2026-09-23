<h1 align="center">wxapp-webpack-wedux</h1>

<p align="center">
  微信小程序项目脚手架 —— <code>webpack</code> + <code>scss</code> + <code>redux</code> +
  <a href="https://github.com/ludejun/vedux">vedux</a>（redux 绑定库）+ <code>redux-thunk</code>。
</p>

<p align="center">
  <img src="https://img.shields.io/badge/webpack-3-8dd6f9?logo=webpack&logoColor=black" alt="webpack 3" />
  <img src="https://img.shields.io/badge/redux-4-764abc?logo=redux&logoColor=white" alt="redux 4" />
  <img src="https://img.shields.io/badge/sass-dart--sass-cc6699?logo=sass&logoColor=white" alt="dart sass" />
  <img src="https://img.shields.io/badge/platform-微信小程序-07c160?logo=wechat&logoColor=white" alt="微信小程序" />
  <a href="https://github.com/ludejun/wxapp-webpack/blob/master/LICENSE"><img src="https://img.shields.io/github/license/ludejun/wxapp-webpack?color=blue" alt="开源协议" /></a>
</p>

<p align="center">
  <a href="./CHANGELOG.md">更新日志</a>
  ·
  <a href="./README.md">English</a>
</p>

---

使用 `webpack`、`scss`、`redux`、`vedux`（redux 绑定库）、`redux-thunk` 开发的微信小程序项目脚手架。

实际使用中，最好去除 lodash（新仓库已去除）以减少包体积，可参考 `pnpm analyze` 的分析结果。

**动态图片打包问题**：`wxml-loader` 并不能解析动态图片 url 引入，需要借助 `copy-webpack-plugin` 将图片直接 copy 打包，url 配置在 `package.json` 的 `copyWebpack` 字段中。

要使用云开发能力，可参考另一个 demo：[**miniprogram-thirty**](https://github.com/ludejun/miniprogram-thirty)。
## 功能

* 支持引用 `node_modules` 模块
* 合成vedux库，使用类redux开发方式开发小程序
* 异步action支持redux-thunk开发，也可以视实际情况删除
* 集成 BundleAnalyzerPlugin 分析包体积（按需开启：`pnpm analyze`）
* 支持通过配置 `alias` 来避免 `../../../` 之类的模块引用
* 通过 `babel` 支持更丰富的 `ES6` 兼容，包括 `async/await`
* 使用 `scss` 编写 `.wxss` 文件，内置了一些有用的 `mixins` 和 `extends`
* 提供 `__DEV__` 和 `process.env.NODE_ENV` 全局常量辅助开发
* 通过命令行快速创建微信小程序页面
* 支持在 `production` 环境下压缩代码



## [vedux](https://github.com/ludejun/vedux)

wxapp-redux 微信小程序和redux绑定库，类react-redux。同npm包名，关于这个连接库详细设计和API请参考上面链接。

### 简介

在[**wechat-weapp-redux**](https://github.com/charleyw/wechat-weapp-redux)的基础上改进，控制setdata次数与渲染次数，在页面的交互、加载、跳转时setdata次数减少50-80%，渲染时间减少约50%。

有如下功能特性：

- Redux store变化时禁止后台页面setdata，后台页面的setdata汇总到此页面onload时进行；
- 优化stateDiff算法；
- 过滤与当前页面无关的变更；
- 内部对action触发做节流处理，允许不节流，默认节流；
- 支持给action传入callback，在action触发后执行；
- connect的传参mapStateToData，支持传入options（即onLoad的options）；
- connect新增参数mergeProps（对mapStateToData的返回结果做进一步处理）；
- connect新增参数extraOptions（给mergeProps方法传参）；



## 开始使用

确保安装了 [Node.js](https://nodejs.org/)（>= 18）和 [pnpm](https://pnpm.io/)。

1.  `git clone` 此项目
2.  `cd` 到这个目录，执行 `pnpm install` 安装依赖
3.  执行 `pnpm start` 开始开发
4.  通过微信开发者工具，添加 `dist`（开发环境）目录到项目上，生产环境为 `release` 文件夹；如项目复杂度不高，可以改为一个，修改 webpack 配置的 `output` 即可

## 内置命令

* `pnpm start` 启动 `webpack` 开发微信小程序项目，监听文件变化自动重新编译（输出到 `dist/`）
* `pnpm build` 编译 `production` 代码到 `release/`
* `pnpm analyze` 生产构建并打开包体积分析（会常驻一个服务，按 Ctrl+C 结束）
* `pnpm lint` / `pnpm lint:build` eslint、stylelint 校验
* `pnpm test` 构建冒烟测试：校验小程序产物是否齐全
* `pnpm prettier` 格式化 `src` 下的代码
* `pnpm create-page` 快速创建小程序页面（用法见 [create-wxapp-page](https://github.com/cantonjs/create-wxapp-page)）

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

执行 `pnpm start` 或 `pnpm build` 时，`src/images` 和 `src/icons` 目录会自动复制到输出目录下的 `images` 和 `icons`。

## 更新日志

见 [CHANGELOG.md](./CHANGELOG.md)。

## 相关项目

* [create-wxapp-page](https://github.com/cantonjs/create-wxapp-page)
* [react-lib-boilerplate](https://github.com/cantonjs/react-lib-boilerplate)

## License

MIT
