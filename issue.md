1. sequelize 写 where 查询飘红  
2. tsconfig.json 中正确配置 paths 映射，但是执行编译过后的代码，提示找不到模块
   1. tsc 不会对 alias 路径进行编译
   2. 解决方法
      1. 使用三方编译工具, babel,webpack 之类
      2. 使用 tsconig-paths 库 done
3. routing-controller 和 typedi 的结合使用
   1. useContainer 后在 controller 中无法直接使用 service。controller 必须在创建容器前进行导入