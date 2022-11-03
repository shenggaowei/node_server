1. sequelize 写 where 查询飘红  
2. tsconfig.json 中正确配置 paths 映射，但是执行编译过后的代码，提示找不到模块
   1. tsc 不会对 alias 路径进行编译
   2. 解决方法
      1. 使用三方编译工具, babel,webpack 之类
      2. 使用 tsconfig-paths 库
         1. 在服务器上执行 build 后的代码，提示找不到 paths 中的路径映射。原因是 build 后的文件目录和开发时的目录不一致，build 后的目录是在 out 中，而开发是在 src 目录中。因此在执行 out 目录中的代码的时候，需要单独指定 baseurl 和 paths 映射。
3. routing-controller 和 typedi 的结合使用
   1. useContainer 后在 controller 中无法直接使用 service。controller 必须在创建容器前进行导入
4. 自定义错误处理中间件没生效。
   1. 自定义的错误处理程序在默认错误处理后被调用，因此不能修改响应码或 Headers。 要阻止该行为，需要在 createExpressServer 或 useExpressServer 中配置 defaultErrorHandler 选项禁用默认错误处理。
5. routing-controller 使用中间件配置后报错 [处理方法](https://github.com/typestack/routing-controllers/issues/896)
   1. typedi 0.10.0 版本问题导致
