## 描述

基于canvas的在线签名插件（PC， 移动端）

## 安装

```
// npm 方式安装
npm install narney-sign --save
// yarn 方式安装
yarn add narney-sign --dev
// script 方式引入
<script src="node_modules/dist/narney-sign.js"></script>
```

## 使用

```
//作为依赖包的形式
import canvasSign from '../core/canvas-sign';

var canvas = canvasSign(el , options);

// script形式
var canvas = canvasSign(el , options);
```

## 参数

```

el : 需要插入canvas的容器，默认 body

options： {
     width : canvas的宽度

     height :  canvas的高度

     color : canvas的线条颜色
}

```

## 方法

- canvas.save() : 获取图像，（base64形式）

- canvas.clear() : 清除画布
