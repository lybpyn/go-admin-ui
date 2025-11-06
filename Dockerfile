# 构建阶段
FROM registry.cn-shanghai.aliyuncs.com/lwmeng/node:lts-alpine as build-stage

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install -g cnpm --registry=https://registry.npmmirror.com && \
    cnpm install

# 复制项目文件
COPY . .

# 构建生产环境代码
RUN npm run build:prod

# 生产阶段
FROM registry.cn-shanghai.aliyuncs.com/lwmeng/nginx

# 复制自定义 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 从构建阶段复制构建产物到 nginx 目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
