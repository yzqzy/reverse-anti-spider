# reverse-anti-spider

## 开发环境

安装依赖并启动开发环境。

```
npm install
```

```
npm run dev
```

## 生产环境

提供三种部署方式，请根据实际情况选择。

### 1. 构建并启动

> 可以使用 PM2 等进程管理工具进行管理
> 默认端口 3000，可以传入 PORT 环境变量修改

```
npm run build
```

```
npm run start
```

### 2. 构建 Docker 镜像并运行

```
docker buildx build -t reverse-anti-spider:latest .
```

```
docker run -d -p 3000:3000 \
 -e NODE_ENV=production \
 reverse-anti-spider:latest
```

### 3. 拉取 Docker 镜像并运行

```
docker run -d -p 3000:3000 \
 -e NODE_ENV=production \
  yzqzy/reverse-anti-spider:latest
```
