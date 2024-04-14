# reverse-anti-spider

## 开发环境

```
npm install
```

```
npm run dev
```

## 生产环境

### 1. 直接部署

> 可以使用 PM2 等进程管理工具进行管理
> 默认端口 3000，可以传入 PORT 环境变量修改

```
npm run build
```

```
npm run start
```

### 2. Docker 部署

```
docker buildx build -t reverse-anti-spider:latest .
```

```
docker run -d -p 3000:3000 \
 -- name reverse-anti-spider \
 -e NODE_ENV=production \
 reverse-anti-spider:latest
```
