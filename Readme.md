# 运行方式：

方式一：
1.在客户端服务端各执行npm i，安装依赖
2.先启动服务端，npm run dev，监听3000端口
3.再启动客户端，npm start，使用3001端口

# 项目打包方式
npm run build

# 电影管理系统

服务器端：提供API接口

客户端：ajax请求接口获得数据，使用数据渲染页面

服务器端技术栈：ts + express + mongodb + 数据验证（class-validator、class-transform）

客户端：react全家桶（react-router、redux、antd）

开发顺序：
1.服务器端

使用postman测试

2.客户端

> tslint:跟eslint相似，用于检查代码风格。

react脚手架：

creat-react-app

nextjs：做服务端渲染

umijs：阿里的脚手架

先开发客户端的api请求功能

有的时候，服务器和客户端会共用一个类型，如果要处理此处的重复代码问题，最佳做法是自行使用webpack搭建工程。

客户端端口：3001，此时请求/api/movie，我们需要使用代理。

2.1 redux

大型项目中使用，它不是必须使用的，不是所有状态数据都需要放到redux中。

action：平面对象，plainobject，它描述了数据变化的方式
reducer：数据变化的具体内容，他需要一个action来触发
store：存储数据的仓库

解决redux异步的副作用：
redux-thunk、
redux-saga、
阿里-dva、
阿里-umi.js

2.2 路由

router全家桶

2.3 界面

antd：UI库
