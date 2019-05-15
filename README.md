#### React -- 搭建管理系统

##### 使用的React生态：React + React-Router + Redux + Axios + Babel + Webpack

##### 一、React脚手架、Yarn介绍

1. 建议使用官方脚手架，在基础上进行扩展  `create react app  my-app`
2. Yarn -- 新一代的包管理工具，速度比较快，安装版本统一，更安全，更简洁的输入，更好的语义化
3. `yarn init`  `yarn add`  `yarn remove`  `yarn`
4. index.js 入口文件  app.js为根组件

##### 二、React生命周期

1. getDefaultProps
2. getInitialState
3. componentWillMount  == 
4. render ==
5. componentDidMount ==
6. componentWillReceiveProps
7. shouldComponentUpdate
8. componentWillUpdate
9. componentDidUpdate
10. componentWillUnmount

##### 三、项目主页工程搭建

​	`npx create-react-app my-app ` 搭建项目

​	`cd my-app`

​	`yarn start `

- 基础插件安装，less文件加载配置

  - 安装react-router，Axios【`yarn add react-router Axios `】

  - 安装antd【`yarn add antd`】

  - 暴露webpack配置文件【`yarn eject` 暴露webpack配置，配置生成在config文件夹中】

  - 安装less,less-loader 【`yarn add less less-loader`】 

  - 修改less-loader

    - 在webpack config 配置中配置 less-loader

      在 `config/webpack.config.js` 中添加如下代码：

      ```js
      const lessRegex = /\.less$/;
      const lessModuleRegex = /\.module\.less$/;
      {
          test: lessRegex,
          exclude: lessModuleRegex,
          use: getStyleLoaders({
          importLoaders: 2,
          sourceMap: isEnvProduction && shouldUseSourceMap,
          },'less-loader'),
          sideEffects: true,
      },
      {
          test: lessModuleRegex,
          use: getStyleLoaders({
          importLoaders: 2,
          sourceMap: isEnvProduction && shouldUseSourceMap,
          modules: true,
          getLocalIdent: getCSSModuleLocalIdent,
          },'less-loader'),
      },
      ```

      此时如果项目起不开，就删除node_modules和yarn.lock 重新 yarn 一下

  - babel-plugin配置antd按需加载【`yarn add antd babel-plugin-import `】

    - 在webpack config 配置中配置 babel

      在 `config/webpack.config.js` 中修改代码如下：

      ```js
      //设置antd的全局样式改变
      if (preProcessor) {
          let loader = ({
              loader: require.resolve(preProcessor),
              options: {
                  sourceMap: isEnvProduction && shouldUseSourceMap,
              },
          });
          if (preProcessor === "less-loader") {
              loader.options.modifyVars = {
                  'primary-color': '#000000',
                  'link-color': '#1DA57A',
                  'border-radius-base': '50px',
              }
              loader.options.javascriptEnabled = true
          }
          loaders.push(loader);
      }
      
      //babel配置antd的引用
      [
          require.resolve('babel-plugin-import'),// 导入 import 插件
          {
              libraryName: 'antd',   //暴露antd
              libraryDirectory: "lib",
              style: true
          }
      ],
      ```

- 项目主页结构开发

  - 页面结构定义

    - src根文件创建admin.js设置整体架构【侧边栏，头部，主体内容，底部footer】

    - 根据结构分析创建 component文件夹，创建 Header，Nav, Footer 组件

    - 创建config文件夹放置config一些配置，如菜单配置 menuConfig.js 

      ```js
      const menuList = [
          {
              title:'首页',
              key:'/home'
          },
          {
              title:'UI',
              key:'/ui',
              children:[
                  {
                      title:'按钮',
                      key:'/ui/buttons',
                  },
                  {
                      ...
                  }
              ]
           }
       ]
      ```

    - Nav组件中使用map方法遍历menuconfig通过antd menu的结构生成nav导航

      ```js
      //菜单渲染
        renderMenu = (data) => {
          return data.map((item)=>{
            if(item.children){
              return (
                <SubMenu title={item.title} key={item.key}>
                  {this.renderMenu(item.children)}
                </SubMenu>
              )
            }
            return <Menu.Item title={item.title} key={item.key}>
                		{item.title}					
      			</Menu.Item>	
          })
        }
      ```

      

  - 目录结构定义

  - 栅格系统使用

  - calc机算方法使用

- 菜单组件开发

- 头部组件开发

- 底部组件开发

------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

  


