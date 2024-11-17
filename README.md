# 验证码服务

本项目采用koa2+sequelize+mysql实现。主要提供一以下能力：

- 生成验证码
- 验证验证码
- restful api
- 定时清理过期验证码
- 系统日志
- 数据库持久化


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

## 开发环境

### 安装依赖

```bash
npm install
```

采用的是docker-compose启动mysql数据库，需要前置安装docker。

### 启动开发环境（包含mysql数据库）

```bash
pnpm start:dev
```

## 单独启动mysql数据库

1. 启动mysql数据库

```bash
pnpm db:up
```
2. 初始化数据库

```bash
pnpm init:db
```

3. 查看mysql数据库日志

```bash
pnpm db:logs
```

4. 停止mysql数据库

```bash
pnpm db:down
```

