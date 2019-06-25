# CelestialVelocity
[![GitHub license](https://img.shields.io/badge/license-ISC-brightgreen.svg)](#) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/@behaver/celestial-velocity) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#)

## 简介

CelestialVelocity 是一个被创建用以计算天球内点位置坐标速度的计算组件。

## 安装

使用 npm 安装组件库，在项目目录下执行：

`npm i --save @behaver/celestial-velocity`

安装后在文件中调用即可：

`const CelestialVelocity = require('@behaver/celestial-velocity')`

## 用例

```js
const CelestialVelocity = require('@behaver/celestial-velocity');
const { MoonLocator } = require('@behaver/solar-star-locator');

let ML = new MoonLocator,
    CV = new CelestialVelocity(ML);

let {
  phi, // phi 方向角速度
  theta, // theta 方向角速度
  r, // 径向速度
} = CV.get({
  t: 2448908.5,
});
```

## API

### 属性

`CelestialLocator` 天球坐标定位组件

### 方法

`constructor(cel_locator)`

构造函数：

* cel_locator 天球坐标定位组件

`celestial(sys, opts)`

设定天球系统：

* sys  天球系统名称缩写
* opts 天球系统参数选项

`get(options)`

获取速度向量：

* options.t             儒略日时间
* options.celSys        目标天球系统字串
* options.celSysOptions 目标天球系统参数
* options.coordSys      目标空间坐标系统字串

## 许可证书

The ISC license.