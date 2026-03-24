# --- Giai đoạn 1: Build source code ---
FROM node:20-alpine as build-stage

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy 2 file package.json vào trước để cài thư viện
COPY package*.json ./
RUN npm install

# Copy toàn bộ code dự án Mì Chay vào container và tiến hành build
COPY . .
RUN npm run build

# --- Giai đoạn 2: Chạy Web Server ---
FROM nginx:alpine as production-stage

# Lấy các file tĩnh đã build xong ở Giai đoạn 1 bỏ vào thư mục phục vụ của Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Mở port 80 (Port mặc định của web HTTP)
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]