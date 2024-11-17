# 验证码服务

本项目采用koa2+sequelize+mysql实现。主要提供一以下能力：

- 生成验证码
- 验证验证码
- 定时清理过期验证码
- 系统日志
- 数据库持久化

## 开发环境

采用的是` docker `启动` mysql `数据库，需要前置安装` docker `。

### 安装依赖

```bash
npm install
```

### 启动开发环境

1. 启动mysql数据库

```bash
pnpm db:up
```
2. 初始化数据库

```bash
pnpm db:init
```

3. 查看mysql数据库日志

```bash
pnpm db:logs
```

4. 启动服务

```bash
pnpm dev
```

5. 停止mysql数据库

```bash
pnpm db:down
```



## api

### 生成验证码

请求路径：`/api/captcha/generate` 

请求方法: ` POST `

请求入参： 
 - ` userId `: 用户唯一ID

### 验证验证码

请求路径：`/api/captcha/verify`

请求方法: ` POST `

请求入参：

- ` userId `: 用户唯一ID
- ` code `: 验证码
