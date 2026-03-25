import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' // 1. Thêm dòng này để xử lý đường dẫn

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // 2. Thiết lập: Từ giờ "@" sẽ đại diện cho thư mục "src"
      "@": path.resolve(__dirname, "./src"),
    },
  },
})